import { Guild, GuildMember, TextChannel, MessageEmbed } from "discord.js";
import { CategoryChannel } from "discord.js";
import { Local } from "../../local";
import { emojiArr } from "./custom.emoji";
import { Message } from "discord.js";

declare module "discord.js" {
  export interface Guild {
    getAllChannels(): GuildChannel[];
    getChannel(id: string): GuildChannel | undefined;
    getChannelByName(name: string): GuildChannel | undefined;
    sendToChannel(
      message: string,
      channelId: string
    ): Promise<Message> | undefined;
    createPrivateChannel(
      userId: string,
      name: string,
      local: Local,
      member?: GuildMember
    ): Promise<TextChannel>;
    createPublicChannel(name: string, category: string): Promise<TextChannel>;
    getTableChannel(local: Local): TextChannel;
    getChronicChannel(local: Local): TextChannel;
    getScenesCathegory(local: Local): CategoryChannel;
    getChannelsInfo(local: Local): TextChannel;
    getTestChronicChannel(local: Local): TextChannel;
  }

  export interface Channel {
    sendWithEmoji(msg: string | MessageEmbed): Promise<Message>;
    sendWithChannelAndEmoji(msg: string | MessageEmbed): Promise<Message>;
    getMessageBunch(limit?: number): Promise<Message[]>;
    customBulkDelete(limit?: number): Promise<void>;
  }

  export interface Message {
    reactEmoji(emoji: string): Promise<MessageReaction>;
    editWithEmoji(msg: string | MessageEmbed): Promise<Message>;
    editWithChannelAndEmoji(msg: string | MessageEmbed): Promise<Message>;
  }
}

TextChannel.prototype.getMessageBunch = async function (limit = 500) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      (options as any).before = last_id;
    }

    const messages = await this.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages?.last()?.id;

    if (messages.size != 100 || sum_messages.length >= limit) {
      break;
    }
  }

  return sum_messages;
};

TextChannel.prototype.customBulkDelete = async function (limit = 500) {
  const msgs = await this.getMessageBunch(limit);
  for await (const m of msgs) {
    m.delete();
  }
};

Message.prototype.reactEmoji = function (emoji: string) {
  return this.react(
    this.guild!.emojis.cache.array().find((e) => e.name === emoji)!.id
  );
};

Message.prototype.editWithEmoji = function (msg: string | MessageEmbed) {
  if (typeof msg === "string") {
    return this.edit(replaceEmoji(msg, this.guild!));
  }

  msg.description = replaceEmoji(msg.description!, this.guild!);
  return this.edit(msg);
};

Message.prototype.editWithChannelAndEmoji = function (
  msg: string | MessageEmbed
) {
  if (typeof msg === "string") {
    return this.edit(
      replaceEmoji(replaceChannels(msg, this.guild!), this.guild!)
    );
  }

  msg.description = replaceEmoji(
    replaceChannels(msg.description!, this.guild!),
    this.guild!
  );
  return this.edit(msg);
};

TextChannel.prototype.sendWithEmoji = function (msg: string | MessageEmbed) {
  if (typeof msg === "string") {
    return this.send(replaceEmoji(msg, this.guild));
  }

  msg.description = replaceEmoji(msg.description!, this.guild);

  return this.send(msg);
};

TextChannel.prototype.sendWithChannelAndEmoji = function (
  msg: string | MessageEmbed
) {
  if (typeof msg === "string") {
    const gg = replaceChannels(msg, this.guild);
    return this.send(replaceEmoji(gg, this.guild));
  }

  msg.description = replaceEmoji(
    replaceChannels(msg.description!, this.guild),
    this.guild
  );

  return this.send(msg);
};

Guild.prototype.getAllChannels = function () {
  return this.channels.cache.array();
};

Guild.prototype.getChannel = function (id: string) {
  return this.channels.cache.get(id);
};

Guild.prototype.getChannelByName = function (name: string) {
  return this.channels.cache.find((c) => c.name === name) as TextChannel;
};

Guild.prototype.sendToChannel = function (message: string, channelId: string) {
  return (this.getChannel(channelId) as GuildMember | undefined)?.send(message);
};

Guild.prototype.createPrivateChannel = async function (
  userId: string,
  name: string,
  local: Local,
  member?: GuildMember
) {
  const cathegory =
    !member || member.hasPermission("ADMINISTRATOR")
      ? undefined
      : (this.channels.cache.find(
          (c) =>
            c.name === local.discord.myCathegoryName &&
            c.type === "category" &&
            (c as CategoryChannel).children?.size < 36
        ) as CategoryChannel) ||
        (await this.channels
          .create(local.discord.myCathegoryName, {
            type: "category",
            permissionOverwrites: [
              {
                id: this.id, // shortcut for @everyone role ID
                deny: "VIEW_CHANNEL",
              },
            ],
          })
          .then((c) => c.setPosition(0)));

  return this.channels.create(name, {
    type: "text",
    parent: cathegory,
    permissionOverwrites: [
      {
        id: this.id, // shortcut for @everyone role ID
        deny: "VIEW_CHANNEL",
      },
      {
        id: userId,
        allow: "VIEW_CHANNEL",
      },
    ],
  });
};

Guild.prototype.createPublicChannel = function (
  name: string,
  category: string
) {
  return this.channels.create(name, {
    type: "text",
    parent: this.channels.cache.find(
      (c) => c.name === category && c.type === "category"
    ) as CategoryChannel,
  });
};

Guild.prototype.getTableChannel = function (local: Local) {
  return this.channels.cache.find(
    (c) => c.name == local.discord.tableChannel
  ) as TextChannel;
};

Guild.prototype.getChronicChannel = function (local: Local) {
  return this.channels.cache.find(
    (c) => c.name == local.discord.chronicChannel
  ) as TextChannel;
};

Guild.prototype.getTestChronicChannel = function (local: Local) {
  return this.channels.cache.find(
    (c) => c.name == local.discord.testChronicChannel
  ) as TextChannel;
};

Guild.prototype.getScenesCathegory = function (local: Local) {
  return this.channels.cache.find(
    (c) => c.name == local.discord.sceneCathegoryName && c.type == "category"
  ) as CategoryChannel;
};

Guild.prototype.getChannelsInfo = function (local: Local) {
  return this.channels.cache.find(
    (c) => c.name == local.discord.channelsInfo
  ) as TextChannel;
};

function replaceEmoji(text: string, guild: Guild) {
  return text
    .split("~")
    .map((i) =>
      emojiArr.includes(i)
        ? guild.emojis.cache
            .array()
            .find((emoji) => emoji.name === i)!
            .toString()
        : i
    )
    .join("");
}

function replaceChannels(text: string, guild: Guild) {
  const splitted = text.split("#");

  if (splitted.length > 1) {
    const skip = splitted.shift();
    return [
      skip,
      ...splitted.map((w) => {
        const arr = w.split(" ");
        arr[0] = guild.getChannelByName(arr[0])?.toString()!;
        return arr.join(" ");
      }),
    ].join("");
  }
  return text;
}
