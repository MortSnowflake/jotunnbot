import { IReaction } from ".";
import { Storage } from "./discord/storage";
import { User, PartialUser } from "discord.js";
import { charListHandlers } from "./character/character.buttons";
import { assetHandlers } from "./asset/asset.buttons";
import { oraclesHandlers } from "./oracles/oracles.buttons";
import { progTrackerHandlers } from "./tracker/tracker.buttons";
import { diceHandlers } from "./dice/dice.buttons";

export async function onButtonClick(
  reaction: IReaction,
  user: User | PartialUser,
  storage: Storage,
  handlers: {
    [id: string]: (
      reaction: IReaction,
      storage: Storage,
      user: User | PartialUser
    ) => void;
  }
) {
  if (!reaction?.emoji?.name) {
    return;
  }
  handlers[reaction.emoji.name](reaction, storage, user);
}

export const buttonHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  ...charListHandlers,
  ...diceHandlers,
  ...assetHandlers,
  ...oraclesHandlers,
  ...progTrackerHandlers,
};
