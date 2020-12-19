import { Local } from "../../local";
import { Player } from "../discord/storage";
import { hasLoyaltyPoint } from "../lore/lore.utils";

export function d(sides: number): number;
export function d(sides: number, count: number): number[];
export function d(sides: number, count = 1): number | number[] {
  return count === 1
    ? ~~(Math.random() * sides) + 1
    : Array.apply(null, Array(count)).map(() => ~~(Math.random() * sides) + 1);
}

export async function rollActionDice(
  player: Player,
  args: string[],
  local: Local,
  act?: number,
  chd?: number[]
) {
  const mods = args.reduce((m, s) => {
    const i = parseInt(s);
    return m + (i ? i : 0);
  }, 0);

  const challenge = chd || d(10, 2);
  let momentum = player.character.momentum.current;
  let action = act || d(6);

  if (action + momentum === 0) {
    action = 0;
  }

  let burnable = false;

  const challengeStr = challenge.map((n) =>
    action + mods > n ? `__${n}__` : n
  );
  const modStr = args.reduce((s, n) => {
    const i = parseInt(n);
    if (!i && i !== 0) return s;
    return s + (i < 0 ? "-" : "+") + Math.abs(i);
  }, "");

  let result = `**${action + mods}**`;
  if (modStr) result += ` (**${action}**${modStr})`;
  result += ` vs. **${challengeStr[0]}** & **${challengeStr[1]}**`;

  let success = 0;
  for (let i = 0; i < challenge.length; i++) {
    //successes
    if (action + mods > challenge[i]) {
      success++;
    }

    //burnable
    if (
      action + mods < momentum &&
      momentum > challenge[i] &&
      action + mods <= challenge[i]
    ) {
      burnable = true;
    }
  }

  const successStr = local.dice.actionResults[success];
  result += `\n<@${player.userId}> ${successStr}`;

  const twist = challenge[0] === challenge[1];

  if (twist) {
    result += local.dice.twist;
  }
  if (action === 1) {
    result += local.dice.critOne;
  }
  if (action === 6) {
    result += local.dice.critSix;
  }

  const luckable = (await hasLoyaltyPoint(player)) && success < 2;
  return [result, success, twist, action, burnable, luckable];
}

export function rollProgressDice(
  userId: string,
  progress: number,
  local: Local,
  ch?: number[]
) {
  const challenge = ch || d(10, 2);

  const challengeStr = challenge.map((n) => (progress > n ? `__${n}__` : n));

  let result = `**${progress}**`;
  result += ` vs. **${challengeStr[0]}** & **${challengeStr[1]}**`;

  let success = 0;
  for (let i = 0; i < challenge.length; i++) {
    if (progress > challenge[i]) {
      success++;
    }
  }

  const successStr = local.dice.actionResults[success];
  result += `\n<@${userId}> ${successStr}`;

  if (challenge[0] == challenge[1]) result += local.dice.twist;

  return [result, success];
}

export function d100(local: Local) {
  const oracleDices = d(10, 2).map((od) => od - 1);
  const sum = oracleDices[0] * 10 + oracleDices[1];

  let result = `**${sum === 0 ? `100 ${local.dice.or} 0` : sum}** (${
    oracleDices[0] * 10
  } + ${oracleDices[1]})`;

  if (oracleDices[0] == oracleDices[1]) result += local.dice.twist;

  return result;
}

export function sum(arr: number[]) {
  return arr.reduce((m, s) => {
    return m + (s ? s : 0);
  }, 0);
}
