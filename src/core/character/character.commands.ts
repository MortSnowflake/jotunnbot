import { Message } from "discord.js";
import { Storage } from "../discord/storage";
import { CharacterWizardStep, Attributes, Character } from "./character.model";
import { rollActionDice } from "../dice/dice.utils";
import { add, sub } from "../tracker/tracker.manager";
import { TextChannel } from "discord.js";
import { COLORS } from "../discord/discord-colors";

export const charCommands: {
  [id: string]: (message: Message, args: string[], storage: Storage) => void;
} = {
  remove,
  char,
  subMomentum,
  addMomentum,
  subSupply,
  addSupply,
  subSpirit,
  addSpirit,
  subHealth,
  addHealth,
  addBond,
  subBond,
  useRule,
  editDesc,
  editName,
  editAttributes,
  addAvatar,
  start: (message, args, storage) => start(message.author.id, storage),
  edge: (message, args, storage) => attrRoll("edge", message, args, storage),
  heart: (message, args, storage) => attrRoll("heart", message, args, storage),
  iron: (message, args, storage) => attrRoll("iron", message, args, storage),
  shadow: (message, args, storage) =>
    attrRoll("shadow", message, args, storage),
  wits: (message, args, storage) => attrRoll("wits", message, args, storage),
  health: (message, args, storage) =>
    statusRoll("health", message, args, storage),
  spirit: (message, args, storage) =>
    statusRoll("spirit", message, args, storage),
  supply: (message, args, storage) =>
    statusRoll("supply", message, args, storage),
};

export async function start(userId: string, storage: Storage) {
  const player = await storage.getPlayer(userId);
  if (player.characterWizardStep) {
    player.helperChannel.send(
      storage.local.character.userAlreadyExistMsg(player.character)
    );
  } else {
    player.helperChannel.send(
      `<@${userId}>, ` +
        storage.local.character.wizard.find(
          (w) => w.step === CharacterWizardStep.Name
        )?.message
    );
  }
}

export async function quit(userId: string, storage: Storage) {
  const player = await storage.getPlayer(userId);
  storage.deletePlayer(player);
}

async function remove(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  if (args.join(" ").trim() === player.character.name) {
    storage.renameUserNick(player.userId);
    storage.deleteChar(player);
    storage.clearRoles(message.author, COLORS.GREEN);
  } else {
    message.channel.send(storage.local.character.userDeleteError);
  }
}

async function char(message: Message, args: string[], storage: Storage) {
  const char = await (await storage.getPlayer(message.author.id)).character;
  viewCharList(char, message.channel as TextChannel, storage);
}

async function attrRoll(
  attr: string,
  message: Message,
  args: string[],
  storage: Storage
) {
  const player = await storage.getPlayer(message.author.id);
  args.push((player.character.attributes as any)[attr]);
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

async function addHealth(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);

  if (player.character.debilities.wounded) {
    message.channel.send(storage.local.character.cantIncreaseHealth);
    return;
  }

  add(
    player.character.status.health,
    args?.length ? parseInt(args[0]) : undefined
  );
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasHealth}: ${player.character.status.health.current}`
  );
}

async function subHealth(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  sub(
    player.character.status.health,
    args?.length ? parseInt(args[0]) : undefined
  );
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasHealth}: ${player.character.status.health.current}`
  );
}

async function addSpirit(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);

  if (player.character.debilities.shaken) {
    message.channel.send(storage.local.character.cantIncreaseSpirit);
    return;
  }

  add(
    player.character.status.spirit,
    args?.length ? parseInt(args[0]) : undefined
  );
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasSpirit}: ${player.character.status.spirit.current}`
  );
}

async function subSpirit(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  sub(
    player.character.status.spirit,
    args?.length ? parseInt(args[0]) : undefined
  );
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasSpirit}: ${player.character.status.spirit.current}`
  );
}

async function addSupply(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);

  if (player.character.debilities.unprepared) {
    message.channel.send(storage.local.character.cantIncreaseSupply);
    return;
  }

  add(
    player.character.status.supply,
    args?.length ? parseInt(args[0]) : undefined
  );
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasSupply}: ${player.character.status.supply.current}`
  );
}

async function subSupply(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);

  if (player.character.debilities.unprepared) {
    message.channel.send(
      storage.local.aftermathMoves.find((m) => m.name === "OUT OF SUPPLY")
        ?.description
    );
    return;
  }

  sub(
    player.character.status.supply,
    args?.length ? parseInt(args[0]) : undefined
  );

  if (
    !player.character.debilities.unprepared &&
    player.character.status.supply.current === 0
  ) {
    player.character.debilities.unprepared = true;
  }

  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasSupply}: ${player.character.status.supply.current}`
  );
}

async function addMomentum(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  add(player.character.momentum, args?.length ? parseInt(args[0]) : undefined);
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasMomentum}: ${player.character.momentum.current}`
  );
}

async function subMomentum(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  if (player.character.momentum.current === player.character.momentum.min) {
    message.channel.send(
      storage.local.aftermathMoves.find((m) => m.name === "FACE A SETBACK")
        ?.description
    );
  } else {
    sub(
      player.character.momentum,
      args?.length ? parseInt(args[0]) : undefined
    );
    storage.updatePlayerAndCharEmbed(player);
    message.channel.send(
      `${player.character.name} ${storage.local.character.nowHasMomentum}: ${player.character.momentum.current}`
    );
  }
}

async function addBond(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  add(player.character.bonds);
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasBond}: ${player.character.bonds.current}`
  );
}

async function subBond(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  sub(player.character.bonds);
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `${player.character.name} ${storage.local.character.nowHasBond}: ${player.character.bonds.current}`
  );
}

async function useRule(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  add(player.character.momentum);
  storage.updatePlayerAndCharEmbed(player);
  message.channel.send(
    `<@${message.author.id}> ${storage.local.character.useRule}`
  );
}

async function editName(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  player.character.name = args.join(" ");
  storage.updatePlayerAndCharEmbed(player);
  storage.renameUserNick(player.userId, player.character.name);
}

async function editAttributes(
  message: Message,
  args: string[],
  storage: Storage
) {
  const player = await storage.getPlayer(message.author.id);
  player.character.attributes = new Attributes(args.join(" "));
  storage.updatePlayerAndCharEmbed(player);
}

async function addAvatar(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  const img = message.attachments.first()?.proxyURL;
  if (img) {
    player.character.img = encodeURIComponent(img);
    storage.updatePlayerAndCharEmbed(player);
  }
}

async function editDesc(message: Message, args: string[], storage: Storage) {
  const player = await storage.getPlayer(message.author.id);
  player.character.description = args.join(" ");
  storage.updatePlayerAndCharEmbed(player);
}

async function statusRoll(
  status: string,
  message: Message,
  args: string[],
  storage: Storage
) {
  const player = await storage.getPlayer(message.author.id);
  args.push((player.character.status as any)[status].current);
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

export function viewCharList(
  char: Character,
  channel: TextChannel,
  storage: Storage
) {
  return channel.sendWithEmoji(storage.local.character.listEmbed(char));
}
