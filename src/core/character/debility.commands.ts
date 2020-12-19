import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { Debilities } from "./character.model";

export const debilityCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  wounded: (message, args, storage) =>
    toggleDebility(
      (d) => (d.wounded = !d.wounded),
      message,
      storage,
      "wounded"
    ),
  shaken: (message, args, storage) =>
    toggleDebility((d) => (d.shaken = !d.shaken), message, storage, "shaken"),
  unprepared: (message, args, storage) =>
    toggleDebility(
      (d) => (d.unprepared = !d.unprepared),
      message,
      storage,
      "unprepared"
    ),
  encumbered: (message, args, storage) =>
    toggleDebility(
      (d) => (d.encumbered = !d.encumbered),
      message,
      storage,
      "encumbered"
    ),
  maimed: (message, args, storage) =>
    toggleDebility((d) => (d.maimed = !d.maimed), message, storage, "maimed"),
  corrupted: (message, args, storage) =>
    toggleDebility(
      (d) => (d.corrupted = !d.corrupted),
      message,
      storage,
      "corrupted"
    ),
  cursed: (message, args, storage) =>
    toggleDebility((d) => (d.cursed = !d.cursed), message, storage, "cursed"),
  tormented: (message, args, storage) =>
    toggleDebility(
      (d) => (d.tormented = !d.tormented),
      message,
      storage,
      "tormented"
    ),
};

async function toggleDebility(
  f: (d: Debilities) => any,
  message: Message,
  storage: Storage,
  name: string
) {
  const player = await storage.getPlayer(message.author.id);
  const condition = f(player.character.debilities);
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} is ${condition ? "" : "not "}${name}.`
  );
}
