import { ICommand } from "../..";

export const delveCommands: {
  [id: string]: ICommand;
} = {
  site: {
    title: "Discover a site",
    description: ".site <rank> <domain> <theme>",
    helpText: `Example: \`.site 2 corrupted ruin \`. Template: \`.site <rank> <team> <ownership>\``,
    aliases: ["site"],
  },
  rollDenizens: {
    title: "Chose denizen",
    description: ".denizen",
    helpText: "Example: `.denizen`",
    aliases: ["denizen"],
  },
  rollInRollChannel: {
    title: "Roll in roll channel",
    description: ".roll",
    helpText: "Example: `.roll`",
    aliases: ["roll"],
    params: {
      aliasesExp: ["up", ">", "asc", "ascent"],
      aliasesLog: ["down", "desc", "<", "descent"],
    },
  },
  clearDenizens: {
    title: "Clear roll channel",
    description: "",
    helpText: "Example `.clear`",
    aliases: ["clear"],
  },
  createRollChat: {
    title: "Create roll channel",
    description: "",
    helpText: "Example `.rollcnl enemy tactic`",
    aliases: ["rollchannel", "rollcnl"],
  },
  rollSiteFeature: {
    title: "Site feature",
    description: "",
    helpText: "Example `.environment`",
    aliases: ["environment", "env"],
  },
  deepInDelve: {
    title: "DELVE THE DEPTHS",
    description: "",
    helpText: "Example `.delve edge` or `.delve shadow` or `.delve wits`",
    aliases: ["delve"],
    params: {
      edge: ["edge"],
      shadow: ["shadow"],
      wits: ["wits"],
    },
  },
  findOportunity: {
    title: "Find an opportunity",
    description: "",
    helpText: "Example `.opportunity`",
    aliases: ["opportunity"],
  },
  revealDanger: {
    title: "Reveal a danger",
    description: "",
    helpText: "Example `.danger`",
    aliases: ["danger"],
  },
  intoOtherDomain: {
    title: "Move to domain",
    description: "",
    helpText: "Example `.to-domain fortress`",
    aliases: ["to-domain"],
  },
  intoOtherTheme: {
    title: "Move to theme",
    description: "",
    helpText: "Example `.to-theme cursed`",
    aliases: ["to-theme"],
  },
};

export const delve = {
  domainList: "Domain List",
  themeList: "Theme List",
  wrongDomain: "Name of Domain entered incorrectly",
  wrongTheme: "Incorrectly entered Theme name",
  sceneRules: `When you move to another room inside the site, imagine your surroundings (ask the oracles if unsure, or send \`.environment\`). Then consider your approach. If you navigate this area ...
• With haste: send \`.delve edge \` (affects the chance to pass the site faster, but more dangerous)
• With cunning or quietly: send \`.delve shadow\` (affects the chance to pass the site slower, but safer)
• Carefully or intuitively: send \`.delve wits\`(affects the chance to notice more details in the site)`,
  delveProgress: "Delve progress",
  denizenCnlInstructions:
    "Send to this channel - the denizens of the site, first often met then rarely met. Use spoiler brackets (Example `|| troll ||`) to keep the intrigue of the denizen. Send `.denizen` to select one of the denizens. Denizens from the beginning of the list will drop out more often than from the end.",
  denizenCnlPref: "denizens",
  rollCnlPref: "roll-channel",
  nonDenizenCnlErr:
    "This command only works in the Denizens channel and Roll channel.",
  edge: "edge",
  shadow: "shadow",
  wits: "wits",
  revealDangerOptions: `Danger!`,
  deepInDelveOptions: `Progress noted. You go deeper and discover an opportunity. Describe it (or send \`.opportunity\`) and choose one:
• Understand or Prepare: Take +1 momentum (send \`.momentum+\`).
• Take action now. You and any allies can make a move (not a progress move) that directly uses this opportunity. When you do, add +1 and gain +1 momentum (send \`.momentum+\`) on success.`,
  oportunityOptions: `
Choose one:
• Understand or Prepare: Take +1 momentum (send \`.momentum+\`).
• Take action now. You and any allies can make a move (not a progress move) that directly uses this opportunity. When you do, add +1 and gain +1 momentum (send \`.momentum+\`) on success.`,
  toThemeAndDomain: (theme: string, domain: string) => `${theme} ${domain}`,
  fromThemeAndDomain: (themeAndDomain: string) =>
    themeAndDomain.split(" ").map((x) => x.trim()),
};
