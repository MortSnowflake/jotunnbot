import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { TextChannel } from "discord.js";
import { Local } from "../../local";

export const helpCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  help,
};

async function help(message: Message, args: string[], storage: Storage) {
  const { local } = storage;
  let answer = "";
  for (const key in local.separatedCommands) {
    answer += `**${key.replace(local.help.commands, "")}:**  `;
    for (const id in local.separatedCommands[key]) {
      const command = local.separatedCommands[key][id];
      if (!command.isHidden) {
        answer += `.${command.aliases[0]}  `;
      }
    }
    answer += "\n\n";
  }
  message.channel.send(answer);
}

export async function helpOne(local: Local, channel: TextChannel, key: string) {
  const command = local.commands[key];
  const answer = `**${command.title}** ${command.description}\n${
    command.helpText
  }\n${local.help.upAliases}: \`.${command.aliases.join(" `  `.")} \`\n\n`;

  channel.send(answer);
}
