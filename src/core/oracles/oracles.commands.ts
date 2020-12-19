import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { oracleLookupTable, toEmbed, rollArr, logRoll } from "./oracles.utils";
import { TextChannel } from "discord.js";
import { CustomOracle } from "./oracles.model";
import { addLoyaltyPoint } from "../lore/lore.utils";

export const oraclesCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  oracleLookupTable: (message, args, storage) =>
    oracleLookupTable(
      message.channel as TextChannel,
      message.author,
      args,
      storage.local
    ),
  userTable,
  logUserTable,
  addOracle,
  damage,
  stress,
  price,
};

function userTable(message: Message, args: string[], storage: Storage) {
  if (!args.length) {
    message.channel.send(storage.local.commands.userTable.helpText);
    return;
  }

  if (args.join(" ").includes(";")) {
    args = args
      .join(" ")
      .split(";")
      .map((m) => m.trim());
  }
  message.channel.send(rollArr(args));
}

function logUserTable(message: Message, args: string[], storage: Storage) {
  if (!args.length) {
    message.channel.send(storage.local.commands.userTable.helpText);
    return;
  }

  if (args.join(" ").includes(";")) {
    args = args
      .join(" ")
      .split(";")
      .map((m) => m.trim());
  }
  message.channel.send(logRoll(args));
}

function addOracle(message: Message, args: string[], storage: Storage) {
  if (!args.length) {
    message.channel.send(storage.local.commands.addOracle.helpText);
    return;
  }

  message.channel
    .send(
      toEmbed(
        new CustomOracle(args.shift()!.replace(";", ""), args.join(" ")),
        storage.local
      )
    )
    .then((m) => m.reactEmoji("rolluseroracle"));

  storage
    .getPlayer(message.author.id)
    .then((p) => addLoyaltyPoint(p, storage.local));
}

function damage(message: Message, args: string[], storage: Storage) {
  oracleLookupTable(
    message.channel as TextChannel,
    message.author,
    storage.local.commands.damage.title.split(" "),
    storage.local
  );
}

function stress(message: Message, args: string[], storage: Storage) {
  oracleLookupTable(
    message.channel as TextChannel,
    message.author,
    storage.local.commands.stress.title.split(" "),
    storage.local
  );
}

function price(message: Message, args: string[], storage: Storage) {
  oracleLookupTable(
    message.channel as TextChannel,
    message.author,
    storage.local.commands.price.title.split(" "),
    storage.local
  );
}
