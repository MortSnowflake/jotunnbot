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
    title: "Wounded",
    description: "condition",
    helpText: "Example `.wounded`",
    aliases: ["wounded"],
  },
  shaken: {
    title: "Shaken",
    description: "condition",
    helpText: "Example `.shaken`",
    aliases: ["shaken"],
  },
  unprepared: {
    title: "Unprepared",
    description: "condition",
    helpText: "Example `.unprepared`",
    aliases: ["unprepared", "prepared"],
  },
  encumbered: {
    title: "Encumbered",
    description: "condition",
    helpText: "Example `.encumbered`",
    aliases: ["encumbered"],
  },
  maimed: {
    title: "Maimed",
    description: "bane",
    helpText: "Example `.maimed`",
    aliases: ["maimed"],
  },
  corrupted: {
    title: "Corrupted",
    description: "bane",
    helpText: "Example `.corrupted`",
    aliases: ["corrupted"],
  },
  cursed: {
    title: "Cursed",
    description: "burden",
    helpText: "Example `.cursed`",
    aliases: ["cursed"],
  },
  tormented: {
    title: "Tormented",
    description: "burden",
    helpText: "Example `.tormented`",
    aliases: ["tormented"],
  },
};

export const characterCommands: {
  [id: string]: ICommand;
} = {
  start: {
    title: "Create character",
    description:
      "Creates a personal player channel and launches the character creation dialog",
    helpText: "Example `.start`",
    aliases: ["start"],
  },
  remove: {
    title: "Delete character",
    description: "",
    helpText: "Example `.deletechar Olaf`",
    aliases: ["deletechar"],
  },
  char: {
    title: "Show character list",
    description: "",
    helpText: "Example `.charlist`",
    aliases: ["charlist", "pc"],
  },
  subMomentum: {
    title: "Remove a momentum",
    description: "",
    helpText: "Example `.momentum-`",
    aliases: ["momentum-"],
  },
  addMomentum: {
    title: "Add a momentum",
    description: "",
    helpText: "Example `.momentum+`",
    aliases: ["momentum+", "add-momentum", "addmomentum"],
  },
  subSupply: {
    title: "Remove a supply",
    description: "",
    helpText: "Example `.supply-`",
    aliases: ["supply-"],
  },
  addSupply: {
    title: "Add a supply",
    description: "",
    helpText: "Example `.supply+`",
    aliases: ["supply+", "add-supply", "addsupply"],
  },
  subSpirit: {
    title: "Remove a spirit",
    description: "",
    helpText: "Example `.spirit-`",
    aliases: ["spirit-"],
  },
  addSpirit: {
    title: "Add a spirit",
    description: "",
    helpText: "Example `.spirit+`",
    aliases: ["spirit+", "add-spirit", "addspirit"],
  },
  subHealth: {
    title: "Remove a health",
    description: "",
    helpText: "Example `.health- 2`",
    aliases: ["health-", "hp-"],
  },
  addHealth: {
    title: "Add a health",
    description: "",
    helpText: "Example `.health+ 2`",
    aliases: ["health+", "hp+", "add-health", "addhealth"],
  },
  addBond: {
    title: "Add a bond",
    description: "",
    helpText: "Example `.bond`",
    aliases: ["bond+"],
  },
  subBond: {
    title: "Remove a bond",
    description: "",
    helpText: "Example `.bond-`",
    aliases: ["bond-", "sb"],
  },
  useRule: {
    title: "Add +1 momentum for the english rule using",
    description: "",
    helpText: "Example `.use-rule`",
    aliases: ["use-rule", "rule"],
  },
  edge: {
    title: "Action roll + character's **edge**",
    description: "You can add another modifier separated by a space",
    helpText: "Example `.edge 1`",
    aliases: ["edge", "e"],
  },
  heart: {
    title: "Action roll + character's **heart**",
    description: "You can add another modifier separated by a space",
    helpText: "Example `.нрав`",
    aliases: ["heart", "h"],
  },
  iron: {
    title: "Action roll + character's **iron**",
    description: "You can add another modifier separated by a space",
    helpText: "Example `.сталь`",
    aliases: ["iron", "i"],
  },
  shadow: {
    title: "Action roll + character's **shadow**",
    description: "You can add another modifier separated by a space",
    helpText: "Example `.т 2`",
    aliases: ["shadow", "s"],
  },
  wits: {
    title: "Action roll + character's **wits**",
    description: "You can add another modifier separated by a space",
    helpText: "Example `.ум 1`",
    aliases: ["wits", "w"],
  },
  health: {
    title: "Action roll + character's **health**",
    description: "",
    helpText: "Example `.з`",
    aliases: ["health", "hp"],
  },
  spirit: {
    title: "Action roll + character's **spirit**",
    description: "",
    helpText: "Example `.дух`",
    aliases: ["spirit", "spt"],
  },
  supply: {
    title: "Action roll + character's **supply**",
    description: "",
    helpText: "Example `.supply`",
    aliases: ["supply", "spl"],
  },
  editName: {
    title: "Change name",
    description: "",
    helpText: "Example `.name Olaf`",
    aliases: ["name"],
  },
  editDesc: {
    title: "Change description",
    description: "",
    helpText: "Example `.desc Big and strong`",
    aliases: ["desc"],
  },
  editAttributes: {
    title: "Change attributes",
    description: "edge heart iron shadow wits",
    helpText: "Example `.attributes 1 2 3 2 1`",
    aliases: ["attributes", "attr"],
  },
  addAvatar: {
    title: "Add character's image",
    description: "You should attach an image to the message",
    helpText: "Example `.img`",
    aliases: ["img"],
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

const status = {
  spirit: characterCommands.spirit,
  health: characterCommands.health,
  supply: characterCommands.supply,
};

export const cheatCommands: {
  [id: string]: ICommand;
} = {
  addXp: {
    title: "",
    description: "",
    helpText: "",
    aliases: ["addXp"],
    isHidden: true,
  },
  cheats: {
    title: "",
    description: "",
    helpText: "",
    aliases: ["cheats"],
    isHidden: true,
  },
  getRole: {
    title: "Get Player Role",
    description: "",
    helpText: "Example `.get-role`",
    aliases: ["get-role"],
    isHidden: true,
  },
};

export const character = {
  attributes,
  status,
  forgetToMarkProgress:
    "Don't forget to mark harm on the troll card. Press ~ptadd~ on the troll card for that.",
  wizard: [
    {
      step: CharacterWizardStep.Name,
      message: `Welcome to the Iron Lands server. This is where we learn English and play IronSworn. Cooperative TTRPG, where each player from time to time takes on the role of a game master.
The world of the Iron Lands is a harsh Nordic place. There are few people here, coins are not an entrance, barter instead. There is a tradition on the iron islands: if you want to achieve something strongly, you must swear on iron that you will achieve it, then the gods will smile at you.
Read other details about the world in the "LORE" section.
      
Let's create a character for you.
      
What is your character's name?

Oracle can help you. Send \`.o ironlander names\` or \`.o elf names\` or \`.o other names\` to ask oracle.
    `,
    },
    {
      step: CharacterWizardStep.Description,
      message: `Describe the character in a few sentences.

Oracle can help you. Send \`.o npc descriptors\` or \`.o npc role\` or to ask oracle.`,
    },
    {
      step: CharacterWizardStep.Avatar,
      message:
        "Send a portrait (image) of the character. If you do not want to add a portrait, then send any message (for example: no).",
    },
    {
      step: CharacterWizardStep.Attr,
      message: `Your character has the following attributes:
**Edge**: Quickness, agility, and prowess in ranged combat.
**Heart**: Courage, willpower, empathy, sociability, and loyalty.
**Iron**: Physical strength, endurance, aggressiveness, and prowess in close combat.
**Shadow**: Sneakiness, deceptiveness, and cunning.
**Wits**: Expertise, knowledge, and observation.

Distribute values 3 2 2 1 1 separated by a space between the attributes (edge, heart, iron, shadow, wits). For example, if you have wits 3 and iron 1, you are clever, but not very strong, etc.

For example:
\`\`\`1 3 2 1 2 \`\`\` `,
    },
    {
      step: CharacterWizardStep.LongVow,
      message: `Let's continue. Describe the global vow that drives your character through danger.

This vow is part of your character's backstory. It could be a vow taken many years ago, or a reaction to some major recent event. This vow will not be easy to fulfill. It can take months, years, or even decades to see how this vow is fulfilled or abandoned.
This vow is needed not so much to complete it as to describe the character and background of your character.
  
Example. You are haunted by your past, you have vowed to see the defeated clan of raiders. However, there are difficulties. The clan is powerful, and you could not hope to defeat it without an army at your back. The clan is also led by your mother. It will take a special courage to face her again.
The name of the clan: "Red Moon". Their shields are adorned with a blood-red circle.
For now, this vow is a smoldering vow, a promise that has not yet flared up.

Oracle can help you. Send \`.o theme\` or \`.o goals\` to ask oracle.  Also you can use LORE category channels.`,
    },
    {
      step: CharacterWizardStep.ShortVow,
      message: `Describe the "Inciting incident"- a momentary vow that gives impetus to the present moment.
An engaging situation is a problem that arises at the beginning of a story, prompting your character to take action. Everything up to this point is prehistory. An engaging situation is a vow that shows us what the character is actually doing when the game starts.
      
Example. A mysterious illness struck the chieftain of Sinderdom. The village doctor brewed potions, but it didn't help. The priest prayed, but the gods did not listen. The mystic performed divination, but the shadows did not divulge their secrets.
The leader, your friend, disappeared. Without help, they will definitely die. To help them, you went after the mysterious dragon root, according to rumors it grows in a cave behind the pass. No one goes to that cave because of its denizens...
    
Oracle can help you. Send \`.o inciting situations\` or \`.o goals\` to ask oracle. Also you can use LORE category channels.`,
    },
    {
      step: CharacterWizardStep.Assets,
      message: `Vows are divided into types (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic) depending on how quickly they can be fulfilled and how much experience the character will receive for fulfilling the vow.
You can add a new vow at any time using the bot commands.
Examples: \`\`\`.vow 4 Save the Princess \`\`\` \`\`\`.extreme Save the Princess \`\`\`
      
Let's continue the character creating...

Choose 3 assets in the "ASSETS" channel. To select an asset, click on ~hit~ or on the skill number under the asset. Choose one skill in each asset if not already selected. As soon as you select all three assets and skills, the last instruction with a description of how to play will appear in this channel.`,
    },
    {
      step: CharacterWizardStep.TrainingOption,
      message: `Would you like to undergo the training with the bot? (yes / no)`,
    },
    {
      step: CharacterWizardStep.TrainingIntro,
      message: `*Imagine that your character's vow takes them to their homeland to reunite with their family. The character is almost there. He/She only has to cross the bridge.*

*Let's also imagine that I have created a scene (with the command \`.scene\`). Next, I must describe the location of the scene.*

A rough mountain river rustles around its bend. In the distance you can see a massive stone bridge, old, dotted with cracks. There is a troll at the bridge.

We write the description words into the scene channel in a regular font, and if we want to tell the player something in the metagame mode, we use \`*italics*\`. *Italics* do not appear in the chronicle.

To make a player move, you must describe your actions and send the command that best suits your move. All moves can be viewed in the RULES category or by sending the command \`.moves\`. 
As part of the training, I suggest you use the move *GATHER INFORMATION*. It is usually used to examine the situation. 

Send \`.investigate\`
`,
    },
    {
      step: CharacterWizardStep.Investigate,
      message: `*Success! If you play with other players then ask them to describe the situation. I will describe the situation for you.*

You have heard in the legends that trolls ask for a toll on the bridge, but you have nothing of value with you. So you have to stealthily bypass the troll or outwit him. 
      
*Send a message with a literary description of your actions and then send another message with the \`.face\` command to make the move FACE DANGER*`,
    },
    {
      step: CharacterWizardStep.FaceDanger,
      message: `*Oops, failure. I will describe what happens.*
      
The troll becomes aggressive and runs towards you, the ground is cracking under it and you can feel its unpleasant smell.
            
*The fight should start. To do this, open \`.fray\` to activate the ENTER THE FRAY move*`,
    },
    {
      step: CharacterWizardStep.Frei,
      message: `*Let the troll take the initiative. For situations when you don't have initiative but want to fight, use the move: CLASH. Describe the situation, send it and then send \`.clash\`*`,
    },
    {
      step: CharacterWizardStep.Clash,
      message: `You smash the troll and take the initiative.
      
*When you have initiative you can use the move: STRIKE. Describe the situation, send it and then send \`.strike\`*
`,
    },
    {
      step: CharacterWizardStep.Strike,
      message: `You punch the troll. He's shaken.

*You feel that it's time for the finishing blow, press the ~ptroll~ button on the troll card. You can find the card in pinned messages.*`,
    },
    {
      step: CharacterWizardStep.FinishBattle,
      message: `The troll is defeated, the hero returns home and eventually completes the oath and gets experience points.

A game with people or solo looks approximately the same, the rest of the moves can be found in the RULES cathegory.`,
    },
    {
      step: CharacterWizardStep.Done,
      message: `**Done! We can play!** :)`,
    },
  ],
  cantIncreaseHealth:
    "You can't increase health while you are wounded. Use `.sojourn` or `.heal` move to remove wounded condition",
  cantIncreaseSpirit:
    "You can't increase spirit while you are shaken. Use `.sojourn` move to remove shaken condition",
  cantIncreaseSupply:
    "You can't increase supply while you are unprepared. Use `.sojourn` move to remove supply condition",
  nowHasHealth: "now has health",
  nowHasSpirit: "now has spirit",
  nowHasSupply: "now has supply",
  nowHasMomentum: "now has momentum",
  nowHasBond: "now has bond amount",
  allComands: "All commands:   `",
  listEmbed: (char: Character) => {
    const moment = "~moment~";
    const health = "~health~";
    const spirit = "~spirit~";
    const supply = "~supply~";
    const bond = "~bond~";
    const xp = "~islogo~";
    const st = "~stub~";

    let xpMsg = char.xp ? "XP:" : "";
    for (let index = 0; index < char.xp; index++) {
      xpMsg += ` ${xp}`;
    }

    let debilities = getActiveDebilities(char.debilities).map((d) => debEN[d]);
    let debMsg = debilities.length
      ? "```diff\nDebilities:\n- " + debilities.join("\n- ") + "```"
      : "";

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(char.name)
      .setDescription(
        `${st} 
  EDGE                  ${char.attributes.edge}              
  HEART             ${char.attributes.heart}               
  IRON                  ${char.attributes.iron}               
  SHADOW       ${char.attributes.shadow}               
  WITS                 ${char.attributes.wits}               

  ${moment}  Momentum    ${char.momentum.current}
  ${health}  Health                 ${char.status.health.current}
  ${spirit}  Spirit                    ${char.status.spirit.current}
  ${supply}  Supply                 ${char.status.supply.current}
  ${bond}  Bonds                  ${char.bonds.current}

  
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
  useRule: `takes +1 momentum for the english rule using`,
  userAlreadyExistMsg: (char: Character) =>
    `Delete the current character before creating a new character. Send \`.deletechar ${char.name}\``,
  userDeleteError: "name is not correct",
  firstSteps: (
    playerCnl: string,
    infoCnl: string
  ) => `Join one of the current scenes or create your own (send \`.scene\`). Scene instructions are in the pinned scene message.

You can change your character any time. Use \`.name\`, \`.desc\` and \`.attributes\` for that. Your character is created in the ${playerCnl} channel. Use this channel for personal notes of the character. For example, you can describe the character's bonds there. At the beginning of the game, your character has 3 bonds. These are 3 local NPCs who can help you.
  
Detailed information about the rules here: ${infoCnl}
  
P.S. I strongly recommend you mute RULES category and chronic channel`,
};

const debEN: { [id: string]: string } = {
  wounded:
    "WOUNDED: You can't increase health while you are wounded. Use `.sojourn` or `.heal` move to remove wounded condition.\n",
  shaken:
    "SHAKEN: You can't increase spirit while you are shaken. Use `.sojourn` move to remove shaken condition.\n",
  unprepared:
    "UNPREPARED: You can't increase supply while you are unprepared. Use `.sojourn` move to remove supply condition.\n",
  encumbered: "ENCUMBERED",
  maimed:
    "MAIMED: it is permanent. You have suffered a wound which causes you ongoing physical challenges, such as the loss of an eye or hand. Or, you bear horrific scars which serve as a constant reminder of your failures.\n",
  corrupted:
    "CORRUPTED: it is permanent. Your experiences have left you emotionally scarred. You are at the threshold of losing yourself to darkness.\n",
  cursed:
    "CURSED: it is a result of life-changing experiences that leave you bound to quests. Clearing a curse can only be accomplished by resolving the quest. When you are cursed, you should consider the physical manifestations of these conditions. You have walked the lands beyond death or suffered visions of your greatest fears. What signs do you bear? How do these experiences affect your relationships?\n",
  tormented:
    "TORMENTED: it is a result of life-changing experiences that leave you bound to quests. Clearing a torment can only be accomplished by resolving the quest. When you are tormented, you should consider the emotional manifestations of these conditions. You have walked the lands beyond death or suffered visions of your greatest fears. What signs do you bear? How do these experiences affect your relationships?\n",
};
