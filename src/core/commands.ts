import { Message, TextChannel } from "discord.js";
import { Storage } from "./discord/storage";
import { helpCommands } from "./help/help.commands";
import { diceCommands } from "./dice/dice.commands";
import { oraclesCommands } from "./oracles/oracles.commands";
import { charCommands } from "./character/character.commands";
import { debilityCommands } from "./character/debility.commands";
import { assetCommands } from "./asset/asset.commands";
import { cheatCommands } from "./character/cheat.commands";
import { loreCommands } from "./lore/lore.commands";
import { progTrackerCommands } from "./tracker/tracker.commands";
import { delveCommands } from "./delve/delve.commands";
import { makeMove } from "./dice/make-move";
import { helpOne } from "./help/help.commands";
import { COLORS } from "./discord/discord-colors";
import { wizard } from "./character/character.wizard";

export function onCommand(
  message: Message,
  storage: Storage,
  cmdPrefix: string
) {
  if (message.content.startsWith(cmdPrefix)) {
    const [alias, ...args] = message.content.split(" ");
    const command = findCommand(alias.substr(1), storage);

    if (
      command &&
      args.some((value) => storage.local.commands.help.aliases.includes(value))
    ) {
      helpOne(storage.local, message.channel as TextChannel, command);
      return;
    }

    if (!message.guild) {
      return;
    }

    if (
      command &&
      ![
        "bootstrap",
        "start",
        "remove",
        "oracleLookupTable",
        "getRole",
      ].includes(command) &&
      !message.guild
        .member(message.author)
        ?.roles.cache.array()
        .some((r) => r.color === COLORS.GREEN)
    ) {
      message.channel.send(storage.local.help.playerRoleError);
      return;
    }

    if (command && commands[command] !== undefined) {
      commands[command](message, args, storage);
      return;
    }
    const move = (storage.local.moves as any[]).find((m) =>
      m.aliases.includes(alias.substr(1))
    );
    if (move) {
      if (
        !message.guild
          .member(message.author)
          ?.roles.cache.array()
          .some((r) => r.color === COLORS.GREEN)
      ) {
        message.channel.send(storage.local.help.playerRoleError);
        return;
      }
      makeMove(message, args, move, storage);
      return;
    }
  } else if (
    (message.channel as TextChannel).name ===
    storage.local.discord.helperChannelName
  ) {
    wizard(message, storage);
  }
}

function findCommand(alias: string, storage: Storage) {
  for (const key in storage.local.commands) {
    if (storage.local.commands[key].aliases.includes(alias)) {
      return key;
    }
  }
}

const commands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  ...helpCommands,
  ...diceCommands,
  ...oraclesCommands,
  ...charCommands,
  ...debilityCommands,
  ...assetCommands,
  ...cheatCommands,
  ...loreCommands,
  ...progTrackerCommands,
  ...delveCommands,
};
