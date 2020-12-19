import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { site, getDomainAndTheme } from "./delve.utils";
import { TextChannel } from "discord.js";
import { logRoll, rollArr, lookup } from "../oracles/oracles.utils";
import {
  domains,
  themes,
  deepInDelveTables,
  findOportunityTable,
  revealDangerTable,
} from "../../local/en/delve/delve-en";
import { d, rollActionDice } from "../dice/dice.utils";
import { embedPt, parseProgTracker } from "../tracker/tracker.utils";
import { add } from "../tracker/tracker.manager";
import { Local } from "../../local";

export const delveCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  site,
  rollDenizens: (message, args, storage) =>
    rollInRollChannel(
      message,
      [storage.local.commands.rollInRollChannel.params.aliasesLog[0]],
      storage
    ),
  rollInRollChannel,
  rollSiteFeature,
  deepInDelve,
  findOportunity: (m, a, s) => findOportunity(m, s.local),
  revealDanger: (m, a, s) => revealDanger(m, s.local),
  clearDenizens,
  createRollChat,
  intoOtherDomain,
  intoOtherTheme,
};

async function intoOtherDomain(
  message: Message,
  args: string[],
  storage: Storage
) {
  const channel = message.channel as TextChannel;

  if (
    !args.length ||
    !domains.find((d) => d.title.toLowerCase() === args.join(" ").toLowerCase())
  ) {
    message.channel.send(
      `${storage.local.delve.domainList}: ${domains.reduce(
        (result, current) => result + current.title.toLowerCase() + ", ",
        ""
      )}`
    );
    return;
  }

  const domainAndTheme = getDomainAndTheme(
    channel.name.split("-").join(" "),
    storage.local
  );
  if (domainAndTheme.length === 1) {
    message.channel.send(domainAndTheme[0]);
    return;
  }

  channel.setName(`${args.join("-")}-${domainAndTheme[1]}`);
}

async function intoOtherTheme(
  message: Message,
  args: string[],
  storage: Storage
) {
  const channel = message.channel as TextChannel;

  if (
    !args.length ||
    !themes.find((d) => d.title.toLowerCase() === args.join(" ").toLowerCase())
  ) {
    message.channel.send(
      `${storage.local.delve.themeList}:  ${themes.reduce(
        (result, current) => result + current.title.toLowerCase() + ", ",
        ""
      )}`
    );
    return;
  }

  const domainAndTheme = getDomainAndTheme(
    channel.name.split("-").join(" "),
    storage.local
  );

  if (domainAndTheme.length === 1) {
    message.channel.send(domainAndTheme[0]);
    return;
  }

  channel.setName(`${domainAndTheme[0]}-${args.join("-")}`);
}

async function deepInDelve(message: Message, args: string[], storage: Storage) {
  const channel = message.channel as TextChannel;
  const { local } = storage;
  //guards
  if (!args.length) {
    channel.send(local.commands.deepInDelve.helpText);
    return;
  }

  let attr: string | undefined;
  for (const key in local.commands.deepInDelve.params) {
    if (local.commands.deepInDelve.params[key].includes(args[0])) {
      attr = key;
      break;
    }
  }

  if (!attr) {
    channel.send(local.commands.deepInDelve.helpText);
    return;
  }

  //body
  const [result, succes] = await rollActionDice(
    await storage.getPlayer(message.author.id),
    args,
    local
  );
  let resultMsg = `${result}\n\n`;

  if (succes === 2) {
    resultMsg += local.delve.deepInDelveOptions;
    addProgress(local, channel);
  } else if (succes === 1) {
    const point = lookup((deepInDelveTables as any)[attr].results, d(100));
    resultMsg += `${point.value}\n`;
    switch (point.k) {
      case "progressAndDanger":
        addProgress(local, channel);
        resultMsg += revealDanger(message, local, true);
        break;
      case "progress":
        addProgress(local, channel);
        break;
      case "progressAndOpportunity":
        addProgress(local, channel);
        resultMsg += findOportunity(message, local, true);
        break;
      case "doubleProgress":
        addProgress(local, channel, 2);
        resultMsg += revealDanger(message, local, true);
        break;
    }
  } else {
    resultMsg += `${local.delve.revealDangerOptions}\n${revealDanger(
      message,
      local,
      true
    )}`;
  }

  channel.sendWithEmoji(resultMsg);
}

function findOportunity(message: Message, local: Local, inner?: boolean) {
  const result = `${lookup(findOportunityTable, d(100))}\n${
    local.delve.oportunityOptions
  }`;

  if (inner) {
    return result;
  }
  message.channel.send(result);
}

function revealDanger(message: Message, local: Local, inner?: boolean) {
  const domainAndTheme = getDomainAndTheme(
    (message.channel as TextChannel).name.split("-").join(" "),
    local
  );

  if (domainAndTheme.length === 1) {
    message.channel.send(domainAndTheme[0]);
    return;
  }

  const domain = domains.find(
    (d) => d.title.toLowerCase() === domainAndTheme[1].toLowerCase()
  )!;
  const theme = themes.find(
    (t) => t.title.toLowerCase() === domainAndTheme[0].toLowerCase()
  )!;
  const result = lookup(
    { ...theme.dangers, ...domain.dangers, ...revealDangerTable },
    d(100)
  );

  if (inner) {
    return result;
  }
  message.channel.send(result);
}

export function addProgress(local: Local, channel: TextChannel, time = 1) {
  channel.messages.fetchPinned().then((c) => {
    const msg = c.first()!;
    const tracker = parseProgTracker(msg, local);
    add(tracker.track, tracker.rank * time);
    msg.edit(embedPt(tracker, local));
  });
}

function rollSiteFeature(message: Message, args: string[], storage: Storage) {
  const domainAndTheme = getDomainAndTheme(
    (message.channel as TextChannel).name.split("-").join(" "),
    storage.local
  );

  if (domainAndTheme.length === 1) {
    message.channel.send(domainAndTheme[0]);
    return;
  }

  const domain = domains.find(
    (d) => d.title.toLowerCase() === domainAndTheme[1].toLowerCase()
  )!;
  const theme = themes.find(
    (t) => t.title.toLowerCase() === domainAndTheme[0].toLowerCase()
  )!;
  const features = { ...theme.features, ...domain.features };
  message.channel.send(lookup(features, d(100)));
}

function createRollChat(message: Message, args: string[], storage: Storage) {
  if (!args.length) {
    message.channel.send(`${storage.local.commands.createRollChat.helpText}`);
    return;
  }

  let category = message?.guild?.getScenesCathegory(storage.local);

  message?.guild?.channels.create(
    `${storage.local.delve.rollCnlPref} ${args.join(" ")}`,
    {
      type: "text",
      parent: category!,
    }
  );
}

async function rollInRollChannel(
  message: Message,
  args: string[],
  storage: Storage
) {
  if (
    !(message.channel as TextChannel).name.startsWith(
      storage.local.delve.denizenCnlPref
    ) &&
    !(message.channel as TextChannel).name.startsWith(
      storage.local.delve.rollCnlPref
    )
  ) {
    message.channel.send(storage.local.delve.nonDenizenCnlErr);
    return;
  }

  const msg = (await message.channel.messages.fetch())
    .filter(
      (m) =>
        !m.pinned && m.author !== storage.botUser && !m.content.startsWith(".")
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .array()
    .map((m) => m.content.split("|").join(""));

  if (!args.length) {
    message.channel.send(rollArr(msg));
    return;
  }

  if (
    storage.local.commands.rollInRollChannel.params.aliasesExp.includes(args[0])
  ) {
    message.channel.send(logRoll(msg.reverse()));
    return;
  }

  if (
    storage.local.commands.rollInRollChannel.params.aliasesLog.includes(args[0])
  ) {
    message.channel.send(logRoll(msg));
    return;
  }
}

async function clearDenizens(
  message: Message,
  args: string[],
  storage: Storage
) {
  if (
    !(message.channel as TextChannel).name.startsWith(
      storage.local.delve.denizenCnlPref
    ) &&
    !(message.channel as TextChannel).name.startsWith(
      storage.local.delve.rollCnlPref
    )
  ) {
    message.channel.send(storage.local.delve.nonDenizenCnlErr);
    return;
  }

  message.channel.bulkDelete(100);
}
