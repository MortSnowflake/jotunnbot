import { character, cheatCommands } from "./character";
import { helpCommands, help } from "./help";
import { characterCommands } from "./character";
import { loreCommands, scene, master } from "./lore";
import { discord } from "./discord";
import { progTrackerCommands, progTracker } from "./tracker";
import { oraclesCommands, oracles } from "./oracles/oracles";
import { delve, delveCommands } from "./delve/en";
import {
  moves,
  adventureMoves,
  battleMoves,
  relationMoves,
  aftermathMoves,
  fateMoves,
  delveMoves,
} from "./dice/moves-en";
import { dice, diceCommands } from "./dice/dice";
import { assetCommands, asset } from "./asset/en";
import { Commands, Local, SeparatedCommands } from "..";

const commands: Commands = {
  ...helpCommands,
  ...characterCommands,
  ...assetCommands,
  ...loreCommands,
  ...diceCommands,
  ...oraclesCommands,
  ...cheatCommands,
  ...progTrackerCommands,
  ...delveCommands,
};

const separatedCommands: SeparatedCommands = {
  characterCommands,
  loreCommands,
  diceCommands,
  oraclesCommands,
  progTrackerCommands,
  delveCommands,
};

export const localEn: Local = {
  commands,
  separatedCommands,
  character,
  asset,
  scene,
  discord,
  progTracker,
  oracles,
  delve,
  master,
  moves,
  adventureMoves,
  battleMoves,
  relationMoves,
  aftermathMoves,
  fateMoves,
  delveMoves,
  help,
  dice,
};
