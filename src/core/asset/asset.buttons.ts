import { Asset } from "./asset.model";
import { User } from "discord.js";
import { Player, Storage } from "../discord/storage";
import { toEmbed, toAsset } from "./asset.utils";
import { PartialUser } from "discord.js";
import { add, sub, reset } from "../tracker/tracker.manager";
import { CharacterWizardStep } from "../character/character.model";
import { setAssets } from "../character/character.wizard";
import { IReaction } from "..";
import { Message, MessageReaction } from "discord.js";

export const assetHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  addone: (reaction, storage, user) => takeSkill(0, reaction, storage, user),
  addtwo: (reaction, storage, user) => takeSkill(1, reaction, storage, user),
  addthree: (reaction, storage, user) => takeSkill(2, reaction, storage, user),
  takeasset: (reaction, storage, user) => takeAsset(reaction, storage, user),
  takeone: (reaction, storage, user) => takeAsset(reaction, storage, user, 1),
  taketwo: (reaction, storage, user) => takeAsset(reaction, storage, user, 2),
  takethree: (reaction, storage, user) => takeAsset(reaction, storage, user, 3),
  forgetasset: forgetAsset,
  assetsub: subHealth,
  assethp: restoreHealth,
  assetadd: addHealth,
  name: rename,
};

async function takeSkill(
  skill: number,
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const { message } = reaction;
  const asset = toAsset(message.embeds[0], storage.local);
  const player = await storage.getPlayer(user.id);

  if (player.character.xp < 2) {
    player.helperChannel.send(
      `<@${player.userId}>, **${storage.local.asset.xpNotEnough}**. ${storage.local.asset.hpNotEnough} "${asset.abilities[skill].description}"`
    );
    return;
  }

  player.character.xp -= 2;

  asset.abilities[skill].isChecked = true;
  storage.updatePlayerAndCharEmbed(player);

  message.editWithEmoji(toEmbed(asset, storage.local));
  reaction.remove!();
}

function addHealth(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const asset = toAsset(reaction.message.embeds[0], storage.local);
  add(asset.tracker!);
  reaction.message.editWithEmoji(toEmbed(asset, storage.local));
}

function subHealth(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const asset = toAsset(reaction.message.embeds[0], storage.local);
  sub(asset.tracker!);
  reaction.message.editWithEmoji(toEmbed(asset, storage.local));
}

function restoreHealth(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const asset = toAsset(reaction.message.embeds[0], storage.local);
  reset(asset.tracker!);
  reaction.message.editWithEmoji(toEmbed(asset, storage.local));
}

async function takeAsset(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser,
  skill?: number
) {
  const { message } = reaction;
  const asset = toAsset(message.embeds[0], storage.local);
  const player = await storage.getPlayer(user.id);

  if (skill) {
    asset.abilities[skill - 1].isChecked = true;
  } else if (!asset.abilities[0].isChecked) {
    asset.abilities[0].isChecked = true;
  }

  const neededXp = 3;

  if (
    player.characterWizardStep === CharacterWizardStep.Done &&
    player.character.xp < neededXp
  ) {
    player.helperChannel.send(
      `<@${player.userId}>, **${storage.local.asset.xpNotEnough}**`
    );
    return;
  }

  sendWithButtons(player, asset, neededXp, storage);
}

async function rename(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const { local } = storage;
  const player = await storage.getPlayer(user.id);
  const asset = toAsset(reaction.message.embeds[0], local);

  const filter = (response: Message) => {
    return (
      !!response.content.toLowerCase() &&
      response.author.id !== storage.botUser.id
    );
  };

  reaction.message.channel
    .send(
      `<@${player.userId}>, ${local.asset.enter} ${asset.customFieldName} ${local.asset.forAsset}: ${asset.name}`
    )
    .then((question) => {
      reaction.message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 3600000,
          errors: ["time"],
        })
        .then((collected) => {
          const answer = collected.last();
          asset.customField = answer?.content;
          answer?.delete();
          question?.delete();
          reaction.message.editWithEmoji(toEmbed(asset, storage.local));
        })
        .catch((collected) => {
          question?.delete();
        });
    });
}

async function forgetAsset(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const filter = (response: Message) => {
    return (
      !!response.content.toLowerCase() &&
      response.author.id !== storage.botUser.id
    );
  };

  const player = await storage.getPlayer(user.id);
  if (player.characterWizardStep < CharacterWizardStep.Done) {
    player.character.startAssetCount++;
    storage.updatePlayerAndCharEmbed(player);
    reaction.message.delete();
    return;
  }

  player.helperChannel
    .send(
      `<@${player.userId}>, ${storage.local.asset.declineAsset} ${storage.local.asset.assetCancelationInformation}`
    )
    .then(() => {
      player.helperChannel
        .awaitMessages(filter, {
          max: 1,
          time: 3600000,
          errors: ["time"],
        })
        .then((collected) => {
          if (
            collected.last()?.content.toLowerCase() === storage.local.scene.yes
          ) {
            player.character.xp += 3;
            storage.updatePlayerAndCharEmbed(player);
            reaction.message.delete();
            player.helperChannel.send(
              `${player.character.name} ${storage.local.asset.assetCancelation}`
            );
          }
        })
        .catch((collected) => {
          player.helperChannel.send(storage.local.asset.withoutAnswer);
        });
    });
}

function sendWithButtons(
  player: Player,
  asset: Asset,
  xp: number,
  storage: Storage
) {
  let lastReact: Promise<
    Message | MessageReaction
  > = player.charChannel.sendWithEmoji(toEmbed(asset, storage.local));

  if (!asset.abilities[0].isChecked) {
    lastReact = lastReact.then((x) => react(x, "addone"));
  }

  if (!asset.abilities[1].isChecked) {
    lastReact = lastReact.then((x) => react(x, "addtwo"));
  }

  if (!asset.abilities[2].isChecked) {
    lastReact = lastReact.then((x) => react(x, "addthree"));
  }

  if (asset.tracker) {
    lastReact = lastReact
      .then((x) => react(x, "assetsub"))
      .then((x) => react(x, "assethp"))
      .then((x) => react(x, "assetadd"));
  }
  if (asset.customFieldName) {
    lastReact = lastReact.then((x) => react(x, "name"));
  }

  lastReact.then((x) => react(x, "forgetasset"));

  if (player.character.startAssetCount) {
    player.character.startAssetCount--;
  } else {
    player.character.xp -= xp;
  }

  storage.updatePlayerAndCharEmbed(player);
  if (
    player.characterWizardStep === CharacterWizardStep.Assets &&
    player.character.startAssetCount === 0
  ) {
    setAssets(player.helperChannel, player, storage);
  }
}

function react(x: Message | MessageReaction, emj: string) {
  const msg = (x as MessageReaction).message || x;
  return msg.reactEmoji(emj);
}
