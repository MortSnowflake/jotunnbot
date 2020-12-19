import { Asset, Ability } from "./asset.model";
import { COLORS } from "../discord/discord-colors";
import { MessageEmbed, TextChannel } from "discord.js";
import { Tracker } from "../tracker/tracker.model";
import { Local } from "../../local";

export function viewAssetTemplate(
  asset: Asset,
  channel: TextChannel,
  local: Local
) {
  if (!asset.abilities[0].isChecked) {
    return channel
      .send(toEmbed(asset, local))
      .then((x) => x.reactEmoji("takeone"))
      .then((x) => x.message.reactEmoji("taketwo"))
      .then((x) => x.message.reactEmoji("takethree"));
  }
  return channel
    .send(toEmbed(asset, local))
    .then((x) => x.reactEmoji("takeasset"));
}

export const toEmbed = (asset: Asset, local: Local) => {
  const abilities = asset.abilities.reduce(
    (result, item) =>
      result + (item.isChecked ? "⬤ " : "◯ ") + item.description + "\n\n",
    ""
  );

  const embed = new MessageEmbed()
    .setColor(COLORS.DARK_RED)
    .setTitle(asset.name.toUpperCase())
    .setDescription(
      `${asset.description ? asset.description + "\n\n" : ""}${abilities}`
    )
    .setFooter(local.asset.assetType[asset.type]);

  if (asset.img) {
    embed.setThumbnail(decodeURIComponent(asset.img));
  }

  if (asset.customFieldName) {
    embed.addField(asset.customFieldName, asset.customField ?? "__", true);
  }

  if (asset.tracker) {
    embed.addField(
      local.asset.health,
      `${asset.tracker.current}/${asset.tracker.max}`,
      true
    );
  }

  return embed;
};

export function toAsset(embed: MessageEmbed, local: Local) {
  let description: string | undefined;
  const abilities: Ability[] = [];
  const embedArr = embed.description?.split("\n\n").map((i) => i.trim())!;

  embedArr.forEach((item) => {
    if (item.startsWith("⬤")) {
      abilities.push(new Ability(item.substr(1), true));
    } else if (item.startsWith("◯")) {
      abilities.push(new Ability(item.substr(1), false));
    } else {
      description = item;
    }
  });

  const [curHealth, maxHealth] =
    embed.fields.find((f) => f.name === local.asset.health)?.value.split("/") ||
    [];
  const customFieldName = embed.fields.find(
    (f) => f.name !== local.asset.health
  )?.name;
  const customField = embed.fields.find((f) => f.name !== local.asset.health)
    ?.value;

  return new Asset(
    local.asset.assetParse[embed.footer!.text!],
    embed.title!,
    abilities,
    description,
    curHealth
      ? new Tracker(
          0,
          parseInt(maxHealth),
          parseInt(maxHealth),
          parseInt(curHealth)
        )
      : undefined,
    customFieldName,
    customField,
    embed.thumbnail?.proxyURL
  );
}
