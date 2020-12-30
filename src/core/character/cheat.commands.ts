import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { finishStep } from "./character.wizard";

export const cheatCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  addXp,
  cheats,
  getRole,
  getStatistic,
};

async function addXp(message: Message, args: string[], storage: Storage) {
  const user = message.guild?.members.cache
    .array()
    .find((u) => u.user.username === args[0]);
  if (user) {
    const player = await storage.getPlayer(user.id);
    player.character.xp += parseInt(args[1]);
    storage.updatePlayerAndCharEmbed(player);
  }
}

async function cheats(message: Message, args: string[], storage: Storage) {
  let answer = storage.local.character.allComands;
  for (const key in storage.local.commands) {
    const command = storage.local.commands[key];
    if (command.isHidden) {
      answer += `.${command.aliases[0]}   `;
    }
  }
  message.channel.send(answer + "`");
}

async function getRole(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  try {
    storage.addPlayerRole(player.userId, storage.local);
    finishStep(message, player, storage);
  } catch {
    message.channel.send(storage.local.help.playerRoleErrorAgain);
  }
}

async function getStatistic(
  message: Message,
  args: string[],
  storage: Storage
) {
  message.channel.send(storage.getStatistic());
}
