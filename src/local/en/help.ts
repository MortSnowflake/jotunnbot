import { ICommand } from "..";

export const helpCommands: {
  [id: string]: ICommand;
} = {
  help: {
    title: "Help",
    description: "",
    helpText:
      "To get detailed information about a command send ```<command> help``` or ```<command> h```",
    aliases: ["?", "help"],
  },
};

export const help = {
  aliases: "aliases",
  playerRoleError:
    'Fill in the character information to the end and choose 3 assets. Details in the channel "assistant"',
  commands: "Commands",
  upAliases: "Aliases",
};
