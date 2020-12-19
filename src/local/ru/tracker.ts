import {
  ProgTrackerRank,
  ProgTrackerType,
} from "../../discord/tracker/tracker.model";
import { ICommand } from "..";

const progTrackerTypes = {
  [ProgTrackerRank.TROUBLESOME]: "Трудный",
  [ProgTrackerRank.DANGEROUS]: "Опасный",
  [ProgTrackerRank.FORMIDIBLE]: "Грозный",
  [ProgTrackerRank.EXTREME]: "Смертельный",
  [ProgTrackerRank.EPIC]: "Эпичный",
};

const progTrackerParse: { [id: string]: ProgTrackerRank } = {
  ["Трудный"]: ProgTrackerRank.TROUBLESOME,
  ["Опасный"]: ProgTrackerRank.DANGEROUS,
  ["Грозный"]: ProgTrackerRank.FORMIDIBLE,
  ["Смертельный"]: ProgTrackerRank.EXTREME,
  ["Эпичный"]: ProgTrackerRank.EPIC,
};

const suffix = {
  [ProgTrackerType.CUSTOM]: "",
  [ProgTrackerType.VOW]: "клятвы",
};

export const progTrackerCommands: {
  [id: string]: ICommand;
} = {
  addProgTracker: {
    title: "Добавить счетчик",
    description:
      "Параметры: уровень (1 - Трудно, 2 - Опасно, 3 - Грозно, 4 - Смертельно, 5 - Эпично), описание.",
    helpText: "Пример: `.счетчик 2 Злая стая волков`",
    aliases: ["счетчик", "сч", "tracker", "трекер"],
  },
  addVow: {
    title: "Добавить клятву",
    description:
      "Параметры: уровень (1 - Трудно, 2 - Опасно, 3 - Грозно, 4 - Смертельно, 5 - Эпично), описание.\nПример: `.клятва 4 Спасти принцессу`",
    helpText: "",
    aliases: ["клятва", "услуга", "кл", "vow"],
  },
};

export const progTracker = {
  vow: "Клятвы",
  tracker: "счетчик",
  Progress: "Прогресс",
  abandonMsg:
    "Ты отрекся от клятвы. Получи стресс. Если клятва была принесена персоне или сообществу, скоторым у тебя связь, Испытай свою связь при следующей встрече.",
  doneMsg: "исполнил клятву",
  progTrackerParse,
  progTrackerTypes,
  suffix,
};
