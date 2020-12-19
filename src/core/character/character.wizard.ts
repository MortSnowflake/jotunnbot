import { Message, TextChannel } from "discord.js";
import { Storage, Player } from "../discord/storage";
import { Attributes, CharacterWizardStep } from "./character.model";
import { Channel } from "discord.js";
import { viewProgTracker } from "../tracker/tracker.utils";
import {
  ProgTracker,
  ProgTrackerRank,
  ProgTrackerType,
} from "../tracker/tracker.model";
import { viewCharList } from "./character.commands";

export async function wizard(message: Message, storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  if (player.characterWizardStep < CharacterWizardStep.Done) {
    switch (player.characterWizardStep) {
      case CharacterWizardStep.Name:
        setName(message, player, storage);
        break;
      case CharacterWizardStep.Description:
        setDesc(message, player, storage);
        break;
      case CharacterWizardStep.Avatar:
        setAvatar(message, player, storage);
        break;
      case CharacterWizardStep.Attr:
        setAttr(message, player, storage);
        break;
      case CharacterWizardStep.LongVow:
        sendLongVow(message, player, storage);
        break;
      case CharacterWizardStep.ShortVow:
        sendShortVow(message, player, storage);
        break;
      case CharacterWizardStep.Assets:
        //process in asset buttons
        break;
      case CharacterWizardStep.TrainingOption:
        setTrainingOptionAnswer(message, player, storage);
        break;
    }
  }
}

function setName(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  player.character.name = message.content;
  storage.updatePlayer(player);
  sendStep(player.characterWizardStep, message.channel, storage);
}

function setDesc(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  player.character.description = message.content;
  storage.updatePlayer(player);
  sendStep(player.characterWizardStep, message.channel, storage);
}

function setAvatar(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  const img = message.attachments.first()?.proxyURL;
  player.character.img = img && encodeURIComponent(img);
  storage.updatePlayer(player);
  sendStep(player.characterWizardStep, message.channel, storage);
}

function setAttr(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  player.character.attributes = new Attributes(message.content);
  storage.updatePlayer(player);
  viewCharList(player.character, player.charChannel, storage).then((m) =>
    m.pin()
  );
  sendStep(player.characterWizardStep, message.channel, storage);
}

function sendLongVow(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  storage.updatePlayer(player);
  viewProgTracker(
    new ProgTracker(
      message.content,
      ProgTrackerRank.EXTREME,
      ProgTrackerType.VOW
    ),
    player.charChannel,
    storage.local
  );
  sendStep(player.characterWizardStep, message.channel, storage);
}

function sendShortVow(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep++;
  storage.updatePlayer(player);
  viewProgTracker(
    new ProgTracker(
      message.content,
      ProgTrackerRank.DANGEROUS,
      ProgTrackerType.VOW
    ),
    player.charChannel,
    storage.local
  );
  sendStep(player.characterWizardStep, message.channel, storage);
}

export function setAssets(channel: Channel, player: Player, storage: Storage) {
  player.characterWizardStep++;
  storage.updatePlayer(player);
  storage.renameUserNick(player.userId, player.character.name);
  storage.addPlayerRole(player.userId);
  sendStep(player.characterWizardStep, channel, storage);
}

function setTrainingOptionAnswer(
  message: Message,
  player: Player,
  storage: Storage
) {
  if (message.content === storage.local.scene.yes) {
    player.characterWizardStep++;
    storage.updatePlayer(player);
    sendStep(player.characterWizardStep, message.channel, storage);
  } else {
    finishStep(message, player, storage);
  }
}

export function sendStep(
  step: CharacterWizardStep,
  channel: Channel,
  storage: Storage
) {
  return (channel as TextChannel).sendWithEmoji(
    storage.local.character.wizard.find((w: any) => w.step === step)
      ?.message as string
  );
}

export function finishStep(message: Message, player: Player, storage: Storage) {
  player.characterWizardStep = CharacterWizardStep.Done;
  storage.updatePlayer(player);
  sendStep(player.characterWizardStep, message.channel, storage).then((m) =>
    m.channel.send(
      storage.local.character.firstSteps(
        player.charChannel.toString(),
        m.guild?.getChannelsInfo(storage.local).toString()!
      )
    )
  );
}
