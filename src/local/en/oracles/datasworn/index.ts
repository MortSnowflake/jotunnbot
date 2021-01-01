import domains from "./ironsworn_delve_domains.json";
import themes from "./ironsworn_delve_themes.json";
import foes from "./ironsworn_foes.json";
import moves from "./ironsworn_move_oracles.json";
import character from "./ironsworn_oracles_character.json";
import sites from "./ironsworn_oracles_delve_sites.json";
import pairs from "./ironsworn_oracles_interpretive_pairs.json";
import monstrosity from "./ironsworn_oracles_monstrosity.json";
import names from "./ironsworn_oracles_names.json";
import place from "./ironsworn_oracles_place.json";
import settlement from "./ironsworn_oracles_settlement.json";
import threat from "./ironsworn_oracles_threat.json";
import turningPoint from "./ironsworn_oracles_turning_point.json";

export const allOracleTypes = {
  domains,
  themes,
  foes,
  moves,
  character,
  sites,
  pairs,
  monstrosity,
  names,
  place,
  settlement,
  threat,
  turningPoint,
};

export const oracleTypes = {
  ["Character"]: { ...character, ...names },
  ["Monstrocity"]: monstrosity,
  ["Plot"]: { ...turningPoint, ...pairs },
  ["Location"]: { ...place, ...settlement },
};

export const allOracleTables = {
  ...moves,
  ...character,
  ...sites,
  ...pairs,
  ...monstrosity,
  ...names,
  ...place,
  ...settlement,
  ...threat,
  ...turningPoint,
};

export const oracleTables = {
  ...moves,
  ...character,
  ...sites,
  ...pairs,
  ...monstrosity,
  ...names,
  ...place,
  ...settlement,
  ...threat,
  ...turningPoint,
};

export interface IResult {
  Chance: number;
  Description: string;
}
