import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { Ability, Asset, AssetEnum } from "./asset.model";
import { Tracker } from "../tracker/tracker.model";
import { TextChannel } from "discord.js";
import { toAsset, viewAssetTemplate } from "./asset.utils";
import { addLoyaltyPoint } from "../lore/lore.utils";

const fs = require("fs");

export const assetCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  addAsset,
};

async function addAsset(message: Message, args: string[], storage: Storage) {
  const { local } = storage;

  if (!args) {
    message.channel.send(local.commands.addAsset.helpText);
    return;
  }

  const separator = args.join(" ").includes("|") ? "|" : ";";

  const [type, name, skill1, skill2, skill3, desc, tracker, customField] = args
    .join(" ")
    .split(separator)
    .map((i) => i.trim());

  const abilities = [
    new Ability(skill1),
    new Ability(skill2),
    new Ability(skill3),
  ];

  const asset = new Asset(
    local.asset.assetParse[type.toUpperCase()],
    name,
    abilities,
    desc,
    tracker ? new Tracker(0, parseInt(tracker), parseInt(tracker)) : undefined,
    customField
  );

  const img = message.attachments.first()?.proxyURL;
  asset.img = img && encodeURIComponent(img);
  const channel = message.guild?.getChannelByName(
    local.asset.assetChanelName[asset.type]
  ) as TextChannel;

  viewAssetTemplate(asset, channel, local);

  storage.getPlayer(message.author.id).then((p) => addLoyaltyPoint(p, local));
}

async function harvestAsset(
  message: Message,
  args: string[],
  storage: Storage
) {
  const assCnlArr = Object.values(storage.local.asset.assetChanelName);
  const jsonObj: any = {};

  for await (const assCnl of assCnlArr) {
    const channel = await message.guild?.getChannelByName(assCnl);
    const messages = await message.channel.getMessageBunch();
    jsonObj[assCnl] = messages
      .filter((m) => m.embeds?.length)
      .map((m) => toAsset(m.embeds[0], storage.local));
  }

  const data = JSON.stringify(jsonObj);

  fs.writeFileSync("assets.json", data, (err: any) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}

export async function bootstrapAssets(
  message: Message,
  args: string[],
  storage: Storage
) {
  const { asset } = storage.local;
  const assCnlArr = Object.values(asset.assetChanelName);

  for await (const assCnl of assCnlArr) {
    const channel = (await message.guild?.getChannelByName(
      assCnl
    )) as TextChannel;
    await channel.customBulkDelete(100);
    const assets = asset.assets[assCnl];
    assets?.forEach(async (a: any) => {
      await viewAssetTemplate(
        a as Asset,
        channel as TextChannel,
        storage.local
      );
    });
  }

  const other = assCnlArr[assCnlArr.length - 1];
  const channelCnl = (await message.guild?.getChannelByName(
    other
  )) as TextChannel;
  channelCnl.sendWithEmoji(storage.local.asset.customAsset);
}
