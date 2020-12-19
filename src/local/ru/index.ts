import { asset } from "./asset/ru";
import { character, cheatCommands } from "./character";
import { helpCommands, help } from "./help";
import { characterCommands } from "./character";
import { assetCommands } from "./asset/ru";
import { loreCommands, scene, master } from "./lore";
import { diceCommands } from "./dice/dice";
import { discord } from "./discord";
import { progTrackerCommands, progTracker } from "./tracker";
import { oraclesCommands, oracles } from "./oracles/oracles";
import { delve, delveCommands } from "./delve/ru";
import {
  moves,
  adventureMoves,
  battleMoves,
  relationMoves,
  aftermathMoves,
  fateMoves,
  delveMoves,
} from "./dice/moves-ru";
import { ICommand } from "..";
import { dice } from "./dice/dice";

const commands: {
  [id: string]: ICommand;
} = {
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

export const localRu = {
  commands,
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
