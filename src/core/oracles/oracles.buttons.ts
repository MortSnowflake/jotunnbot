import { User } from "discord.js";
import { Storage } from "../discord/storage";
import { PartialUser } from "discord.js";
import {
  toCustomOracle,
  oracleLookupTable,
  rollArr,
  lookup,
  lookupOld,
} from "./oracles.utils";
import { IReaction } from "..";
import { d } from "../dice/dice.utils";

export const oraclesHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  rolloracle: rollOracle,
  rolluseroracle: rollUserOracle,
};

async function rollOracle(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser
) {
  const player = await storage.getPlayer(user.id);
  oracleLookupTable(
    player.helperChannel,
    user,
    reaction.message.embeds[0].title?.split(" ")!,
    storage.local
  );
}

async function rollUserOracle(reaction: IReaction) {
  const { items } = toCustomOracle(reaction.message.embeds[0]);
  const isLookup = items.every((i) => i.includes(":"));

  if (!isLookup) {
    reaction.message.channel.send(rollArr(items));
  }
  let results: { [id: string]: any } = {};

  items.forEach((element) => {
    const [key, value] = element.split(":");
    results[key] = value;
  });

  reaction.message.channel.send(
    lookupOld(results, d(parseInt(items[items.length - 1].split(":")[0])))
  );
}
