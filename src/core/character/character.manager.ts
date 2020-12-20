import { Debilities } from "./character.model";
import { Tracker } from "../tracker/tracker.model";

export function burnMomentum(tracker: Tracker, debilities = 0) {
  tracker.current = Math.max(0, 2 - debilities);
  tracker.max = 10 - debilities;
}

export const count = (debilities: Debilities) =>
  getActiveDebilities(debilities).length;

export function getActiveDebilities(debilities: Debilities): string[] {
  const arr: string[] = [];
  for (const key in debilities) {
    //@ts-ignore
    if (debilities[key]) {
      arr.push(key);
    }
  }
  return arr;
}
