import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { ruleTracker, viewProgTracker } from "./tracker.utils";
import { ProgTracker, progTrackers, ProgTrackerType } from "./tracker.model";
import { addLoyaltyPoint } from "../lore/lore.utils";
import { helpOne } from "../help/help.commands";
import { TextChannel } from "discord.js";
import { rollArr } from "../oracles/oracles.utils";

export const progTrackerCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  addProgTracker,
  addVow,
  addWordTracker,
  addJourneyTracker,
  addRuleTracker,
};

async function addProgTracker(
  message: Message,
  args: string[],
  storage: Storage
) {
  const player = await storage.getPlayer(message.author.id);
  if (!args.length) {
    helpOne(storage.local, message.channel as TextChannel, "addProgTracker");
    return;
  }

  const rank = progTrackers[parseInt(args.shift()!) - 1];
  viewProgTracker(
    new ProgTracker(args.join(" "), rank),
    message.channel as TextChannel,
    storage.local
  ).then((r) => r.message.pin());
  storage
    .getPlayer(message.author.id)
    .then((p) => addLoyaltyPoint(p, storage.local));
}

async function addWordTracker(
  message: Message,
  args: string[],
  storage: Storage
) {
  const { local } = storage;
  if (!args.length) {
    message.channel.send(rollArr(local.oracles.languageWords));
    return;
  }

  const rank = progTrackers[parseInt(args.shift()!) - 1];
  viewProgTracker(
    new ProgTracker(args.join(" "), rank, ProgTrackerType.WORDS),
    message.channel as TextChannel,
    local
  ).then((r) => r.message.pin());
  storage.getPlayer(message.author.id).then((p) => addLoyaltyPoint(p, local));
}

async function addRuleTracker(
  message: Message,
  args: string[],
  storage: Storage
) {
  ruleTracker(message.channel as TextChannel, storage.local);
}

async function addJourneyTracker(
  message: Message,
  args: string[],
  storage: Storage
) {
  const { local } = storage;
  const player = await storage.getPlayer(message.author.id);
  if (!args.length) {
    helpOne(local, message.channel as TextChannel, "addJourneyTracker");
    return;
  }

  const rank = progTrackers[parseInt(args.shift()!) - 1];
  viewProgTracker(
    new ProgTracker(args.join(" "), rank, ProgTrackerType.TRAVEL),
    message.channel as TextChannel,
    local
  ).then((r) => r.message.pin());
  storage.getPlayer(message.author.id).then((p) => addLoyaltyPoint(p, local));
}

async function addVow(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  if (!args.length) {
    helpOne(storage.local, player.helperChannel, "addVow");
    return;
  }

  const rank = progTrackers[parseInt(args.shift()!) - 1];
  viewProgTracker(
    new ProgTracker(args.join(" "), rank, ProgTrackerType.VOW),
    player.charChannel as TextChannel,
    storage.local
  );
}
