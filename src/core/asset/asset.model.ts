import { Tracker } from "../tracker/tracker.model";

export enum AssetEnum {
  Path,
  Ritual,
  BattleSkill,
  Ally,
  Other,
}

export class Asset {
  constructor(
    public type: AssetEnum,
    public name: string,
    public abilities: Ability[],
    public description?: string,
    public tracker?: Tracker,
    public customFieldName?: string,
    public customField?: string,
    public img?: string
  ) {}
}

export class Ability {
  description: string;
  mods?: any[];
  isChecked: boolean;

  constructor(description: string, isChecked = false) {
    this.isChecked = description.startsWith("!") ? true : isChecked;
    this.description = description.startsWith("!")
      ? description.substr(1)
      : description;
  }
}
