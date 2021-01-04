import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { rollActionDice, d100, d, rollProgressDice, sum } from "./dice.utils";
import { TextChannel } from "discord.js";
import { Local } from "../../local";

export const diceCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  d100: (message, a, s) => message.channel.send(d100(s.local)),
  d6: (message) => message.channel.send(d(6)),
  d10: (message) => message.channel.send(d(10)),
  dAny: (message, args) =>
    args.length && message.channel.send(d(sum(args.map((a) => parseInt(a))))),
  actionRoll,
  rollProgressDice: (m, a, s) =>
    a.length
      ? m.channel.sendWithEmoji(
          rollProgressDice(m.author.id, parseInt(a[0]), s.local)[0] as string
        )
      : undefined,
  allMoves,
  sendMoveDescriptions: (m, a, s) =>
    sendMoveDescriptions(m.channel as TextChannel, a, s.local),
  mixPotion,
  pickPlants,
};

async function actionRoll(message: Message, args: string[], storage: Storage) {
  const [result, s, t, a, burnable, luckable] = await rollActionDice(
    await storage.getPlayer(message.author.id),
    args,
    storage.local
  );

  message.channel.sendWithEmoji(result as string).then((msg) => {
    if (burnable) {
      msg.reactEmoji("moment");
    }

    if (luckable) {
      msg.reactEmoji("luck");
    }
  });
}

async function sendMoveDescriptions(
  channel: TextChannel,
  args: string[],
  local: Local
) {
  if (!args.length) {
    channel.send(
      `${local.adventureMoves[0].type}, ${local.battleMoves[0].type}, ${local.relationMoves[0].type}, ${local.aftermathMoves[0].type}, ${local.fateMoves[0].type}, ${local.delveMoves[0].type}`
    );
    return;
  }

  for await (const move of local.moves.filter(
    (m) => m.type === args.join(" ")
  )) {
    const aliasesArr = !!move.aliases?.length
      ? move.aliases
      : move.fakeAliases || [];
    const aliases = aliasesArr.length
      ? `${local.help.aliases}: \`.${aliasesArr.join(" `  `.")} \`\n`
      : "";

    const results = move.results?.length
      ? move.results
          .reverse()
          .reduce((result, item) => `${result}${item}\n\n`, "")
      : "";

    const result = `**${move.name}**\n${aliases}\n${move.description}\n\n${results}\n~stub~`;

    if (result.length > 1600) {
      await channel.sendWithEmoji(
        `**${move.name}**\n${aliases}\n${move.description}\n~stub~`
      );
      await channel.sendWithEmoji(`${results}\n~stub~`);
    } else {
      await channel.sendWithEmoji(result);
    }
  }
}

export async function bootstrapRules(
  message: Message,
  args: string[],
  storage: Storage
) {
  const rules = storage.local.rules;

  if (!message.guild?.isLanguageLearning(storage.local)) {
    rules[2].messages.pop();
  }

  for await (const rule of storage.local.rules) {
    const channel = (await message.guild?.getChannelByName(
      rule.channel
    )) as TextChannel;
    await channel.customBulkDelete(100);
    await rule.messages.forEach(
      async (m) => await channel.sendWithChannelAndEmoji(m)
    );
  }
}

export async function bootstrapMoves(
  message: Message,
  args: string[],
  storage: Storage
) {
  const moveArr = [
    storage.local.adventureMoves[0].type,
    storage.local.relationMoves[0].type,
    storage.local.battleMoves[0].type,
    storage.local.aftermathMoves[0].type,
    storage.local.fateMoves[0].type,
    storage.local.delveMoves[0].type,
  ];

  for await (const move of moveArr) {
    const channel = (await message.guild?.getChannelByName(
      move.toLowerCase().split(" ").join("-")
    )) as TextChannel;
    await channel.customBulkDelete(100);
    await sendMoveDescriptions(
      channel as TextChannel,
      move.split(" "),
      storage.local
    );
  }
}

export async function createRulesChannels(
  message: Message,
  args: string[],
  storage: Storage
) {
  for await (const rule of storage.local.rules) {
    await message.guild?.createPublicChannel(
      rule.channel,
      storage.local.discord.rulesCathegoryName
    );
  }

  const moveArr = [
    storage.local.adventureMoves[0].type,
    storage.local.relationMoves[0].type,
    storage.local.battleMoves[0].type,
    storage.local.aftermathMoves[0].type,
    storage.local.fateMoves[0].type,
    storage.local.delveMoves[0].type,
  ];

  for await (const move of moveArr) {
    await message.guild?.createPublicChannel(
      move,
      storage.local.discord.rulesCathegoryName
    );
  }
}

function allMoves(message: Message, args: string[], storage: Storage) {
  let answer = `${storage.local.adventureMoves[0].type}:\n\``;
  storage.local.adventureMoves.forEach(
    (m) => (answer += `.${m.aliases[0]}   `)
  );
  answer += `\`\n\n${storage.local.battleMoves[0].type}:\n\``;
  storage.local.battleMoves.forEach((m) => (answer += `.${m.aliases[0]}   `));
  answer += `\`\n\n${storage.local.relationMoves[0].type}:\n\``;
  storage.local.relationMoves.forEach((m) => (answer += `.${m.aliases[0]}   `));
  message.channel.send(answer + "`");
}

function mixPotion(message: Message, args: string[], storage: Storage) {
  const { youGet, nothing, alchemy } = storage.local.dice;

  if (!args?.length) {
    message.channel.send(youGet + nothing);
    return;
  }

  args = args
    .join(" ")
    .split("+")
    .map((s) => s.trim());

  if (args.length !== 2) {
    message.channel.send(youGet + nothing);
    return;
  }

  console.log(args);

  const firstEl = Object.entries(alchemy.substances).find(([name, herbs]) =>
    herbs.includes(args[0].toLowerCase())
  )?.[0];
  const secondEl = Object.entries(alchemy.substances).find(([name, herbs]) =>
    herbs.includes(args[1].toLowerCase())
  )?.[0];

  if (!firstEl || !secondEl) {
    message.channel.send(youGet + nothing);
    return;
  }

  const result =
    Object.entries(alchemy.formulae).find(
      ([name, recipe]) => recipe.includes(firstEl) && recipe.includes(secondEl)
    )?.[0] || nothing;

  message.channel.send(youGet + result);
}

function pickPlants(message: Message, args: string[], storage: Storage) {
  let herbs = [];
  for (let index = 0; index < 1 + d(3); index++) {
    herbs.push(
      Object.entries(storage.local.dice.alchemy.substances)[d(6) - 1][1][
        d(4) - 1
      ].toLowerCase()
    );
  }

  message.channel.send(`${storage.local.dice.pickedHerbs} ${herbs.join(", ")}`);
}
