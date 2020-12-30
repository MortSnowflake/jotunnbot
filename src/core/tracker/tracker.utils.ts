import { MessageEmbed } from "discord.js";
import { Message, TextChannel } from "discord.js";
import { Local } from "../../local";
import { ProgTracker, ProgTrackerRank, ProgTrackerType } from "./tracker.model";

export function parseProgTracker(msg: Message, local: Local) {
  const pt = msg.embeds[0];
  const [cur, max] = pt
    .footer!.text!.replace(`${local.progTracker.progress}: `, "")
    .split("/");
  return new ProgTracker(
    pt.description!,
    local.progTracker.rankParse[pt.title?.split(" ")[0]!],
    pt.color,
    parseFloat(cur),
    parseFloat(max)
  );
}

export function viewProgTracker(
  pt: ProgTracker,
  channel: TextChannel,
  local: Local
) {
  return channel
    .send(embedPt(pt, local))
    .then((x) => x.reactEmoji("ptdel"))
    .then((x) => x.message.reactEmoji("ptsub"))
    .then((x) => x.message.reactEmoji("ptadd"))
    .then((x) => x.message.reactEmoji("ptroll"));
}

export function embedPt(progTracker: ProgTracker, local: Local) {
  return new MessageEmbed()
    .setColor(progTracker.type)
    .setTitle(
      `${local.progTracker.ranks[progTracker.rank]} ${
        local.progTracker.suffix[progTracker.type]
      } ${local.progTracker.tracker} `
    )
    .setDescription(progTracker.text)
    .setFooter(
      `${local.progTracker.progress}: ${progTracker.track.current}/${progTracker.track.max}`
    );
}

export async function ruleTracker(channel: TextChannel, local: Local) {
  viewProgTracker(
    new ProgTracker(
      local.oracles.languageRules[0],
      ProgTrackerRank.FORMIDIBLE,
      ProgTrackerType.RULE,
      0,
      local.oracles.languageRules.length - 1
    ),
    channel,
    local
  ).then((r) => r.message.pin());
}
