import { Message, MessageEmbed, TextChannel } from "discord.js";
import { IMove, Local } from "../../local";
import { sendStep } from "../character/character.wizard";
import { Storage } from "../discord/storage";

import {
  progTrackers,
  ProgTracker,
  ProgTrackerType,
} from "../tracker/tracker.model";
import { viewProgTracker } from "../tracker/tracker.utils";
import { rollActionDice } from "./dice.utils";

export async function makeMove(
  message: Message,
  args: string[],
  move: IMove,
  storage: Storage
) {
  const { local } = storage;
  if (
    (move.argIsRequired && !args.length) ||
    (args.length && storage.local.commands.help.aliases.includes(args[0])) ||
    (move.findFromCode === "enterTheFray" && args.length < 3)
  ) {
    message.channel.sendWithEmoji(
      new MessageEmbed().setDescription(
        `*${move.name}*\n${local.help.aliases}: \`.${move.aliases.join(
          " `  `."
        )} \`\n\n${move.description}`
      )
    );
    return;
  }

  let battleTrack;

  const player = await storage.getPlayer(message.author.id);

  if (
    move.trainingStep &&
    player.characterWizardStep === move.trainingStep - 1 &&
    message.channel.id === player.helperChannel.id
  ) {
    makeTrainingMove(message, args, move, storage);
    return;
  }

  if (move.findFromCode === "enterTheFray") {
    const attr = args.shift()!.split("+");
    const rank = progTrackers[parseInt(args.shift()!) - 1];
    battleTrack = new ProgTracker(args.join(" "), rank, ProgTrackerType.BATTLE);
    args = attr;
  }

  if (args.length && isNaN(parseInt(args[0]))) {
    let attr: string | undefined;
    for (const key in local.character.attributes) {
      if ((local.character.attributes as any)[key].aliases.includes(args[0])) {
        attr = key;
        break;
      }
    }
    if (attr) {
      args[0] = (player.character.attributes as any)[attr];
    } else {
      for (const key in storage.local.character.status) {
        if (
          (storage.local.character.status as any)[key].aliases.includes(args[0])
        ) {
          attr = key;
          break;
        }
      }
      if (attr) {
        args[0] = (player.character.status as any)[attr].current;
      }
    }
  } else if (move.attribute) {
    args.push(
      (player.character.attributes as any)[move.attribute] ||
        (player.character.status as any)[move.attribute]?.current
    );
  } else if (move.lowAttribute) {
    const first =
      (player.character.attributes as any)[move.lowAttribute[0]] ||
      (player.character.status as any)[move.lowAttribute[0]]?.current;
    const second =
      (player.character.attributes as any)[move.lowAttribute[1]] ||
      (player.character.status as any)[move.lowAttribute[1]]?.current;
    args.push(first < second ? first : second);
  } else if (move.highAttribute) {
    const first =
      (player.character.attributes as any)[move.highAttribute[0]] ||
      (player.character.status as any)[move.highAttribute[0]]?.current;
    const second =
      (player.character.attributes as any)[move.highAttribute[1]] ||
      (player.character.status as any)[move.highAttribute[1]]?.current;
    args.push(first > second ? first : second);
  }

  const main = `*${move.name}*\n\n${move.intro || move.description}`;

  //add charbouns into args + number ans string bonuses
  if (move.withoutRoll || !move.results?.length) {
    message.channel.sendWithEmoji(
      new MessageEmbed().setDescription(`*${move.name}*\n\n${move.description}`)
    );
    return;
  }

  const [result, success, t, a, burnable, luckable] = await rollActionDice(
    await storage.getPlayer(message.author.id),
    args,
    storage.local
  );

  let desc = result;

  if (burnable) {
    desc += `\n\n${storage.local.dice.momentDesc}`;
  }

  if (luckable) {
    desc += `\n\n${storage.local.dice.luckDesc}`;
  }

  await message.channel.sendWithEmoji(new MessageEmbed().setDescription(main));
  await message.channel
    .sendWithEmoji(new MessageEmbed().setDescription(desc).setFooter(move.name))
    .then((msg) => {
      if (burnable) {
        msg.reactEmoji("moment");
      }

      if (luckable) {
        msg.reactEmoji("luck");
      }
    });
  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(move.results[success as number])
  );

  if (battleTrack) {
    await viewProgTracker(
      battleTrack,
      message.channel as TextChannel,
      local
    ).then((r) => r.message.pin());
  }
}

export async function makeTrainingMove(
  message: Message,
  args: string[],
  move: IMove,
  storage: Storage
) {
  let battleTrack;
  const { local } = storage;

  const player = await storage.getPlayer(message.author.id);

  if (move.findFromCode === "enterTheFray") {
    const attr = args.shift()!;
    const rank = progTrackers[parseInt(args.shift()!) - 1];
    battleTrack = new ProgTracker(args.join(" "), rank, ProgTrackerType.BATTLE);
    args = [attr];
  }

  if (args.length && isNaN(parseInt(args[0]))) {
    let attr: string | undefined;
    for (const key in local.character.attributes) {
      if ((local.character.attributes as any)[key].aliases.includes(args[0])) {
        attr = key;
        break;
      }
    }
    if (attr) {
      args[0] = (player.character.attributes as any)[attr];
    } else {
      for (const key in local.character.status) {
        if ((local.character.status as any)[key].aliases.includes(args[0])) {
          attr = key;
          break;
        }
      }
      if (attr) {
        args[0] = (player.character.status as any)[attr].current;
      }
    }
  } else if (move.attribute) {
    args.push(
      (player.character.attributes as any)[move.attribute] ||
        (player.character.status as any)[move.attribute]?.current
    );
  } else if (move.lowAttribute) {
    const first =
      (player.character.attributes as any)[move.lowAttribute[0]] ||
      (player.character.status as any)[move.lowAttribute[0]]?.current;
    const second =
      (player.character.attributes as any)[move.lowAttribute[1]] ||
      (player.character.status as any)[move.lowAttribute[1]]?.current;
    args.push(first < second ? first : second);
  } else if (move.highAttribute) {
    const first =
      (player.character.attributes as any)[move.highAttribute[0]] ||
      (player.character.status as any)[move.highAttribute[0]]?.current;
    const second =
      (player.character.attributes as any)[move.highAttribute[1]] ||
      (player.character.status as any)[move.highAttribute[1]]?.current;
    args.push(first > second ? first : second);
  }

  const main = `*${move.name}*\n\n${move.intro || move.description}`;

  //add charbouns into args + number ans string bonuses
  if (move.withoutRoll || !move.results?.length) {
    message.channel.sendWithEmoji(
      new MessageEmbed().setDescription(`*${move.name}*\n\n${move.description}`)
    );
    return;
  }

  let ad = 1;
  let chd = [10, 10];
  if (move.trainingResult! === 2) {
    ad = 6;
    chd = [2, 2];
  } else if (move.trainingResult! === 1) {
    ad = 2;
    chd = [1, 10];
  }
  const [result] = await rollActionDice(
    await storage.getPlayer(message.author.id),
    args,
    local,
    ad,
    chd
  );

  await message.channel.sendWithEmoji(new MessageEmbed().setDescription(main));
  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(result).setFooter(move.name)
  );

  await message.channel.sendWithEmoji(
    new MessageEmbed().setDescription(move.results[move.trainingResult!])
  );

  if (battleTrack) {
    await viewProgTracker(
      battleTrack,
      message.channel as TextChannel,
      local
    ).then((r) => r.message.pin());
  }

  player.characterWizardStep++;
  storage.updatePlayer(player);
  sendStep(player.characterWizardStep, message.channel, storage);
}
