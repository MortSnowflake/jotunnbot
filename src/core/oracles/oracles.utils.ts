import { d } from "../dice/dice.utils";
import { MessageEmbed } from "discord.js";
import { COLORS } from "../discord/discord-colors";
import { CustomOracle } from "./oracles.model";
import { TextChannel } from "discord.js";
import { PartialUser } from "discord.js";
import { User } from "discord.js";
import { Local } from "../../local";

export function toEmbed(oracle: CustomOracle, local: Local) {
  return new MessageEmbed()
    .setColor(COLORS.GREEN)
    .setTitle(oracle.name)
    .setDescription(`||${oracle.items.join(oracle.isSentences ? "\n" : " ")}||`)
    .setFooter(local.oracles.oracle);
}

export function toCustomOracle(embed: MessageEmbed) {
  return new CustomOracle(
    embed.title!,
    embed.description?.split("|").join("")!
  );
}

// function askTheOracle(msg: Message, args: string[]) {
//   const chan = msg.channel;
//   const data = localRu.oracles;
//   const argJumps = data.argJumps;
//   const argLabels = data.argLabels;

//   let invalidArgsMsg =
//     msg.author +
//     " A likelihood is required. Please use a whole number between " +
//     "0-100 or one of the following:\n" +
//     Object.keys(argJumps)
//       .map((s) => "`" + s + "`")
//       .join(", ");
//   const helpOutput = errorHelp(cmdKey);
//   if (helpOutput) invalidArgsMsg += `\n${helpOutput}`;

//   if (args.length < 1) {
//     chan.send(invalidArgsMsg);
//     return;
//   }
//   if (oracles.find((o) => o.title === args[0])) {
//     is_oracleLookupTable(msg, cmdKey, args.slice(1), args);
//     return;
//   }

//   let likelihood = args[0].toLowerCase();
//   const odds = argJumps[likelihood] || Number(likelihood);
//   if (odds == null || odds != ~~odds || odds < 0 || odds > 100) {
//     chan.send(invalidArgsMsg);
//     return;
//   }

//   likelihood = argLabels[odds];
//   if (likelihood == null) {
//     likelihood = `The result is **${odds}%** likely vs.`;
//   } else {
//     likelihood = `The result is ${likelihood} (**${odds}%**) vs.`;
//   }
//   const result = d(100);
//   let output = `${likelihood} **${result}**…\n`;

//   const comment = args.length > 1 ? args.slice(1).join(" ") : null;
//   if (comment) output += `"${comment}"\n`;

//   output += msg.author + " " + (result <= odds ? "**Yes**." : "**No**.");
//   chan.send(output);
// }

export function oracleLookupTable(
  channel: TextChannel,
  author: User | PartialUser,
  args: string[],
  local: Local
) {
  const oracles = local.oracles.tables;
  if (args.length < 1) {
    channel.send(
      `<@${author.id}> ${local.oracles.oracles}: ${oracles.reduce(
        (result, current) => result + current.title.toLowerCase() + ", ",
        ""
      )}`
    );
    return;
  }
  const oracleName = args.join(" ").toLowerCase();
  lookupTable(channel, author, oracleName, oracles, local);
}

export function lookupTable(
  channel: TextChannel,
  author: User | PartialUser,
  oracleName: string,
  oracles: any[],
  local: Local
) {
  const oracleNotFoundMsg = `${local.oracles.specify}:\n`; /* +
    Object.keys(oracles)
      .map((s) => "`" + s + "`")
      .join(", ");*/

  const helpOutput = errorHelp(
    local,
    local.commands.oracleLookupTable.helpText,
    ["<oracle name>"]
  );
  const oracle = oracles.find((o) => o.title.toLowerCase() === oracleName);
  if (!oracle) {
    let output =
      `<@${author.id}> ${local.oracles.oraclelow} \`${oracleName}\` ${local.oracles.notFound}.` +
      `${oracleNotFoundMsg}`;
    if (helpOutput) output += `\n${helpOutput}`;
    channel.send(output);
    return;
  }
  //TODO: Check for oracle.results
  let roll = d(oracle.d ? parseInt(oracle.d) : 100);
  let output = `${local.oracles.ask} **${oracle.title}** ${local.oracles.roll}: **${roll}**…\n`;

  //const comment = args.length > 1 ? args.slice(1).join(" ") : null;
  //if (comment) output += `"${comment}"\n`;

  let value = lookup(oracle.results, roll)!;
  const list = [];
  switch (oracle.type) {
    case null:
    case undefined:
      output += `<@${author.id}> **${value}**.`;
      break;
    case "multipleColumns":
      output += `<@${author.id}> `;
      for (let i = 0; i < value.length; i++) {
        let s = "";
        if (oracle.headers && i < oracle.headers.length) {
          s += `${oracle.headers[i]}: `;
        }
        s += `**${value[i]}**.`;
        list.push(s);
      }
      output += list.join(" ");
      break;
    case "nested":
      roll = d(value.d ? value.d : 100); //TODO: Accept nested "d"
      output += `    **${value.title}** ${local.oracles.vs} **${roll}**…\n`;
      value = lookup(value.results, roll)!;
      output += `    _${value.prompt}_\n` + `<@${author.id}> **${value}**.`;
      break;
    default:
      console.error(
        `${local.oracles.oraclelow} '${oracle.title}' ${local.oracles.unsupported} '${oracle.type}'.`
      );
  }
  channel.send(output);
}

export function lookup(results: { [id: string]: any }, roll: number) {
  const key = Object.keys(results).find((k) => roll <= parseInt(k))!;
  return results[key];
}

function errorHelp(local: Local, cmdKey: string, args?: string[]) {
  const argsStr = args?.length ? args.join(" ") : "";
  return `${local.oracles.send} \`.? ${cmdKey}${argsStr}\` ${local.oracles.forHelp}.`;
}

export function rollArr(arr: string[]) {
  return arr[d(arr.length) - 1];
}

export function logRoll(arr: any[]) {
  if (arr.length < 2) {
    return [];
  }
  return rollArr(logFunc(arr, arr.length > 3 ? 4 : arr.length));
}

function logFunc(arr: any[], chunckSize: number) {
  const rezArr = [];
  const step = ~~(arr.length / chunckSize);
  for (let i = 1; i < chunckSize; i++) {
    for (let j = (i - 1) * step; j < i * step; j++) {
      const item = arr.shift();
      for (let b = 0; b < chunckSize - i; b++) {
        rezArr.push(item);
      }
      rezArr.push(item);
    }
  }
  return [...rezArr, ...arr];
}
