import { ICommand } from "..";

export const loreCommands: {
  [id: string]: ICommand;
} = {
  scene: {
    title: "New scene",
    description: ".scene <name>",
    helpText: "Example `.scene Raiders attack`",
    aliases: ["scene"],
  },
  doomScene: {
    title: "New scene with Doom Points",
    description: ".doom <name>",
    helpText: "Example `.doom Raiders attack`",
    aliases: ["doom"],
  },
  master: {
    title: "Master chose",
    description:
      "Without parameters, the one who sent the command is selected by the master, the parameter `no` clears the value of the master, if several names are sent in the parameters, an arbitrary one will be selected",
    helpText: "Example `.master` or `.master no` or `.master Mort Still`",
    aliases: ["master", "gm"],
  },
  sceneEnd: {
    title: "End of scene",
    description:
      "Parameter <name>. You can rename the scene at the end if that's better for the chronic",
    helpText: "Example `.end`",
    aliases: ["end", "the-end"],
  },
  rerollWithLP: {
    title: "Roll the die for a luck point",
    description: "Parameter of six or ten sided dice: `.lp <6 or 10>`",
    helpText: "Example: `.lp 6` or `.lp 10`",
    aliases: ["lp", "luck-points", "luckpoints"],
  },
  addLP: {
    title: "",
    description: "",
    helpText: "",
    aliases: ["addlp"],
    isHidden: true,
  },
  bootstrap: {
    title: "Fill server content",
    description: "",
    helpText: "",
    aliases: ["bootstrap"],
    isHidden: true,
    params: {
      all: "all",
      assets: "assets",
      moves: "moves",
      rules: "rules",
      channels: "channels",
    },
  },
};
export const master = {
  masterChnlDescription: `Use this channel to track luck points and store master units. A luck point can be used to reroll any die. To do this, send the command \`.lp 6\` or \`.lp 10\`. Luck points are awarded automatically for the work of the master (creating scenes, oracles, using Doom Points, progress tracker, etc.) and manually by the server admin for helping the channel.`,
  loyaltyPointsGrantErr: "can't find the user",
  loyaltyPointsGrantSucces: "a luck point added",
  loyaltyPointsTitle: "Luck point",
  loyaltyPointsCurrent: "Current",
  loyaltyPointsAll: "All",
  loyaltySpendError: "Not enough luck points",
  loyaltySpendSucces: "A luck point spent. The re-roll result: ",
};

export const scene = {
  coop: "Coop mode",
  gm: "Master",
  me: "me",
  no: "no",
  yes: "yes",
  storyteller: "Storyteller",
  endOfSceneAdvice: (name: string) =>
    `The scene "${name}" has ended. You gain 1 xp. Be sure to mark the progress of the vows involved in this scene.`,
  worldIsChanging: (wordChangeCnl: string) =>
    `Make move *Word is changing*. Details: ${wordChangeCnl}`,
  doomPointsTracker:
    "Spend Doom Points on problems for you or allies. Spending Doom Points increases your Luck Points. By the end of the scene, you need to spend all the Doom Points, otherwise they will work at once at the end of the scene.",
  doomPointsDontForget:
    "Doom Points are not spent (or you forgot to mark it). Spend doom points on problems for allies or the whole party, but not for your character personally. At the end of the scene, the remaining Doom Points will go off all at once, worsening the situation.",
  sceneRules: `These oracles can help to describe the scene intro: \`.o location questions\`, \`.o location descriptors\`, \`.o location\`.

Use the \`*italicized*\` message for comments to other players. Such messages are not chronicled. To describe dialogs, use character name e.g."Torgan:" or "me:" at the beginning of the message (the bot will replace "me:" by your char name in #chronicle ).

Use #phases and \`.moves\` to play. Send \`.end\` to end the scene. Send \`.site\` to *Discover a site*.`,
  languageRule: `At the beginning of a scene, send a link to some English rule and pin it (e.g.: RULE: <somelink>). If you use this rule during the scene, send \`.rule\` it will give you +1 momentum. Feel free to correct player's English. Use \`*italic*\` *for it*. You may chose a rule from rule tracker below, it's ordered by complexity.`,
};
