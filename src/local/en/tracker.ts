import {
  ProgTrackerRank,
  ProgTrackerType,
} from "../../core/tracker/tracker.model";
import { ICommand } from "..";

const ranks = {
  [ProgTrackerRank.TROUBLESOME]: "Troublesome",
  [ProgTrackerRank.DANGEROUS]: "Dangerous",
  [ProgTrackerRank.FORMIDIBLE]: "Formidible",
  [ProgTrackerRank.EXTREME]: "Extreme",
  [ProgTrackerRank.EPIC]: "Epic",
};

const suffix = {
  [ProgTrackerType.CUSTOM]: "",
  [ProgTrackerType.VOW]: "Vow",
  [ProgTrackerType.WORDS]: "Words",
  [ProgTrackerType.BATTLE]: "Enemy",
  [ProgTrackerType.DELVE]: "Site",
  [ProgTrackerType.TRAVEL]: "Travel",
  [ProgTrackerType.DOOM]: "Doom",
};

const rankParse: { [id: string]: ProgTrackerRank } = {
  ["Troublesome"]: ProgTrackerRank.TROUBLESOME,
  ["Dangerous"]: ProgTrackerRank.DANGEROUS,
  ["Formidible"]: ProgTrackerRank.FORMIDIBLE,
  ["Extreme"]: ProgTrackerRank.EXTREME,
  ["Epic"]: ProgTrackerRank.EPIC,
};

export const progTrackerCommands: {
  [id: string]: ICommand;
} = {
  addProgTracker: {
    title: "Add tracker",
    description:
      "Options: level (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic), description.",
    helpText: "Example: `.tracker 2 Evil swarm`",
    aliases: ["tracker"],
  },
  addVow: {
    title: "Add vow",
    description:
      "Parameters: level (1 - Hard, 2 - Dangerous, 3 - Terrible, 4 - Fatal, 5 - Epic), description. \nExample: `.vow 4 To save the princess`",
    helpText: "",
    aliases: ["vow"],
  },
  addWordTracker: {
    title: "Add words to learn them",
    description:
      "Parameters: level (1 - Hard, 2 - Dangerous, 3 - Terrible, 4 - Fatal, 5 - Epic), description. \nExample: `.words 2 disobey crawl strike rift`",
    helpText: "",
    aliases: ["words", "word"],
  },
  addJourneyTracker: {
    title: "Add journey tracker",
    description:
      "Parameters: level (1 - Hard, 2 - Dangerous, 3 - Terrible, 4 - Fatal, 5 - Epic), description. \nExample: `.journey 2 reach the raven cliff`",
    helpText: "",
    aliases: ["journey"],
  },
};

export const progTracker = {
  tracker: "Tracker",
  progress: "Progress",
  abandonMsg:
    "You renounced your vow. Get stress. If the vow has been made to a person or community with whom you have a bond, Test your bond the next time you meet.",
  doneMsg: "complete the vow",
  suffix,
  rankParse,
  ranks,
};
