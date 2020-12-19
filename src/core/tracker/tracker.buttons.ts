import { User, PartialUser } from "discord.js";
import { ProgTracker, ProgTrackerType, vowXp } from "./tracker.model";
import { Storage } from "../discord/storage";
import { sub, add } from "./tracker.manager";
import { rollProgressDice } from "../dice/dice.utils";
import { IReaction } from "..";
import { embedPt, parseProgTracker } from "./tracker.utils";
import { MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import { CharacterWizardStep } from "../character/character.model";
import { finishStep } from "../character/character.wizard";
import { Local } from "../../local";

export const progTrackerHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  ptsub: (r, s) => {
    changeProgTracker(r, s.local, (pt: ProgTracker) => sub(pt.track, pt.rank));
  },
  ptadd: (r, s) => {
    changeProgTracker(r, s.local, (pt: ProgTracker) => add(pt.track, pt.rank));
  },
  ptroll: checkProgress,
  ptdel: abandonPt,
};

function changeProgTracker(
  reaction: IReaction,
  local: Local,
  f: (v: ProgTracker) => any
) {
  const pt = parseProgTracker(reaction.message, local);
  f(pt);
  reaction.message.editWithEmoji(embedPt(pt, local));
}

async function checkProgress(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const { local } = storage;
  const player = await storage.getPlayer(user.id);
  const pt = parseProgTracker(reaction.message, local);

  let training =
    player.characterWizardStep === CharacterWizardStep.Strike &&
    reaction.message.channel.id === player.helperChannel.id
      ? [1, 1]
      : undefined;

  if (training && pt.track.current === 0) {
    reaction.message.channel.sendWithEmoji(
      local.character.forgetToMarkProgress
    );
    return;
  }

  const [resString, resNum] = rollProgressDice(
    user.id,
    pt.track.current,
    local,
    training
  );

  switch (pt.type) {
    case ProgTrackerType.VOW:
      await progressMove(
        local,
        reaction.message.channel as TextChannel,
        player.userId,
        resString as string,
        resNum as number,
        "fulfillYourVow"
      );
      if (resNum > 0) {
        player.character.xp += vowXp[pt.rank] - (resNum === 1 ? 1 : 0);
        storage.updatePlayerAndCharEmbed(player);
        reaction.message.delete();
        reaction.message?.guild
          ?.getTableChannel(local)!
          .send(
            `<@${player.userId}>, ${local.progTracker.doneMsg}: ${pt.text}`
          );
      }
      break;
    case ProgTrackerType.DELVE:
      progressMove(
        local,
        reaction.message.channel as TextChannel,
        player.userId,
        resString as string,
        resNum as number,
        "localeYourObjectives"
      );
      break;
    case ProgTrackerType.BATTLE:
      await progressMove(
        local,
        reaction.message.channel as TextChannel,
        player.userId,
        resString as string,
        resNum as number,
        "endTheFight"
      );

      if (training) {
        finishStep(reaction.message, player, storage);
      }
      break;
    case ProgTrackerType.TRAVEL:
      progressMove(
        local,
        reaction.message.channel as TextChannel,
        player.userId,
        resString as string,
        resNum as number,
        "reachYourDestination"
      );
      break;
    default:
      reaction.message.channel.sendWithEmoji(resString as string);
      break;
  }
}

async function progressMove(
  local: Local,
  channel: TextChannel,
  userId: string,
  resString: string,
  resNum: number,
  moveId: string
) {
  const { name, results } = local.moves.find((m) => m.findFromCode === moveId)!;

  await channel.sendWithEmoji(
    new MessageEmbed().setDescription(`<@${userId}>, ${name}`)
  );
  await channel.sendWithEmoji(new MessageEmbed().setDescription(resString));
  await channel.sendWithEmoji(
    new MessageEmbed().setDescription(results[resNum])
  );
}

async function abandonPt(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const pt = parseProgTracker(reaction.message, storage.local);
  const player = await storage.getPlayer(user.id);

  switch (pt.type) {
    case ProgTrackerType.VOW:
      player.helperChannel.send(storage.local.progTracker.abandonMsg);
      sub(player.character.status.spirit, vowXp[pt.rank]);
      storage.updatePlayer(player);
      reaction.message.delete();
      break;
  }

  reaction.message.delete();
}
