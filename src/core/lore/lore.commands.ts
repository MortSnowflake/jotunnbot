import { Message } from "discord.js";
import { Player, Storage } from "../discord/storage";
import { TextChannel } from "discord.js";
import { d } from "../dice/dice.utils";
import { spendLoyaltyPoint, addLoyaltyPoint } from "./lore.utils";
import {
  ProgTracker,
  ProgTrackerRank,
  ProgTrackerType,
} from "../tracker/tracker.model";
import {
  viewProgTracker,
  parseProgTracker,
  ruleTracker,
} from "../tracker/tracker.utils";
import { helpOne } from "../help/help.commands";
import { rollArr } from "../oracles/oracles.utils";
import { bootstrapAssets } from "../asset/asset.commands";
import {
  bootstrapMoves,
  bootstrapRules,
  createRulesChannels,
} from "../dice/dice.commands";

export const loreCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  scene,
  doomScene: (m, a, s) => scene(m, a, s, true),
  sceneEnd,
  rerollWithLP,
  addLP,
  master,
  bootstrap,
};

async function master(message: Message, args: string[], storage: Storage) {
  const { local } = storage;
  if (!args.length) {
    (message.channel as TextChannel).setTopic(
      `${local.scene.gm}: ${message.author.username}`
    );
    return;
  }

  if (args[0] === local.scene.no) {
    (message.channel as TextChannel).setTopic(local.scene.coop);
    return;
  }

  if (args.length === 1) {
    (message.channel as TextChannel).setTopic(`${local.scene.gm}: ${args[0]}`);
    return;
  }

  (message.channel as TextChannel).setTopic(
    `${local.scene.gm}: ${rollArr(args)}`
  );
}

async function addLP(message: Message, args: string[], storage: Storage) {
  const { local } = storage;
  const user = message.guild?.members.cache
    .array()
    .find((u) => u.user.username === args[0]);
  if (!user) {
    message.channel.send(local.master.loyaltyPointsGrantErr);
    return;
  }
  addLoyaltyPoint(
    await storage.getPlayer(user.id),
    local,
    args.length > 1 ? parseInt(args[1]) : 0.25
  );

  message.channel.send(local.master.loyaltyPointsGrantSucces);
}

async function rerollWithLP(
  message: Message,
  args: string[],
  storage: Storage
) {
  const { local } = storage;
  const dRes = args.length && args[0] === "6" ? d(6) : d(10);
  const player = await storage.getPlayer(message.author.id);

  if (await spendLoyaltyPoint(player, local)) {
    message.channel.send(local.master.loyaltySpendSucces + dRes);
    return;
  }

  message.channel.send(local.master.loyaltySpendError);
}

async function scene(
  message: Message,
  args: string[],
  storage: Storage,
  withDoom: boolean = false
) {
  const { local } = storage;
  const player = await storage.getPlayer(message.author.id);
  if (!args.length) {
    helpOne(local, player.helperChannel, "scene");
    return;
  }

  let category = message?.guild?.getScenesCathegory(local);

  if (category) {
    const msg = await message?.guild?.channels
      .create(
        args.join(" ") ||
          `${local.discord.channelPrefix} ${~~(Math.random() * 1000) + 1}`,
        {
          type: "text",
          parent: category,
        }
      )
      .then((с) => с.send(local.scene.sceneRules))
      .then((m) => m.pin())!;

    if (msg.guild?.isLanguageLearning(storage.local)) {
      await msg.channel.send(local.scene.languageRule);
      await ruleTracker(msg.channel as TextChannel, local);
    }

    if (withDoom) {
      viewProgTracker(
        new ProgTracker(
          local.scene.doomPointsTracker,
          ProgTrackerRank.FORMIDIBLE,
          ProgTrackerType.DOOM,
          0,
          3
        ),
        msg.channel as TextChannel,
        local
      ).then((r) => r.message.pin());
    }

    addLoyaltyPoint(player, local);
  }
}

async function sceneEnd(message: Message, args: string[], storage: Storage) {
  const channel = message.channel as TextChannel;
  const players: Player[] = [];
  const playerIds: string[] = [];
  const { local } = storage;

  if (channel.parentID !== message?.guild?.getScenesCathegory(local).id) {
    return;
  }

  const doomMsg = (await channel.messages.fetchPinned())
    .array()
    .find((m) => m.embeds.length && m.embeds[0].color === ProgTrackerType.DOOM);

  if (doomMsg && parseProgTracker(doomMsg, local).track.current < 3) {
    channel.send(local.scene.doomPointsDontForget);
    return;
  }

  const sceneName = /*args.length ? args.join(" ") :*/ channel.name
    .split("-")
    .join(" ");
  const chronic =
    args.length && args[0] !== "0"
      ? message?.guild?.getTestChronicChannel(local)!
      : message?.guild?.getChronicChannel(local)!;

  if (!channel.name.startsWith(local.delve.denizenCnlPref)) {
    const rawMessages = await message.channel.getMessageBunch();

    const unsortedMessages = rawMessages.filter(
      (m) =>
        !!m.content &&
        !m.content.startsWith(".") &&
        m.author !== storage.botUser &&
        (!m.content.startsWith("*") || m.content.startsWith("**"))
    );

    const messages = unsortedMessages.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

    chronic.sendWithEmoji(`**${sceneName.toUpperCase()}**\n~stub~`);
    for await (const m of messages) {
      const player = await storage.getPlayer(m.author.id);

      if (!playerIds.includes(m.author.id)) {
        players.push(player);
        playerIds.push(m.author.id);
      }

      await chronic.sendWithEmoji(
        (m.content.includes(":")
          ? m.content.startsWith(`${local.scene.me}:`)
            ? m.content.replace(
                `${local.scene.me}:`,
                `${player.character.name}:`
              )
            : m.content.startsWith(
                `${
                  local.scene.me.charAt(0).toUpperCase() +
                  local.scene.me.slice(1)
                }:`
              )
            ? m.content.replace(
                `${
                  local.scene.me.charAt(0).toUpperCase() +
                  local.scene.me.slice(1)
                }:`,
                `${player.character.name}:`
              )
            : m.content
          : `${local.scene.storyteller} (${m.author.username}): ${m.content}`) +
          `\n~stub~`
      );
    }

    if (!args.length) {
      players.forEach((p) => {
        p.helperChannel.send(
          `${local.scene.endOfSceneAdvice(
            sceneName
          )}. ${local.scene.worldIsChanging(
            message.guild
              ?.getChannelByName(local.discord.worldIsChanging)
              ?.toString()!
          )}`
        );
        p.character.xp++;
        storage.updatePlayerAndCharEmbed(p);
      });
    }
  }
  if (!args.length) {
    message.channel.delete();
  }

  addLoyaltyPoint(await storage.getPlayer(message.author.id), local);
}

async function bootstrap(message: Message, args: string[], storage: Storage) {
  if (
    !args ||
    !args.length ||
    !message.member!.hasPermission("ADMINISTRATOR")
  ) {
    return;
  }

  const [arg] = args;
  const { params } = storage.local.separatedCommands.loreCommands.bootstrap;

  if (params.all === arg || params.assets === arg) {
    await bootstrapAssets(message, args, storage);
  }

  if (params.all === arg || params.rules === arg) {
    await bootstrapRules(message, args, storage);
  }

  if (params.all === arg || params.moves === arg) {
    await bootstrapMoves(message, args, storage);
  }

  if (params.channels === arg) {
    await createRulesChannels(message, args, storage);
  }
}
