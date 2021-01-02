import { d } from "../dice/dice.utils";
import { MessageEmbed } from "discord.js";
import { COLORS } from "../discord/discord-colors";
import { CustomOracle } from "./oracles.model";
import { TextChannel } from "discord.js";
import { PartialUser } from "discord.js";
import { User } from "discord.js";
import { Local } from "../../local";
import { IResult } from "../../local/en/oracles/datasworn";

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

export function oracleLookupTable(
  channel: TextChannel,
  author: User | PartialUser,
  args: string[],
  local: Local
) {
  const { oracleTables, oracleTypes } = local.oracles;
  if (args.length < 1) {
    channel.send(getOracleList(local.oracles.oracleTypes));
    return;
  }
  const oracleName = args.join(" ").toLowerCase();
  lookupTable(channel, author, oracleName, oracleTables, local);
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

  const oracle = Object.entries(oracles).find(
    ([k]) => k.toLowerCase() === oracleName.toLowerCase()
  );
  if (!oracle) {
    let output =
      `<@${author.id}> ${local.oracles.oraclelow} \`${oracleName}\` ${local.oracles.notFound}.` +
      `${oracleNotFoundMsg} \n${getOracleList(local.oracles.oracleTypes)}`;

    channel.send(output);
    return;
  }

  //TODO: Check for oracle.results
  let roll = d(oracle[1].d ? parseInt(oracle[1].d) : 100);
  let output = `${local.oracles.ask} **${oracle[0]}** ${local.oracles.roll}: **${roll}**…\n`;

  let value = lookup(oracle[1].Results || oracle[1].Prefix || oracle[1], roll)!;
  const list = [];
  switch (oracle[1].Type) {
    case null:
    case undefined:
      output += `<@${author.id}> **${value?.Description}**.`;
      break;
    case "multipleColumns":
      output += `<@${author.id}> ${
        local.oracles.roll
      } **${roll}**: ${value.Description.replace("-", "")}`;
      value = lookup(oracle[1].Suffix, roll)!;
      output += `${value.Description.replace("-", "")}`;
      break;
    case "nested":
      roll = d(value.d ? value.d : 100); //TODO: Accept nested "d"
      output += `    **${value.Description}** ${local.oracles.roll} **${roll}**…\n`;
      const prompt = value.Prompt;
      value = lookup(value.Oracles, roll)!;
      output +=
        `    _${prompt}_\n` + `<@${author.id}> **${value.Description}**.`;
      break;
    case "custom":
    default:
      console.error(
        `${local.oracles.oraclelow} '${oracle[0]}' ${local.oracles.unsupported} '${oracle[1].Type}'.`
      );
  }
  channel.send(output);
}

export function lookup(results: IResult[] | any[], roll: number) {
  return results.find((r) => roll <= r.Chance);
}

export function lookupOld(results: { [id: string]: any }, roll: number) {
  const key = Object.keys(results).find((k) => roll <= parseInt(k))!;
  return results[key];
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

function getOracleList(oracleTypes: any) {
  let oracleDescription = "";
  Object.entries(oracleTypes).forEach(([type, oracles]) => {
    oracleDescription += `**${type}**: ${Object.entries(oracles as any).reduce(
      (result, [title]) => result + title.toLowerCase() + ", ",
      ""
    )} \n\n`;
  });
  return oracleDescription;
}
