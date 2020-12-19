import { ICommand } from "../..";

export const diceCommands: {
  [id: string]: ICommand;
} = {
  d100: {
    title: "Oracle Roll",
    description: "",
    helpText: "",
    aliases: ["d100"],
  },
  actionRoll: {
    title: "Action Roll",
    description: "",
    helpText:
      "**__Ironsworn Action Roll__** n Produces an Action Roll from the _Ironsworn_ engine. \n \nTo execute the Action Roll, simply use the command `ironsworn-action` or one of its aliases. You can include any number of integers that will be considered modifiers. The text is ignored, allowing you to add a description to your lists: n ,, n.ironsworn-action Rolling to Comverse to make me skip by telling him I’m dealing with a prince. +2 Shadow and +1 for my Secure Advantage. '' The command has multiple aliases (`is`,`act` and `a`). All you need are numeric modifiers; the text is purely for flavor. All aliases work the same: \n``` \n.is Coercing a guard with a lie: +2 Shadow, +1 Protected Advantage ,, \n```, \n.act Compel +2 s +1 SA ``` \n `+` 'can be omitted, just like any text: n```na 2 1``` \nYou can put as much text and as many modifiers on the roll as 2000 Discord Symbol limit will allow.",
    aliases: ["action", "a"],
  },
  dAny: {
    title: "Dice roll",
    description: "",
    helpText: "Example .d 20",
    aliases: ["d"],
  },
  d6: {
    title: "d6 roll",
    description: "",
    helpText: "",
    aliases: ["d6"],
  },
  d10: {
    title: "d10 roll",
    description: "",
    helpText: "",
    aliases: ["d10"],
  },
  rollProgressDice: {
    title: "Progress roll",
    description: "Param: from 1 to 10",
    helpText: "Example `.progress 4`",
    aliases: ["progress", "fate"],
  },
  allMoves: {
    title: "All moves",
    description: "",
    helpText: "",
    aliases: ["moves", "move"],
  },
  sendMoveDescriptions: {
    title: "Send Move Descriptions",
    description: "",
    helpText: "",
    aliases: ["sendmoves", "sendmove"],
    isHidden: true,
  },
  createRules: {
    title: "Create Rules Cathegory",
    description: "",
    helpText: "",
    aliases: ["createrules"],
    isHidden: true,
  },
};

export const dice = {
  actionResults: [
    `~miss~~miss~ Miss...`,
    `~hit~~miss~ Weak hit!`,
    `~hit~~hit~ Strong hit!`,
  ],
  twist:
    "**_TWIST!!!_** An unexpected turn in history, something interesting, a new opportunity or danger.",
  critOne:
    "\n **1** on the action die. If you used a companion's ability, any negative consequences of the move apply to that one. Additional asset complications trigger if available.",
  critSix:
    "\n **6** on the action die. Additional benefits of assets are triggered when available.",
  or: "or",
  luckDesc:
    "~luck~ - means that you can spend a luck point to improve your move result",
  momentDesc:
    "~moment~ - means that you can burn momentum to improve your move result",
  spendLuck: "You spend luck point.",
  spendMomentum: "You burn momentum.",
  missToWeak: "Miss become Weak hit ~hit~~miss~.",
  weakToStrong: "Weak hit become Strong hit ~hit~~hit~.",
  payThePrice: "Pay the Price",
};
