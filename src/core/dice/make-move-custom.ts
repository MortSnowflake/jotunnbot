import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { IMove } from "../../local";
import { Storage } from "../discord/storage";
import { d, d100, rollProgressDice } from "./dice.utils";

const thresholds = {
  certain: 10,
  likely: 25,
  half: 50,
  unlikely: 75,
  small: 90,
};

export async function makeCustomMove(
  message: Message,
  args: string[],
  move: IMove,
  storage: Storage
) {
  switch (move.customMove) {
    case "ask":
      askOracle(message, args, move, storage);
      break;
    case "epilogue":
      epilogue(message, args, move, storage);
      break;
    default:
      break;
  }
}

async function askOracle(
  message: Message,
  args: string[],
  move: IMove,
  storage: Storage
) {
  if (!args?.length) {
    message.channel.sendWithEmoji(move.description);
    return;
  }
  const { local } = storage;

  const paramKey = Object.entries(move.params).find(
    ([key, value]) => value === args.join(" ")
  )?.[0];
  const treshold = Object.entries(thresholds).find(
    ([key]) => key === paramKey
  )?.[1]!;

  message.channel.sendWithEmoji(
    d(100) > treshold ? local.scene.yes : local.scene.no
  );
}

async function epilogue(
  message: Message,
  args: string[],
  move: IMove,
  storage: Storage
) {
  const player = await storage.getPlayer(message.author.id);
  const [result, success] = rollProgressDice(
    player.userId,
    player.character.bonds.current,
    storage.local
  );

  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(`*${move.name}*\n\n${move.description}`)
  );
  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(result)
  );
  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(move.results[success as number])
  );
}
