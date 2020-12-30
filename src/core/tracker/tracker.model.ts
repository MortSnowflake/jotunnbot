import { COLORS } from "../discord/discord-colors";

export enum ProgTrackerRank {
  TROUBLESOME = 3,
  DANGEROUS = 2,
  FORMIDIBLE = 1,
  EXTREME = 0.5,
  EPIC = 0.25,
}

export enum ProgTrackerType {
  VOW = COLORS.DARK_ORANGE,
  WORDS = COLORS.LIGHT_GREY,
  DELVE = COLORS.GREEN,
  TRAVEL = COLORS.AQUA,
  BATTLE = COLORS.RED,
  DOOM = COLORS.DARK_RED,
  RULE = COLORS.DARK_BLUE,
  CUSTOM = COLORS.DARK_GREY,
}

export const vowXp = {
  [ProgTrackerRank.TROUBLESOME]: 1,
  [ProgTrackerRank.DANGEROUS]: 2,
  [ProgTrackerRank.FORMIDIBLE]: 3,
  [ProgTrackerRank.EXTREME]: 4,
  [ProgTrackerRank.EPIC]: 5,
};

export class ProgTracker {
  track = new Tracker(0, 10);

  constructor(
    public text: string,
    public rank = ProgTrackerRank.TROUBLESOME,
    public type = ProgTrackerType.CUSTOM,
    current?: number,
    max?: number
  ) {
    if (current) {
      this.track.current = current;
    }

    if (max) {
      this.track.max = max;
    }
  }
}

export const progTrackers = [
  ProgTrackerRank.TROUBLESOME,
  ProgTrackerRank.DANGEROUS,
  ProgTrackerRank.FORMIDIBLE,
  ProgTrackerRank.EXTREME,
  ProgTrackerRank.EPIC,
];

export class Tracker {
  current: number;
  max: number;
  min: number;
  initial: number;

  constructor(min: number, max: number, initial?: number, current?: number) {
    this.min = min;
    this.max = max;
    this.initial = initial ?? min;
    this.current = current ?? this.initial;
  }
}
