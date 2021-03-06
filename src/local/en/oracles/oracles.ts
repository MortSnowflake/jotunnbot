import { ICommand } from "../..";
import { oracleTables, oracleTypes } from "./datasworn";
import { languageRules, languageWords } from "./language-tables";

export const oraclesCommands: {
  [id: string]: ICommand;
} = {
  oracleLookupTable: {
    title: "Oracles",
    description:
      "The <table name> parameter. If you send without a parameter, it will display a list of all tables.",
    helpText: "Example `.о location`",
    aliases: ["o", "oracle"],
  },
  userTable: {
    title: "Throw from parameter list",
    description:
      'Helps to select a random item from the table without adding a new parameter. Items are separated by spaces or ";"',
    helpText: "Example `.table fighter cleric mage thief`",
    aliases: ["t", "table", "tab", "tbl"],
  },
  logUserTable: {
    title: "Roll from the list in descending order of probability",
    description:
      'The first element of the table will be dropped rather than the last. Items are separated by spaces or ";"',
    helpText: "Example `.tlog fighter cleric mage thief`",
    aliases: ["tlog", "tdesc"],
  },
  addOracle: {
    title: "Add custom oracle",
    description:
      'The first parameter is <oracle channel>. Other parameters: oracle items. Items are separated by spaces or ";"',
    helpText: "Example `.newo characters classes fighter cleric mage thief`",
    aliases: ["newo", "neworacle", "new-o", "new-oracle"],
  },
  damage: {
    title: "Endure Harm",
    description: "",
    helpText: "Example `.harm`",
    aliases: ["harm", "damage"],
  },
  stress: {
    title: "Endure Stress",
    description: "",
    helpText: "Example `.stress`",
    aliases: ["stress"],
  },
  price: {
    title: "Pay the price",
    description: "",
    helpText: "Example `.price`",
    aliases: ["price"],
  },
};

export const oracles = {
  oracle: "ORACLE",
  oraclelow: "Oracle",
  oracles: "Oracles",
  notFound: "not found",
  specify: "Please specify an Oracle from the list",
  ask: "Ask oracle",
  roll: "roll",
  vs: "vs.",
  unsupported: "has unsupported type",
  send: "Send",
  forHelp: "for help",
  plotName: "plot",
  advanceThreat: "Advance a Threat Prog",
  plotTypes: ["Difficulty", "Battle", "actions", "Goal", "Themes", "Action"],
  locationName: "location",
  locationTypes: [
    "Settlement problem",
    "Quick Settlement Names",
    "Settlement Names",
    "Location description",
    "Coast view",
    "Locaton",
    "Region",
  ],
  charName: "characters",
  charTypes: [
    "Other Names",
    "Elf Names",
    "Ironlander Names",
    "NPC feature",
    "NPC role",
  ],
  oracleTables: oracleTables,
  languageRules,
  languageWords,
  oracleTypes: oracleTypes,
};

export const oraclesChanelName = [
  "other",
  "location",
  "characters",
  "plot",
  "creatures",
  "themes",
  "domain",
];
