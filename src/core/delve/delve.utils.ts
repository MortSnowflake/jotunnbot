import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { viewProgTracker } from "../tracker/tracker.utils";
import {
  ProgTracker,
  progTrackers,
  ProgTrackerType,
} from "../tracker/tracker.model";
import { domains, themes } from "../../local/en/delve/delve-en";
import { rollArr } from "../oracles/oracles.utils";
import { addLoyaltyPoint } from "../lore/lore.utils";
import { Local } from "../../local";

export async function site(message: Message, args: string[], storage: Storage) {
  const { local } = storage;
  if (!args.length) {
    message.channel.send(
      `${local.commands.site.helpText}\n${
        local.delve.domainList
      }: ${domains.reduce(
        (result, current) => result + current.title.toLowerCase() + ", ",
        ""
      )}\n${local.delve.themeList}:  ${themes.reduce(
        (result, current) => result + current.title.toLowerCase() + ", ",
        ""
      )}`
    );
    return;
  }

  if (isNaN(parseInt(args[0]))) {
    message.channel.send(local.commands.site.helpText);
    return;
  }

  const delveTier = parseInt(args.shift()!);
  const domainAndTheme = args.length
    ? getDomainAndTheme(args.join(" "), local)
    : generateDelveCards();

  if (domainAndTheme.length === 1) {
    message.channel.send(domainAndTheme[0]);
    return;
  }
  const [theme, domain] = domainAndTheme;

  let category = message?.guild?.getScenesCathegory(local);

  message?.guild?.channels
    .create(
      `${local.delve.denizenCnlPref} ${local.delve.toThemeAndDomain(
        theme,
        domain
      )}`,
      {
        type: "text",
        parent: category!,
      }
    )
    .then((x) =>
      x.send(local.delve.denizenCnlInstructions).then((m) => m.pin())
    );

  let delveChannel = await message?.guild?.channels.create(
    local.delve.toThemeAndDomain(theme, domain),
    {
      type: "text",
      parent: category!,
    }
  )!;

  await viewProgTracker(
    new ProgTracker(
      local.delve.delveProgress,
      progTrackers[delveTier - 1],
      ProgTrackerType.DELVE
    ),
    delveChannel,
    local
  ).then((r) => r.message.pin());
  delveChannel.send(local.delve.sceneRules);

  addLoyaltyPoint(await storage.getPlayer(message.author.id), local);
}

export function getDomainAndTheme(args: string, local: Local) {
  const [theme, domain] = local.delve.fromThemeAndDomain(args);

  if (!domains.some((d) => d.title.toLowerCase() === domain.toLowerCase())) {
    return [local.delve.wrongDomain];
  }

  if (!themes.some((d) => d.title.toLowerCase() === theme.toLowerCase())) {
    return [local.delve.wrongTheme];
  }

  return [theme, domain];
}

export function generateDelveCards() {
  return [
    rollArr(domains.map((t) => t.title)),
    rollArr(themes.map((t) => t.title)),
  ];
}
