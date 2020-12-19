import { Tracker } from "./tracker.model";

export function add(tracker: Tracker, value: number = 1) {
  tracker.current += value;
  if (tracker.current > tracker.max) {
    tracker.current = tracker.max;
  }

  if (tracker.current < tracker.min) {
    tracker.current = tracker.min;
    return -1; // TODO outer context should recognize this trigger for "Face a setback"
  }

  return 0;
}

export function sub(tracker: Tracker, value: number = 1) {
  tracker.current -= value;

  if (tracker.current > tracker.max) {
    tracker.current = tracker.max;
  }

  if (tracker.current < tracker.min) {
    tracker.current = tracker.min;
    return -1; // TODO outer context should recognize this trigger for "Face a setback"
  }

  return 0;
}

export function reset(tracker: Tracker, value?: number) {
  tracker.current = value ?? tracker.initial;
}
