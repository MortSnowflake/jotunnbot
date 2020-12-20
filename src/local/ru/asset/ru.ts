import { AssetEnum } from "../../../core/asset/asset.model";
import { ICommand } from "../..";

export const assetCommands: {
  [id: string]: ICommand;
} = {
  addAsset: {
    title: "Добавить новый буклет",
    description: "",
    helpText: `
    .буклет <путь> | <название> | <умение 1> | <умение 2> | <умение 3> | [описание] | [макс. здоровье] | [название поля ввода]

    ,где <...> это обязательное поле, а [...] необязательное поле. Необязательные поля можно не указывать, но если например нужно указать название поля ввода но не нужно здоровье и описание то параметры надо оставить пустыми
    вот так .буклет <путь>; <название>; <умение 1>; <умение 2>; <умение 3>;;; [название поля ввода]

    Можно использовать символ ; вместо |, но в описаниях буклетов иногда попадается символ ; его следует заменить на . или , в описании что бы бот вас верно понял.
    
    Пример:
    .бук СПУТНИК| ЯСТРЕБ| Зоркий: когда Путешествуешь добавь +1.| Ярый: +1 потенциал.| Бдительный: добавь +2.| Твой ястреб может помочь.| 3| Имя|
    `,
    aliases: ["буклет", "ассет", "бук", "ас", "asset", "as"],
  },
};

export const asset = {
  health: "Здоровье",
  xpNotEnough: "**Не хватает опыта**",
  hpNotEnough: "Не получается развить",
  enter: "введи",
  forAsset: "для буклета",
  withoutAnswer: "Я не дождался ответа... бип бип...",
  declineAsset: "вы действительно хотите отринуть буклет?",
  assetCancelationInformation:
    "За буклет вернется только одно очко опыта. Что бы отринуть буклет отправьте: да. Иначе любое другое сообщение.",
  assetCancelation:
    "отрек навыки буклета. Получено 1 очко опыта. Придумайте осложнение или конфликт связанный с отринутым буклетом.",
};

export const assetType = {
  [AssetEnum.Ally]: "СПУТНИК",
  [AssetEnum.BattleSkill]: "БОЕВОЙ ТАЛАНТ",
  [AssetEnum.Path]: "ПУТЬ",
  [AssetEnum.Ritual]: "РИТУАЛ",
  [AssetEnum.Other]: "ДРУГОЕ",
};

export const assetParse: { [id: string]: AssetEnum } = {
  ["СПУТНИК"]: AssetEnum.Ally,
  ["БОЕВОЙ ТАЛАНТ"]: AssetEnum.BattleSkill,
  ["ПУТЬ"]: AssetEnum.Path,
  ["РИТУАЛ"]: AssetEnum.Ritual,
  ["ДРУГОЕ"]: AssetEnum.Other,
};

export const assetChanelName = {
  [AssetEnum.Ally]: "спутник",
  [AssetEnum.BattleSkill]: "боевой-талант",
  [AssetEnum.Path]: "путь",
  [AssetEnum.Ritual]: "ритуал",
  [AssetEnum.Other]: "другое",
};
