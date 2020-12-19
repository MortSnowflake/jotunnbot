import { ICommand } from "..";

export const helpCommands: {
  [id: string]: ICommand;
} = {
  help: {
    title: "Помощь",
    description: "",
    helpText:
      "Для того что бы получить подробную информацию о команде отправьте ```<команда> help``` или ```<команда> h```",
    aliases: ["помощь", "?", "help"],
  },
};

export const help = {
  aliases: "Варианты вызова",
  playerRoleError:
    'Заполни информацию о персонаже до конца и выбери 3 буклета. Подробности в канале "помощник"',
};
