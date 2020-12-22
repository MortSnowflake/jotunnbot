import { Client, Constants as C } from "discord.js";
import { onCommand } from "./commands";
import { Storage } from "./discord/storage";
import { buttonHandlers, onButtonClick } from "./button-handlers";
import "./discord/discord-extensions";
import { start, quit } from "./character/character.commands";
import { Message } from "discord.js";
import { PartialUser } from "discord.js";
import { User } from "discord.js";
import { Local } from "../local";
const ws = require("ws");

export function jotunnbot(token: string, local: Local, cmdPrefix = ".") {
  const app = new Client();

  app.on(C.Events.CLIENT_READY, () => {
    console.log("Connected as " + app.user?.tag);
    app.user?.setActivity("v 0.04", { type: undefined });
  });

  app.on(C.Events.ERROR, (error: any) => {
    if (error.target instanceof ws) {
      if (error.target.readyState === ws.CLOSED) {
        app.destroy();
        app.login(token);
      }
    }
  });

  app.on(C.Events.GUILD_MEMBER_ADD, (member) => {
    if (member.id === app.user?.id) {
      return;
    }
    start(member.id, new Storage(app.user!, local, member.guild));
  });

  app.on(C.Events.GUILD_MEMBER_REMOVE, (member) => {
    if (member.id === app.user?.id) {
      return;
    }
    quit(member.id, new Storage(app.user!, local, member.guild));
  });

  app.on(C.Events.MESSAGE_CREATE, (message) => {
    if (message.author.id === app.user?.id) {
      return;
    }

    onCommand(
      message,
      new Storage(app.user!, local, message.guild!),
      cmdPrefix
    );
  });

  app.on(C.Events.RAW as any, (packet: any) => {
    // We don't want this to run on unrelated packets
    if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t))
      return;

    if (packet.d.user_id === app.user?.id) {
      return;
    }

    // Grab the channel to check the message from
    const channel = app.channels.cache.get(packet.d.channel_id);
    // Since we have confirmed the message is not cached, let's fetch it
    //@ts-ignore
    channel.messages.fetch(packet.d.message_id).then((message) => {
      const reaction = message.reactions.cache.get(packet.d.emoji.id) ?? {
        emoji: packet.d.emoji,
        message,
        author: app.users.cache.get(packet.d.user_id) || {
          id: packet.d.user_id,
        },
      };

      onButtonClick(
        reaction,
        app.users.cache.get(packet.d.user_id) ||
          ({ id: packet.d.user_id } as User),
        new Storage(app.user!, local, message.guild),
        buttonHandlers
      );
    });
  });
  app.login(token);
}

export interface IReaction {
  emoji: IEmoji;
  message: Message;
  remove?: () => void;
  author: User | PartialUser;
}

export interface IEmoji {
  id: string;
  name: string;
}
