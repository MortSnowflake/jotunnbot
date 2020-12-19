import { Tracker } from "../tracker/tracker.model";
import { Asset } from "../asset/asset.model";
import { ProgTracker } from "../tracker/tracker.model";

export class Character {
  name: string = "";
  description: string = "";
  xp: number = 0;
  img?: string;
  startAssetCount = 3;

  attributes = new Attributes();
  momentum = new Tracker(-6, 10, 2);
  status = new StatusTrackers();
  debilities = new Debilities();

  currentAsset?: Asset;
  bonds = new Tracker(0, 10, 3);
  bondsDescription: string = "";
  vows: ProgTracker[] = [];
}

class StatusTrackers {
  health = new Tracker(0, 5, 5);
  spirit = new Tracker(0, 5, 5);
  supply = new Tracker(0, 5, 5);
}

export class Attributes {
  edge: number = 0;
  heart: number = 0;
  iron: number = 0;
  shadow: number = 0;
  wits: number = 0;

  constructor(attr?: string) {
    if (attr) {
      const [edge, heart, iron, shadow, wits] = attr.split(" ");
      this.edge = parseInt(edge);
      this.heart = parseInt(heart);
      this.iron = parseInt(iron);
      this.shadow = parseInt(shadow);
      this.wits = parseInt(wits);
    }
  }
}

export class Debilities {
  //conditions
  wounded: boolean = false;
  shaken: boolean = false;
  unprepared: boolean = false;
  encumbered: boolean = false;

  //banes
  maimed: boolean = false;
  corrupted: boolean = false;

  //burdens
  cursed: boolean = false;
  tormented: boolean = false;
}

export enum CharacterWizardStep {
  Name,
  Description,
  Avatar,
  Attr,
  LongVow,
  ShortVow,
  Assets,
  TrainingOption,
  TrainingIntro,
  Investigate,
  FaceDanger,
  Frei,
  Clash,
  Strike,
  FinishBattle,
  Done,
}
