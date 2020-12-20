import {
  CharacterWizardStep,
  Character,
} from "../../core/character/character.model";
import { MessageEmbed } from "discord.js";
import { getActiveDebilities } from "../../core/character/character.manager";
import { ICommand } from "..";

const debCommands: {
  [id: string]: ICommand;
} = {
  wounded: {
    title: "Ранен",
    description: "состояние",
    helpText: "Пример `.ранен`",
    aliases: ["ранен", "рнн", "wounded"],
  },
  shaken: {
    title: "Потрясен",
    description: "состояние",
    helpText: "Пример `.потрясен`",
    aliases: ["потрясен", "потрясён", "птр", "shaken"],
  },
  unprepared: {
    title: "Не подготовлен",
    description: "состояние",
    helpText: "Пример `.нпг`",
    aliases: ["неподготовлен", "нпг", "unprepared"],
  },
  encumbered: {
    title: "Перегружен",
    description: "состояние",
    helpText: "Пример `.перегружен`",
    aliases: ["перегружен", "пгр", "encumbered"],
  },
  maimed: {
    title: "Искалечен",
    description: "изъян",
    helpText: "Пример `.искалечен`",
    aliases: ["искалечен", "икч", "maimed"],
  },
  corrupted: {
    title: "Осквернен",
    description: "изъян",
    helpText: "Пример `.оск`",
    aliases: ["осквернен", "оск", "corrupted"],
  },
  cursed: {
    title: "Проклят",
    description: "окова",
    helpText: "Пример `.проклят`",
    aliases: ["проклят", "пкл", "cursed"],
  },
  tormented: {
    title: "Одержим",
    description: "окова",
    helpText: "Пример `.одержим`",
    aliases: ["одержим", "одж", "tormented"],
  },
};

export const characterCommands: {
  [id: string]: ICommand;
} = {
  start: {
    title: "Создать персонажа",
    description:
      "Создает личный канал игрока и запускает диалог создания персонажа",
    helpText: "Пример `.старт`",
    aliases: ["старт", "го", "go", "start"],
  },
  remove: {
    title: "Удалить персонажа",
    description: "",
    helpText: "Пример `.удалитьперсонаж Ульф`",
    aliases: ["удалитьперсонаж"],
  },
  char: {
    title: "Показать лист пероснажа",
    description: "",
    helpText: "Пример `.лист`",
    aliases: ["лист", "чар", "чарник", "char", "pc"],
  },
  addBond: {
    title: "Добавить связь",
    description: "",
    helpText: "Пример `.связь`",
    aliases: ["связь", "связь+", "дс", "с+", "ab", "bond"],
  },
  subBond: {
    title: "Убрать связь",
    description: "",
    helpText: "Пример `.ус`",
    aliases: ["связь-", "ус", "с-", "bond-", "sb"],
  },
  edge: {
    title: "Бросок действия + **холод** персонажа",
    description: "Можно добавить еще модификатор через пробел",
    helpText: "Пример `.х 1`",
    aliases: ["холод", "х", "edge", "e"],
  },
  heart: {
    title: "Бросок действия + **нрав** персонажа",
    description: "Можно добавить еще модификатор через пробел",
    helpText: "Пример `.нрав`",
    aliases: ["нрав", "н", "heart", "h"],
  },
  iron: {
    title: "Бросок действия + **сталь** персонажа",
    description: "Можно добавить еще модификатор через пробел",
    helpText: "Пример `.сталь`",
    aliases: ["сталь", "с", "iron", "i"],
  },
  shadow: {
    title: "Бросок действия + **тень** персонажа",
    description: "Можно добавить еще модификатор через пробел",
    helpText: "Пример `.т 2`",
    aliases: ["тень", "т", "shadow", "s"],
  },
  wits: {
    title: "Бросок действия + **ум** персонажа",
    description: "Можно добавить еще модификатор через пробел",
    helpText: "Пример `.ум 1`",
    aliases: ["ум", "у", "wits", "w"],
  },
  health: {
    title: "Бросок действия + **здоровье** персонажа",
    description: "",
    helpText: "Пример `.з`",
    aliases: ["здоровье", "з", "health", "hp"],
  },
  spirit: {
    title: "Бросок действия + **дух** персонажа",
    description: "",
    helpText: "Пример `.дух`",
    aliases: ["дух", "д", "spirit", "spt"],
  },
  supply: {
    title: "Бросок действия + **припасы** персонажа",
    description: "",
    helpText: "Пример `.припасы`",
    aliases: [
      "припасы",
      "припас",
      "рессурсы",
      "рессурс",
      "ресурс",
      "п",
      "р",
      "supply",
      "spl",
    ],
  },
  editName: {
    title: "Изменить имя персонажа",
    description: "",
    helpText: "Пример `.имя Ульф`",
    aliases: ["имя", "name"],
  },
  editDesc: {
    title: "Изменить описание персонажа",
    description: "",
    helpText: "Пример `.описание Большой и сильный`",
    aliases: ["описание", "оп", "desc"],
  },
  editAttributes: {
    title: "Изменить характеристики персонажа",
    description: "холод нрав железо тень ум",
    helpText: "Пример `.характеристики 1 2 3 2 1`",
    aliases: ["характеристики", "харки"],
  },
  addAvatar: {
    title: "Добавить изображение персонажа",
    description: "К сообщению нужно сразу приложить изображение",
    helpText: "Пример `.ава`",
    aliases: ["портрет", "изображение", "ава", "img"],
  },
  ...debCommands,
};

const attributes = {
  edge: characterCommands.edge,
  heart: characterCommands.heart,
  iron: characterCommands.iron,
  shadow: characterCommands.shadow,
  wits: characterCommands.wits,
};

export const cheatCommands: {
  [id: string]: ICommand;
} = {
  addXp: {
    title: "",
    description: "",
    helpText: "",
    aliases: ["доо"],
    isHidden: true,
  },
  cheats: {
    title: "",
    description: "",
    helpText: "",
    aliases: ["читы"],
    isHidden: true,
  },
};

export const character = {
  attributes,
  wizard: [
    {
      step: CharacterWizardStep.Name,
      message: `добро пожаловать на сервер "Железные острова". Здесь мы играем в IronSworn. Кооперативную НРИ, где каждый игрок время от времени принимает на себя роль мастера.
Мир Железных островов - суровое нордическое место. Людей здесь мало, монеты не входу, вместо этого бартер. На железных островах есть традиция: если ты хочешь сильно чего-то добиться, ты должен поклясться на железе что добьешься этого, тогда боги улыбнуться тебе.
Другие подробоности о мире читай в разделе "МИР".

Давай создадим тебе персонажа.

Как зовут твоего персонажа?  
    `,
    },
    {
      step: CharacterWizardStep.Description,
      message: "Опиши персонажа несколькими предложениями",
    },
    {
      step: CharacterWizardStep.Avatar,
      message:
        "Отправь портрет (изображение) персонажа. Если не хочешь добавлять портрет, то отправь любое сообщение (например: нет).",
    },
    {
      step: CharacterWizardStep.Attr,
      message: `В игре присутствуют характеристики:
**Холод**: быстрота, ловкость, мастерство в обращении с дальнобойным оружием.
**Нрав**: смелость, сила воли, эмпатия, верность, способность к общению.
**Сталь**: физическая сила и выносливость, агрессивность, мастерство в ближнем бою.
**Тень**: скрытность, хитрость, обман.
**Ум**: опыт, знания, экспертность, наблюдательность.

Распредели между характеристиками (холод, нрав, сталь, тень, ум) значения 3 2 2 1 1 через пробел.

Например: 
\`\`\`1 3 2 1 2\`\`\`
        `,
    },
    {
      step: CharacterWizardStep.LongVow,
      message: `Опиши глобальную клятву, движущую персонажем через опасности. 
      
Эта клятва - часть предыстории вашего персонажа. Это может быть клятва, принесенная много лет назад, или реакция на какое-то недавнее крупное событие. Выполнить этот обет будет нелегко. Могут потребоваться месяцы, годы или даже десятилетия, чтобы увидеть, как эта клятва будет исполнена или оставлена. 
Это клятва нужна не столько для ее завершения сколько для описания характера и бэкграунда вашего персонажа.
  
Пример. Вас преследует ваше прошлое, вы поклялись увидеть побежденный клан рейдеров. Однако есть сложности. Клан могущественен, и вы не могли бы надеяться победить его без армии за вашей спиной. Также клан возглавляет ваша мать. Потребуется особое мужество, чтобы снова встретиться с ней лицом к лицу.
Вы представляете себе название клана: «Красная луна». Их щиты украшены кроваво-красным кругом.
Пока что эта клятва - тлеющий тлеющий тлеющий тлеющий тлеющий обет, обещание, которое еще не разгорелост.`,
    },
    {
      step: CharacterWizardStep.ShortVow,
      message: `Опиши "Вовлекающую ситуацию" - сиюминутную клятву, дающую толчок в настоящий момент. 
Вовлекающая ситуация - это проблема, которая возникает в начале истории, побуждая главного героя к действию. Все до этого момента - предыстория. Вовлекающая ситуация это клятва которая показывает нам чем непосредственно занят персонаж в момент начала игры.

Пример. Таинственная болезнь поразила вождя Синдердома. Деревенский лекарь варил зелья, но они не помогали. Священник молился, но боги не слушали. Мистик совершал гадания, но тени не разглашали своих секретов.
Вождь, ваш друг, исчезает. Без помощи он/она обязательно умрет. Что бы ему помочь вы отправились за мицическим драконим корнем, по слухам он растет в пещере за перевалом. В ту пещеру никто не ходит из-за ее обитателей.`,
    },
    {
      step: CharacterWizardStep.Assets,
      message: `Клятвы делятся на типы (1 - Трудная, 2 - Опасная, 3 - Грозная, 4 - Смертельная, 5 - Эпичная) в зависимости насколько быстро можно их исполнить и сколько опыта получит персонаж за исполнение клятвы. 
Ты можешь добавить новую клютву в любой момент с помощью команд бота. 
Примеры:\`\`\`.клятва 4 Спасти принцессу\`\`\` \`\`\`.смертельная Спасти принцессу \`\`\`
      
Продолжим создание персонажа...      

Выбери 3 буклета в канале "БУКЛЕТЫ". Чтобы выбрать буклет нажми на ~hit~ или на номер способности под буклетом. Выбери по одной способности в каждом буклете если еще не выбрано. Как только выберишь все три буклета и навыки, в этом канале появится последняя инструкция с описанием - как играть`,
    },
    {
      step: CharacterWizardStep.Done,
      message: `**Все готово! Можно играть** :)`,
    },
  ],
  listEmbed: (char: Character) => {
    const moment = "~moment~";
    const health = "~health~";
    const spirit = "~spirit~";
    const supply = "~supply~";
    const bond = "~bond~";
    const xp = "~islogo~";
    const st = "~stub~";

    let xpMsg = char.xp ? "Опыт:" : "";
    for (let index = 0; index < char.xp; index++) {
      xpMsg += ` ${xp}`;
    }

    let debilities = getActiveDebilities(char.debilities).map((d) => debRu[d]);
    let debMsg = debilities.length
      ? "```diff\nСлабости:\n- " + debilities.join("\n- ") + "```"
      : "";

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(char.name)
      .setDescription(
        `${st}\n ХОЛОД       ${char.attributes.edge}                     ${moment}  Потенциал    ${char.momentum.current}
  НРАВ            ${char.attributes.heart}                     ${health}  Здоровье       ${char.status.health.current}
  СТАЛЬ         ${char.attributes.iron}                     ${spirit}  Дух                   ${char.status.spirit.current}
  ТЕНЬ             ${char.attributes.shadow}                     ${supply}  Припасы        ${char.status.supply.current}
  УМ                 ${char.attributes.wits}                     ${bond}  Связи              ${char.bonds.current}
  
  ${debMsg}
  ${xpMsg} 
  
        `
      )
      .setFooter(char.description);

    if (char.img) {
      embed.setThumbnail(decodeURIComponent(char.img));
    }

    return embed;
  },
  userAlreadyExistMsg: (char: Character) =>
    `Удали текущего персонажа перед тем как создать нового персонажа. Отправь .удалитьперсонаж ${char.name}`,
  userDeleteError: "имя не верно введено",
  firstSteps: (
    playerCnl: string,
    infoCnl: string
  ) => `Присоединяйся к одной из текущих сцен или создай свою (введи \` .сцена \`). Инструкции к сцене находятся в закрепленном сообщении сцены.

Твой персонаж создан в канале ${playerCnl}. Используй этот канал для личных заметок персонажа. Например ты можешь описать там связи персонажа. На начало игры твой персонаж имеет 3 связи. Это 3 местных НПС которые могут вам помочь.

Подробная информация о правилах здесь: ${infoCnl}`,
};

const debRu: { [id: string]: string } = {
  wounded: "ранен",
  shaken: "потрясен",
  unprepared: "не подготовлен",
  encumbered: "перегружен",
  maimed: "искалечен",
  corrupted: "осквернен",
  cursed: "проклят",
  tormented: "одержим",
};
