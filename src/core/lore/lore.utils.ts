import { Player } from "../discord/storage";
import { MessageEmbed } from "discord.js";
import { Local } from "../../local";

export async function addLoyaltyPoint(
  player: Player,
  local: Local,
  point = 0.25
) {
  const msg = await player.masterChannel.messages
    .fetchPinned()
    .then((m) => m.first());
  const [cur, all] = parseLoyaltyPoints(msg?.embeds[0]!);
  msg?.edit(
    loyaltyPointsEmbed(local, parseFloat(cur) + point, parseFloat(all) + point)
  );
}

export async function spendLoyaltyPoint(player: Player, local: Local) {
  const msg = await player.masterChannel.messages
    .fetchPinned()
    .then((m) => m.first());
  const [cur, all] = parseLoyaltyPoints(msg?.embeds[0]!);

  if (parseFloat(cur) < 1) {
    return false;
  }

  msg?.edit(loyaltyPointsEmbed(local, parseFloat(cur) - 1, parseFloat(all)));
  return true;
}

export async function hasLoyaltyPoint(player: Player) {
  const msg = await player.masterChannel.messages
    .fetchPinned()
    .then((m) => m.first());

  return parseInt(parseLoyaltyPoints(msg?.embeds[0]!)[0]) > 0;
}

export function loyaltyPointsEmbed(local: Local, current = 0, all = 0) {
  return new MessageEmbed()
    .setTitle(local.master.loyaltyPointsTitle)
    .addFields(
      { name: local.master.loyaltyPointsCurrent, value: current },
      { name: local.master.loyaltyPointsAll, value: all }
    );
}

export function parseLoyaltyPoints(embed: MessageEmbed) {
  return embed.fields.map((m) => m.value);
}
