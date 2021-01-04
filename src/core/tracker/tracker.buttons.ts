import { User, PartialUser } from "discord.js";
import { ProgTracker, ProgTrackerType, vowXp } from "./tracker.model";
import { Player, Storage } from "../discord/storage";
import { sub, add } from "./tracker.manager";
import { d, rollProgressDice } from "../dice/dice.utils";
import { IReaction } from "..";
import { embedPt, parseProgTracker } from "./tracker.utils";
import { MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import { CharacterWizardStep } from "../character/character.model";
import { finishStep } from "../character/character.wizard";
import { Local } from "../../local";
import { lookup, oracleLookupTable, rollArr } from "../oracles/oracles.utils";
import { IResult } from "../../local/en/oracles/datasworn";

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
  threat: threatRoll,
};

function changeProgTracker(
  reaction: IReaction,
  local: Local,
  f: (v: ProgTracker) => any
) {
  const pt = parseProgTracker(reaction.message, local);
  f(pt);

  if (pt.type === ProgTrackerType.RULE) {
    pt.text = local.oracles.languageRules[pt.track.current];
  }

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
    case ProgTrackerType.THREAT:
      await progressMove(
        local,
        reaction.message.channel as TextChannel,
        player.userId,
        resString as string,
        resNum as number,
        "fulfillYourVow"
      );
      const players = await getChannelPlayers(
        reaction.message.channel as TextChannel,
        storage,
        user.id
      );
      players.forEach((player) => {
        if (resNum > 0) {
          player.character.xp += vowXp[pt.rank] - (resNum === 1 ? 1 : 0);
          storage.updatePlayerAndCharEmbed(player);
          reaction.message.delete();
          player.helperChannel.send(
            `${local.progTracker.privateDoneMsg}. ${local.scene.worldIsChanging(
              reaction.message.guild
                ?.getChannelByName(local.discord.worldIsChanging)
                ?.toString()!
            )}`
          );
          if (players.length === 1) {
            reaction.message?.guild
              ?.getTableChannel(local)!
              .send(
                `<@${player.userId}> ${local.progTracker.doneMsg}: ${pt.text}`
              );
          }
        }
      });
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
    case ProgTrackerType.RULE:
      reaction.message.channel.send(rollArr(local.oracles.languageRules));
      break;
    default:
      reaction.message.channel.sendWithEmoji(resString as string);
      break;
  }
}

async function threatRoll(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const { local } = storage;
  const o = Object.entries(local.oracles.oracleTables).find(
    ([o]) => o === local.oracles.advanceThreat
  )?.[1] as IResult & { Menace: number }[];
  const result = lookup(o, d(100));
  if (result.Menace) {
    const pt = parseProgTracker(reaction.message, local);
    pt.track.max = pt.track.max - result.Menace * 0.25;
    reaction.message.editWithEmoji(embedPt(pt, local));
  }

  reaction.message.channel.sendWithEmoji(result.Description);
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

  const players = await getChannelPlayers(
    reaction.message.channel as TextChannel,
    storage,
    user.id
  );

  switch (pt.type) {
    case ProgTrackerType.VOW:
    case ProgTrackerType.THREAT:
      players.forEach((player) => {
        player.helperChannel.send(storage.local.progTracker.abandonMsg);
        sub(player.character.status.spirit, vowXp[pt.rank]);
        storage.updatePlayer(player);
      });
      reaction.message.delete();
      break;
  }

  reaction.message.delete();
}

async function getChannelPlayers(
  channel: TextChannel,
  storage: Storage,
  userId: string
) {
  const author = await storage.getPlayer(userId);

  if (channel.id === author.charChannel.id) {
    return [author];
  }

  const players: Player[] = [];
  const playerIds: string[] = [];

  const messages = (await channel.getMessageBunch()).filter(
    (m) => m.author !== storage.botUser
  );

  for await (const m of messages) {
    const player = await storage.getPlayer(m.author.id);

    if (!playerIds.includes(m.author.id)) {
      players.push(player);
      playerIds.push(m.author.id);
    }
  }
  return players;
}
