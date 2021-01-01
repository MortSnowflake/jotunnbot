import { CharacterWizardStep } from "../../../core/character/character.model";
import { IMove } from "../..";

const payPrice = `Сhoose one:
• Make the most obvious negative outcome happen.
• Envision two negative outcomes. Rate one as "likely", and send \`.ask likely\`. On a ‘yes’, make that outcome happen. Otherwise, make it the other.
• Send \`.price \`. If you have difficulty interpreting the result to fit the current situation, send it again.
• Ask another player or master which negative outcome happens.`;

export const adventureMoves: IMove[] = [
  {
    type: "ADVENTURE MOVES",
    name: "FACE DANGER",
    aliases: ["face-danger", "face", "overcome"],
    trainingStep: CharacterWizardStep.FaceDanger,
    trainingResult: 0,
    argIsRequired: true,
    description: `When you attempt something risky or react to an imminent threat, envision your action and send. If you act...
• With speed, agility, or precision: send \`.face edge\`
• With charm, loyalty, or courage: send \`.face heart\`
• With aggressive action, forceful defense, strength, or endurance: send \`.face iron \`
• With deception, stealth, or trickery: send \`.face shadow\`
• With expertise, insight, or observation: send \`.face wits \`

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.face iron 1\`
`,
    intro: `Are you trying to do something risky or
react to an imminent threat, describe what you are doing. Read your assets.`,
    results: [
      `On ~miss~~miss~ you didn’t work or your progress was destroyed by new events. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ you did well, but pick one.
• You are delayed, lose advantage, or face a new danger: Suffer -1 momentum (send \`.momentum-\`).
• You are tired or hurt: send \`.endure\`
• You are dispirited or afraid: \`.sustain\`
• You sacrifice resources: Suffer -1 supply (send \`.supply-\`).`,
      `On ~hit~~hit~ you succeeded. Mark +1 momentum (send \`.momentum+\`)`,
    ],
  },
  {
    type: "ADVENTURE MOVES",
    name: "SECURE AN ADVANTAGE",
    aliases: ["advantage", "secure-advantage"],
    argIsRequired: true,
    description: `When you assess a situation, make preparations, or trying to gain leverage, envision your action. 
If you act ...
• Fast, dexterous or accurate: send \`.advantage edge \`
• Charming, bold or true: send \`.advantage heart \`
• Aggressive, strong, hardy: send \`.advantage iron\`
• Discreetly, despicably, discreetly: send \`.advantage shadow \`
• Discerning, smart, careful: send \`.advantage wits\`

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.advantage iron 1\`
`,
    intro: `You are assessing a situation, making preparations, trying to gain leverage, envision your action.`,
    results: [
      `On ~miss~~miss~ you fail or your assumptions betray you. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ your advantage is short-lived. Take +1 momentum  (send \`.momentum+\`). `,
      `On ~hit~~hit~, you gain an advantage. Pick one.
• Take control: make another move (but not a move
progress) and add +1.
• Prepare to act: mark +2 to momentum (send \`.momentum+ 2\`).`,
    ],
  },
  {
    type: "ADVENTURE MOVES",
    name: "GATHER INFORMATION",
    attribute: "wits",
    aliases: ["investigate", "gather-info"],
    trainingStep: CharacterWizardStep.Investigate,
    trainingResult: 2,
    description: `When you search an area, you ask questions,
investigating or following in the footsteps, send \`.investigate\` (it will use your Wits).
If you are working in a community or asking questions about a person with whom you have a relationship, add +1.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.investigate 1\``,
    intro: `When you search an area, you ask questions,
investigating or following in the footsteps, send \`.investigate\` (it will use your Wits).
If you are working in a community or asking
questions about a person with whom you have a relationship, add + 1.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.investigate 1\``,
    results: [
      `On ~miss~~miss~ your investigation unearths a dire threat or reveals an unwelcome truth that undermines your quest. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ information complicates your task or introduces
new danger. Describe your discovery (*Ask the Oracle* (send \`.ask\`) if
not sure) and mark the +1 momentum (send \`.momentum+\`)`,
      `On ~hit~~hit~, you learn something useful and specific. You
it is very clear what and how to do next. Describe what you learned
(*Ask the Oracle* (send \`.ask\`) if not sure) and mark +2 to momentum (send \`.momentum+ 2\`).`,
    ],
  },
  {
    type: "ADVENTURE MOVES",
    name: "HEAL",
    aliases: ["heal"],
    lowAttribute: ["wits", "iron"],
    description: `When you heal wounds or diseases, send \`.heal\` (it will use your wits or iron whichever is lower).

    Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.heal 1\``,
    results: [
      `On ~miss~~miss~ your aid is ineffective. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ as above, but you must mark -1 supply (send \`.supply-\`) or -1 momentum (send \`.momentum-\`).`,
      `On ~hit~~hit~ your healing is useful. You (or the patient) can
remove the wounded condition (send \`.wounded\` for it). After that, you (or the ally under your care) marks +2 health (send \`.health+ 2\`).`,
    ],
  },
  {
    type: "ADVENTURE MOVES",
    name: "RESUPPLY",
    aliases: ["resupply"],
    attribute: "wits",
    description: `When you hunt, forage, or scavenge, send \`.resupply\` (it will use your Wits).

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.resupply 1\``,
    results: [
      `On ~miss~~miss~ you find nothing helpful. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ mark up to +2 supply (send \`.supply+ 2\`) and -1 momentum (send \`.momentum-\`) for each
them.`,
      `On ~hit~~hit~ you succeeded. Mark +2 supply (send \`.supply+ 2\`).`,
    ],
  },
  {
    type: "ADVENTURE MOVES",
    name: "MAKE CAMP",
    aliases: ["camp", "make-camp"],
    attribute: "supply",
    description: `When you rest and recover for several hours in the wild, send \`.camp\` (it will use your Supply).

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.camp 1\``,
    results: [
      `On ~miss~~miss~ you can't rest. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ you make one choice.
• Heal: Mark +1 health (send \`.health+\`) for yourself and your companions.
• Snacks: Mark -1 supply (send \`.supply-\`) and +1 health (send \`.health+\`) for yourself and yours
satellites.
• Relax: Mark +1 spirit (send \`.spirit+\`).
• Pull yourself together: mark +1 momentum (send \`.momentum+\`).
• Get ready: when you leave camp, add +1
to Travel.`,
      `On ~hit~~hit~ you and your allies have two choices.`,
    ],
  },
  {
    findFromCode: "undertakeJourney",
    type: "ADVENTURE MOVES",
    name: "UNDERTAKE A JOURNEY",
    aliases: ["travel", "go"],
    description: `When you travel across hazardous or unfamiliar lands, set the rank of your journey (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic), create a Progress Tracker (e.g. send \`.journey 2 Travel to Gothur's tower\`).

Then, for each part of the journey, send \`.travel\` (it will use your Wits). If you coming from a community with which you have a connection, add +1 on the first roll (\`.travel 1\`).

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.travel 2\``,
    results: [
      `On ~miss~~miss~ you face the dangers of the path. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ you reach the pass, mark -1 supply (send \`.supply-\`) and mark progress (press ~ptadd~ on the travel tracker).`,
      `On ~hit~~hit~ you reached the pass. If the pass is unknown
describe it (*Ask the Oracle* (send \`.ask\`) if not sure). Then choose
one thing.
• Lean: Mark progress (press ~ptadd~ on the travel tracker).
• Fast way: mark progress, +1 momentum (send \`.momentum+\`) and -1 supply (send \`.supply-\`). `,
    ],
  },
  {
    findFromCode: "reachYourDestination",
    type: "ADVENTURE MOVES",
    name: "REACH YOUR DESTINATION",
    aliases: ["reach", "reach-destination"],
    withoutRoll: true,
    description: `*Progress move.* When your journey comes to an end, press ~ptroll~ on the travel tracker.`,
    results: [
      `On ~miss~~miss~ you have hopelessly lost your way, lost your aim, or
arrived in the wrong place. If you keep on traveling, erase all
progress other than one completed and increase the rank
travel for one (unless it's already epic).`,
      `On ~hit~~miss~ you have come to meet unexpected dangers and
complexities. Describe them (*Ask the Oracle* (send \`.ask\`) if you are not sure) .`,
      `On ~hit~~hit~ you arrived at the right moment. Pick one.
• Take another move (but not *Progress move*) and add +1.
• Mark +1 momentum (send \`.momentum+\`).`,
    ],
  },
];

export const relationMoves: IMove[] = [
  {
    type: "RELATIONSHIP MOVES",
    name: "COMPEL",
    aliases: ["compel", "persuade", "trick"],
    description: `When you attempt to persuade someone to do something, envision your approach. If you…
• Charm, pacify, barter, or convince:: send \`.compel heart\` (add +1 if you share a bond: \`.compel heart 1\`).
• Threaten or incite: send \`.compel iron\`
• Lie or swindle: send \`.compel shadow\`

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.compel heart 1\``,
    intro: `When you are trying to convince someone to do something, describe your approach.`,
    results: [
      `On ~miss~~miss~ they refuse or make a demand which costs you greatly.
Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ like above, but they will ask for something in return. Describe,
what they need (*Ask the Oracle* (send \`.ask\`) if not sure).`,
      `On ~hit~~hit~ they will do what you want or share
information. Mark the +1 momentum (send \`.momentum+\`). If you use this
exchange to *Gather Information* (\'.investigate\'), then make it and add + 1.`,
    ],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "SOJOURN",
    attribute: "heart",
    aliases: ["sojourn", "waste-time", "wt"],
    description: `When you spend time in the community looking for help, send \`.sojourn\` (it'll use Heart). Add +1 if you share a bond (send \`.sojourn 1\`). 

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.sojourn 1\`

Clear a Condition
• Mend: Clear a wounded debility (send \`.wounded\` for it), mark +1 health (send \`.health+\`).
• Hearten: Clear a shaken debility (send \`.shaken\` for it), mark +1 spirit (send \`.spirit+\`).
• Equip: Clear an unprepared debility (send \`.unprepared\` for it), mark +1 supply (send \`.supply+\`).

Recover
• Recuperate: Take +2 health (send \`.health+ 2\`) for yourself and any companions.
• Consort: Take +2 spirit (send \`.spirit+ 2\`).
• Provision: Take +2 supply (send \`.supply+ 2\`).
• Plan: Take +2 momentum (send \`.momentum+ 2\`).

Provide Aid
• Take a quest: Envision what this community needs, or what trouble it is facing (*Ask the Oracle* if unsure: send \`.ask\`). If you chose to help, *Swear an Iron Vow* and add +1.`,
    results: [
      `On ~miss~~miss~ you find no help here Pay the Price - ${payPrice}`,
      `On a ~hit~~miss~, you and your allies may each choose one from within the categories above. If you share a bond, choose one more. You and your allies may each focus on one of your chosen recover actions and send \`.heart\`. If you share a bond, add +1 (\`.heart 1\`).
On a ~hit~~hit~ take +2 more for that action. On ~hit~~miss~ take +1 more. On ~miss~~miss~ it goes badly and you lose all benefits for that action.`,
      `On ~hit~~hit~, you and your allies may each choose two from within the categories above. You and your allies may each focus on one of your chosen recover actions and send \`.heart\`. If you share a bond, add +1 (\`.heart 1\`).
On a ~hit~~hit~ take +2 more for that action. On ~hit~~miss~ take +1 more. On ~miss~~miss~ it goes badly and you lose all benefits for that action.`,
    ],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "DRAW THE CIRCLE",
    aliases: ["circle", "enter-into-circle"],
    attribute: "heart",
    description: `When you challenge someone to a formal duel, or accept a challenge, send \`.circle \` (it will use your Heart). If you have a connection with this
community, add +1.

Boasts:
• Grant first strike: Your foe has initiative.
• Bare yourself: Take no benefit of armor or shield; your foe’s harm is +1.
• Hold no iron: Take no benefit of weapons; your harm is 1.
• Bloody yourself: Endure Harm (1 harm).
• To the death: One way or another, this fight must end with death.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.circle 1\``,
    results: [
      `On ~miss~~miss~ you begin the duel at a disadvantage. Your foe has initiative. Pay the Price - ${payPrice}
Then, make moves to resolve the fight. If you are the victor, you may make a lawful demand, and your opponent must comply or forfeit their honor and standing. If you refuse the challenge, surrender, or are defeated, they make a demand of you. `,
      `On ~hit~~miss~ you can choose one boast above in exchange for +1 momentum (send \`.momentum+\`).`,
      `On ~hit~~hit~ mark +1 momentum (send \`.momentum+\`). You can choose two
boasts above and mark +1 momentum for each (send \`.momentum+ 2\`).`,
    ],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "FORGE A BOND",
    aliases: ["bond", "forge-bond"],
    attribute: "heart",
    description: `When you spend significant time with a person or community, stand together to face hardships, or make sacrifices for their cause, you can attempt to create a bond. When you do, send \`.bond\` (it will use your Heart). 
If you make this move after you successfully *Fulfill Your Vow* to their benefit, you may reroll any dice.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.bond 1\``,
    results: [
      `On ~miss~~miss~ they reject you. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ they ask something more of you first. Envision what it is (*Ask the Oracle* if unsure: send \`.ask\`), do it (or *Swear an Iron Vow*), and mark the bond. If you refuse or fail, Pay the Price - ${payPrice}`,
      `On ~hit~~hit~ make note of the bond, mark a tick on your bond progress track, and choose one.
• Take +1 spirit (send \`.spirit+\`).
• Take +2 in momentum (send \`.momentum+ 2\`).`,
    ],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "TEST YOUR BOND",
    attribute: "heart",
    aliases: ["test-bond"],
    description: `When your bond is tested through conflict, betrayal, or circumstance, send \`.test-bond\` (it will use your Heart).

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.bond 1\``,
    results: [
      `On ~miss~~miss~ or if you have no interest in maintaining this relationship, clear the bond and Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ your bond is fragile and you must prove your loyalty. Envision what they ask of you (*Ask the Oracle* if unsure: send \`.ask\`), and do it (or *Swear an Iron Vow*). If you refuse or fail, clear the bond and Pay
Price - ${payPrice}`,
      `On ~hit~~hit~ this test has strengthened your bond. Choose one.
• Mark +1 spirit (send \`.spirit+\`).
• Mark +2 in momentum (send \`.momentum+ 2\`).`,
    ],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "AID YOUR ALLY",
    aliases: ["aid", "aid-ally"],
    description: `When you *Secure an Advantage* in direct support of an ally, and get ~hit~ +, they (instead of you) can take the benefits of the move. If you are in combat and score a ~hit~~hit~, you and your ally have initiative.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.aid 1\``,
    withoutRoll: true,
    results: [],
  },
  {
    type: "RELATIONSHIP MOVES",
    name: "WRITE YOUR EPILOGUE",
    aliases: ["epilogue", "write-your-epilogue"],
    customMove: "epilogue",
    description: `*Progress move*
When you retire from your life as Ironsworn, envision two things: What you hope for, and what you fear. This move uses your bond amount.`,
    results: [
      `On ~miss~~miss~, your fears are realized. `,
      `On ~hit~~miss~ your life takes an unexpected turn, but not necessarily for the worse. You find yourself spending your days with someone or in a place you did not foresee. Envision it (*Ask the Oracle* if unsure: send \`.ask\`).`,
      `On ~hit~~hit~, things come to pass as you hoped.`,
    ],
  },
];

export const battleMoves: IMove[] = [
  {
    findFromCode: "enterTheFray",
    type: "BATTLE MOVES",
    name: "ENTER THE FRAY",
    trainingStep: CharacterWizardStep.Frei,
    trainingResult: 1,
    aliases: ["fray", "enter-the-fray"],
    argIsRequired: true,
    description: `When you enter into combat, set the rank of each of your foes (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic).
Then, determine who is in control. If you are...
• Facing off against your foe: send \`.fray heart+<adds> <rank> <enemy name>\`
• Moving into position against an unaware foe, or striking without warning: send \`.fray shadow+<adds> <rank> <enemy name>\`
• Ambushed: send \`.fray wits+<adds> <rank> <enemy name> \`

Examples: \`.fray heart 1 Troll\` or \`.fray wits+2 1 Troll\``,
    results: [
      `On ~miss~~miss~, combat begins with you at a disadvantage. Your foe has initiative. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ choose one.
• Bolster your position: Take +2 to momentum (send \`.momentum+ 2\`).
• Prepare to act: Take initiative.`,
      `On ~hit~~hit~ take +2 momentum. (send \`.momentum+ 2\`). You have initiative. `,
    ],
  },
  {
    type: "BATTLE MOVES",
    name: "STRIKE",
    aliases: ["strike", "attack"],
    argIsRequired: true,
    trainingStep: CharacterWizardStep.Strike,
    trainingResult: 2,
    description: `When you have initiative and attack in close quarters,,
send \`.strike iron \`. When you have initiative and attack at range, send \`.strike edge \`. When you wield a deadly weapon (such as a sword, axe, spear, or bow), you inflict 2 harm. When you are unarmed, 
or wield an improvised or simple weapon (such as a shield, stick, club, staff, or rock), you inflict 1 harm. To inflict 1 harm press ~ptadd~ on the enemy tracker.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.strike iron 1\``,
    results: [
      `On ~miss~~miss~, your attack fails and you must. Your foe has initiative. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ inflict your harm and lose initiative.`,
      `On ~hit~~hit~, inflict +1 harm. You retain initiative.`,
    ],
  },
  {
    type: "BATTLE MOVES",
    name: "CLASH",
    aliases: ["clash"],
    trainingStep: CharacterWizardStep.Clash,
    trainingResult: 2,
    argIsRequired: true,
    description: `When your foe has initiative and you fight with them in close quarters, send \`.clash iron \`. When you exchange a volley at range, or shoot at an advancing foe, send \`.clash edge \`. When you wield a deadly weapon (such as a sword, axe, spear, or bow), you inflict 2 harm. When you are unarmed, 
or wield an improvised or simple weapon (such as a shield, stick, club, staff, or rock), you inflict 1 harm. To inflict 1 harm press ~ptadd~ on the enemy tracker.

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.clash iron 1\``,
    results: [
      `On ~miss~~miss~, you are outmatched. Your foe has initiative. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ inflict your harm and Pay the Price - ${payPrice} `,
      `On ~hit~~hit~, inflict your harm and choose one. You get initiative.
• Strengthen your position: mark +1 momentum (send \`.momentum+\`).
• Successfully attack: inflict +1 harm. `,
    ],
  },
  {
    type: "BATTLE MOVES",
    name: "TURN THE TIDE",
    aliases: ["break"],
    description: `Once per fight, when you risk it all, you may steal initiative from your foe to make a move (not a progress move). When you do, add +1 and mark +1 momentum (send \`.momentum+\`) on ~hit~ +.
On ~miss~~miss~ you must suffer a dire outcome. Pay the Price - ${payPrice} `,
    withoutRoll: true,
    results: [],
  },
  {
    findFromCode: "endTheFight",
    type: "BATTLE MOVES",
    name: "END THE FIGHT",
    aliases: ["end-fight"],
    withoutRoll: true,
    description: `*Progress move*
When you use a decisive move and get it, you can end the fight. If you decide to do this, press ~ptroll~ on the enemy tracker.`,
    results: [
      `On ~miss~~miss~ you have lost this fight. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ as above, but pick one.
• It’s worse than you thought: Endure Harm.
• You are overcome: Endure Stress.
• Your victory is short-lived: A new danger or foe appears, or an existing danger worsens.
• You suffer collateral damage: Something of value is lost or broken, or someone important must pay the cost.
• You’ll pay for it: An objective falls out of reach.
• Others won’t forget: You are marked for vengeance.`,
      `On ~hit~~hit~, this foe is no longer in the fight. They are killed, out of action, flee, or surrender as appropriate to the situation and your intent (*Ask the Oracle* if unsure: send \`.ask\`).`,
    ],
  },
  {
    type: "BATTLE MOVES",
    name: "BATTLE",
    argIsRequired: true,
    aliases: ["battle"],
    description: `When you fight a battle, and it happens in a blur, envision your objective and roll. If you primarily…
• Fight at range, or using your speed and the terrain to your advantage: send \`.battle edge \`
• Fight depending on your courage, allies, or companions: send \`.battle heart \`
• Fight in close to overpower your opponents: send \`battle iron \`
• Fight using trickery to befuddle your opponents: send \`battle shadow \`
• Fight using careful tactics to outsmart your opponents: send \`.battle wits \`

Read your assets. If some learned asset skill contains adds suitable to the move send move with the adds e.g. \`.battle 1\`
`,
    intro: `You are fighting a battle, everything flickers around and
intertwined`,
    results: [
      `On ~miss~~miss~ you are defeated and the objective is lost to you. Pay the Price - ${payPrice}`,
      `On ~hit~~miss~ you achieve your objective, but not without cost.
Pay the Price - ${payPrice}`,
      `On ~hit~~hit~ you achieve your objective unconditionally. Take +2 to momentum (send \`.momentum+ 2\`)`,
    ],
  },
  {
    type: "BATTLE MOVES",
    name: "OTHER MOVES IN BATTLE",
    aliases: ["moves-in-combat", "other-moves-in-combat", "other-moves"],
    description: `
*Deal damage*: When you wield a deadly weapon (such as a sword, axe, spear, or bow), you inflict 2 harm. When you are unarmed, 
or wield an improvised or simple weapon (such as a shield, stick, club, staff, or rock), you inflict 1 harm. To inflict 1 harm press ~ptadd~ on the enemy tracker.

*Secure an Advantage*: When acting to outwit or outmaneuver your foe, or setting up another move.

*Face Danger*: When overcoming an obstacle, avoiding a hazard, fleeing, or evading an attack (without fighting back).

*Aid Your Ally*: When making a move to give your ally an advantage.

*Compel*: When surrendering, coercing your foe to stand down, or negotiating a truce.

*Suffer Moves (all)*: When facing physical damage, mental trauma, or lack of supply.

*Pay the Price*: When suffering the outcome of a move.

*Ask the Oracle*: When asking questions about combat events or your foe’s intent and actions (send \`.ask\`).

*Act dashingly*: if you describe your fight brightly, juicy and in detail, add +1 to the roll
`,
    results: [],
    withoutRoll: true,
  },
];

export const aftermathMoves: IMove[] = [
  {
    type: "SUFFER MOVES",
    name: "ENDURE HARM",
    aliases: ["endure"],
    highAttribute: ["health", "iron"],
    description: `When you face physical damage, suffer -health equal to your foe’s rank or as appropriate to the situation (e.g. send \`.health- 2\`).
If your health is 0, mark the momentum equal to the remaining -health  (e.g. send \`.momentum- 2\`). Then send \`.endure\` (it will use your iron or health whichever is higher).`,
    results: [
      `On ~miss~~miss~ suffer -1 momentum (send \`.momentum-\`). If yours health 0, mark \`.wounded\` or \`.maimed\` (if not already marked) or send \`.harm \``,
      `On ~hit~~miss~ you press on.`,
      `On ~hit~~hit~ choose one.
• Pull yourself together: If your health is greater than 0, suffer -1 momentum (send \`.momentum-\`) in
    exchange for +1 health (send \`.health+\`).
• Embrace the pain: take +1 momentum (send \`.momentum+\`).`,
    ],
  },
  {
    type: "SUFFER MOVES",
    name: "FACE DEATH",
    aliases: ["death"],
    attribute: "heart",
    description: `When you are brought to the brink of death, and glimpse the world beyond, send \`.death \` (it will use your Heart).`,
    intro:
      "When you are brought to the brink of death, and glimpse the world beyond...",
    results: [
      `On ~miss~~miss~ you are dead.`,
      `On ~hit~~miss~ choose one.
• You die, but not before making a noble sacrifice. Envision your final moments.
• Death desires something of you in exchange for your life. Envision what it wants (*Ask the Oracle* if unsure: send \`.ask\`), and Swear an Iron Vow (formidable or extreme) to complete that quest. If you fail to score a hit when you Swear an Iron Vow, or refuse the quest, you are dead. Otherwise, you return to the mortal world and are now cursed (send \`.cursed\` for it), you can only remove the curse completing the quest (send \`.cursed\` after it again).`,
      `On ~hit~~hit~ death rejects you. You are cast back into the mortal world.`,
    ],
  },

  {
    type: "SUFFER MOVES",
    name: "COMPANION ENDURE HARM",
    aliases: ["companion-endure"],
    attribute: "heart",
    description: `When your companion faces physical damage, they suffer -health equal. If the health of the companion is 0, mark -momentum equal to the remaining health (e.g. send \`.momentum- 2\`). Then send \`.companion-endure\` (it will use your Heart).`,
    results: [
      `On ~miss~~miss~ also mark -1 momentum (send \`.momentum-\`). If the health of the companion is 0,
they is terribly wounded and unconscious. Without aid, they die in an hour or two.
If you roll a miss with a 1 on your action die, and your companion’s health is 0, they are now dead. Take 1 experience for each marked ability on your companion asset, and remove it.`,
      `~hit~~miss~ your companion is battered. If their health is 0, they cannot assist you until they gain at least +1 health.`,
      `On ~hit~~hit~, your companion rallies. Give them +1 health.`,
    ],
  },
  {
    type: "SUFFER MOVES",
    name: "SUSTAIN STRESS",
    argIsRequired: true,
    aliases: ["sustain"],
    highAttribute: ["spirit", "heart"],
    description: `When you face mental shock or despair, suffer -spirit equal to your foe’s rank or as appropriate to the situation. If your spirit is 0, suffer -momentum equal to any remaining spirit. (e.g. send \`.momentum- 2\`). Then send \`.sustain\`. The roll uses your spirit or heart whichever is higher`,
    results: [
      `On ~miss~~miss~ suffer -1 momentum (send \`.momentum-\`). If your spirit is 0, send \`.shaken\` or \`.corrupted\` (if not already checked) or send \`.stress\``,
      `On ~hit~~miss~ you press on.`,
      `On ~hit~~hit~ choose one.
• Shake it off: if your spirit is greater than 0, mark the -1 momentum (send \`.momentum-\`) in exchange for +1 spirit (send \`.spirit+\`).
• Embrace the darkness: Take +1 momentum (send \`.momentum+\`).`,
    ],
  },
  {
    type: "SUFFER MOVES",
    name: "FACE DESOLATION",
    aliases: [],
    attribute: "heart",
    intro: "When you are brought to the brink of desolation...",
    description: `When you are brought to the brink of desolation, send \`.desolation \` (it will use your Heart).`,
    results: [
      `On ~miss~~miss~ you succumb to despair or horror and are lost.`,
      `On ~hit~~miss~ choose one.
• Your spirit or sanity breaks, but not before you make a noble sacrifice. Envision your final moments.
• You see a vision of a dreaded event coming to pass. Envision that dark future (*Ask the Oracle* if unsure: send \`.ask\`), and Swear an Iron Vow (formidable or extreme) to prevent it. If you fail to score a hit when you Swear an Iron Vow, or refuse the quest, you are lost. Otherwise, you return to your senses and are now tormented (send \`.tormented\` for it). 
You may only clear the tormented debility by completing the quest (send \`.tormented\` after it again).`,
      `On ~hit~~hit~ you resist and press on.`,
    ],
  },
  {
    type: "SUFFER MOVES",
    name: "OUT OF SUPPLY",
    aliases: [],
    description: `If you have to mark -supply when you unprepared, exchange them instead at any combinations for \`.health-\`, \`.spirit-\`, \`.momentum-\``,
    withoutRoll: true,
    results: [],
  },
  {
    type: "SUFFER MOVES",
    name: "FACE A SETBACK",
    aliases: [],
    description: `When your momentum is at its minimum (-6), and you suffer additional -momentum, choose one.
• Exchange each additional -momentum for any combination of \`.health-\`, \`.spirit-\` or \`.supply-\` as appropriate to the circumstances.
• Envision an event or discovery (*Ask the Oracle* if unsure: send \`.ask\`) which undermines your progress in a current quest, journey or fight. Then, for each additional -momentum, press ~ptsub~ on the progress tracker or the vow tracker`,
    withoutRoll: true,
    results: [],
  },
];

export const fateMoves: IMove[] = [
  {
    type: "FATE MOVES",
    name: "SWEAR AN IRON VOW",
    aliases: ["swear"],
    attribute: "heart",
    description: `When you swear upon iron to complete a quest, write your vow and give the quest a rank (it will use your +heart). If you make this vow to a person or community with whom you share a bond, add +1 (.swear 1).`,
    results: [
      `On ~miss~~miss~ you face a significant obstacle before you can begin your quest. Envision what stands in your way (send \`.ask\` if unsure), Send \`.vow <rank> <description>\` (e.g. \`.vow 2 save the princess\`) and choose one.
• You press on: Suffer -2 momentum (send \`.momentum- 2\`), and do what you must to overcome this obstacle.
• You give up: *Forsake Your Vow* (press ~ptdel~ on the vow tracker)`,
      `On ~hit~~miss~ you are determined but begin your quest with more questions than answers. Take +1 momentum (send \`.momentum+\`), and envision what you do to find a path forward. Send \`.vow <rank> <description>\` (e.g. \`.vow 2 save the princess\`).`,
      `On ~hit~~hit~ you are emboldened and it is clear what you must do next (send \`.ask\` if unsure). Take +2 momentum (send \`.momentum+ 2\`). Send \`.vow <rank> <description>\` (e.g. \`.vow 2 save the princess\`).`,
    ],
  },
  {
    type: "FATE MOVES",
    name: "REACH A MILESTONE",
    aliases: [],
    description: `When you make significant progress in your quest by overcoming a critical obstacle, completing a perilous journey, solving a complex mystery, defeating a powerful threat, gaining vital support, or acquiring a crucial item, you may mark progress (press ~ptadd~ on the vow tracker).`,
    results: [],
  },
  {
    type: "FATE MOVES",
    name: "FULFILL YOUR VOW",
    findFromCode: "fulfillYourVow",
    aliases: [],
    description: `*Progress move*
When you achieve what you believe to be the fulfillment of your vow, press ~ptroll~ on the vow tracker.`,
    results: [
      `On ~miss~~miss~, your quest is undone. Envision what happens (*Ask the Oracle* if unsure: send \`.ask\`), and choose one.
• You recommit: Clear all but one filled progress, and raise the quest’s rank by one (if not already epic).
• You give up: *Forsake Your Vow* (press ~ptdel~ on the vow tracker)`,
      `On ~hit~~miss~, there is more to be done or you realize the truth of your quest. Envision what you discover (*Ask the Oracle* if unsure: send \`.ask\`). Then, mark experience (troublesome=0; dangerous=1; formidable=2; extreme=3; epic=4). You may *Swear an Iron Vow* (\`.swear\`) to set things right. If you do, add +1.`,
      `On ~hit~~hit~, your quest is complete. You automatically get experience (troublesome = 1;
      dangerous = 2; formidable = 3; extreme = 4; epic = 5).`,
    ],
  },
  {
    type: "FATE MOVES",
    name: "FORSAKE YOUR VOW",
    aliases: ["forsake"],
    description: `When you renounce your quest, betray your promise, or the goal is lost to you, press :ptdel: on the vow tracker and send \`.sustain\`.
You suffer -spirit equal to the rank of your quest (troublesome=1; dangerous=2; formidable=3; extreme=4; epic=5). e.g. send \`.spirit- 3\`.
If the vow was made to a person or community with whom you share a bond, *Test Your Bond* (send \`.test-bond\`) when you next meet.`,
    results: [],
  },
  {
    type: "FATE MOVES",
    name: "ADVANCE",
    aliases: [],
    description: `When you focus on your skills, receive training, find inspiration, earn a reward, or gain a companion, you may spend 3 experience to add a new asset, or 2 experience to upgrade an asset.`,
    results: [],
  },
  {
    type: "FATE MOVES",
    name: "PAY THE PRICE",
    aliases: [],
    description: `When you suffer the outcome of a move, choose one.
• Make the most obvious negative outcome happen.
• Envision two negative outcomes. Rate one as "likely", and send \`.ask likely\`. On a ‘yes’, make that outcome happen. Otherwise, make it the other.
• Send \`.price \`. If you have difficulty interpreting the result to fit the current situation, send it again`,
    results: [],
  },
  {
    type: "FATE MOVES",
    name: "ASK THE ORACLE",
    aliases: ["ask"],
    description: `When you seek to resolve questions, discover details in the world, determine how other characters respond, or trigger encounters or events, you may…

• Draw a conclusion: Decide the answer based on the most interesting and obvious result.

• Ask a yes/no question: Decide the odds of a "yes", and send \`.ask 50/50\` or another odd from the list: 
\`almost certain, likely, 50/50, unlikely, small chance\`.

• Pick two: Envision two options. Rate one as "likely", and send \`.ask likely\`. If not, it is the other.

• Spark an idea: Brainstorm or use a random prompt (send \`.o\`).`,
    results: [],
    customMove: "ask",
    params: {
      certain: "almost certain",
      likely: "likely",
      half: "50/50",
      unlikely: "unlikely",
      small: "small chance",
    },
  },
];

export const delveMoves: IMove[] = [
  {
    type: "DELVE MOVES",
    name: "DISCOVER A SITE",
    aliases: [],
    fakeAliases: ["site"],
    description: `When you decide to enter perilous site to achieve a goal, choose the theme and domains that best reflect its nature, or leave it to the oracles.
Assign a rank to the site (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic).
Submit \`.site <rank> <theme> <domain> \`
For example \`.site 2 corrupted cavern \`. or \`.site 2 \` then the oracles will come up with the property and theme themselves.
To see a list of ownerships and topics, send \`.site \`

If you return to a previously learned site, roll both challenge dice, take the lowest value, and clear that number of progress boxes.
Then, send \`.delve\` to explore this place.
`,

    results: [],
  },
  {
    type: "DELVE MOVES",
    name: "DELVE THE DEPTHS",
    aliases: [],
    fakeAliases: ["delve"],
    description: `When you move to another room within the site, imagine your surroundings (*Ask the oracle* (\`.ask\`) if unsure or send \`.environment\`). Then consider your approach. If you navigate this area...
• With a hurry: send \`.delve edge \` (affects the chance to pass the site faster, but more dangerous)
• With cunning or quietly: send \`.delve shadow \` (affects the chance to pass the site slower, but safer)
• Carefully or intuitively: send \`.delve wits \` (affects the chance to notice more details in the site)
`,

    results: [],
  },
  {
    type: "DELVE MOVES",
    name: "FIND AN OPPORTUNITY",
    aliases: [],
    fakeAliases: ["opportunity"],
    description: `If you encounter a useful situation or feature in the site, please send \`.opportunity \`. If you make this move as a result of a ~hit~~hit~ in *Dive into the Depths*, you may receive or discover an opportunity without sending a \`.opportunity \`.
Then pick one.
• Understand or Prepare: Take +1 momentum (send \`.momentum+\`).
• Act Now: You and any allies can make a move (not a progress move) that directly uses this opportunity. When you do, add +1 and gain +1 momentum (send \`.momentum+\`) on success.
`,

    results: [],
  },
  {
    type: "DELVE MOVES",
    name: "REVEAL A DANGER",
    aliases: [],
    fakeAliases: ["danger"],
    description: `When faced with a risky situation in a site, please describe the hazard or send \`.danger\`.
`,
    results: [],
  },
  {
    type: "DELVE MOVES",
    name: "CHECK YOUR GEAR",
    aliases: [],
    description: `When you are checking to see if you have a specific utility item and have at least +1 supply, send \`.supply \`.
On ~hit~~hit~ you have. Get +1 momentum (send \`.momentum+\`).
On ~hit~~miss~ you have it, reduce supply by -1  (send \`.supply-\`). Get +1 momentum (send \`.momentum+\`).
On ~miss~~miss~ you don't have it, and the situation is getting more dangerous. Pay the Price - ${payPrice}
`,
    results: [],
  },
  {
    findFromCode: "localeYourObjectives",
    type: "DELVE MOVES",
    name: "LOCATE YOUR OBJECTIVE",
    aliases: [],
    description: `*Progress move*
When your site exploration comes to an end, press ~ptroll~ on the site tracker.
On ~hit~~hit~, you define a target and the situation is favorable for you. Pick one.
• Take another move (not progress) and add +1.
• Take +1 momentum (send \`.momentum+\`).
On ~hit~~miss~, you define a target, but you face an unexpected danger or complication. Imagine what you find (*Ask the Oracle* (send \`.ask\`) if you're not sure).
On ~miss~~miss~ your target becomes unattainable, you are misled as to the nature of your target, or you find that this site contains unexpected depths. If you continue your exploration, clear all but one completed progress and raise the site meter by one (if not already epic).
`,

    results: [
      `On ~miss~~miss~ your target becomes unattainable, you are misled as to the nature of your target, or you find that this site contains unexpected depths. If you continue your exploration, clear all but one completed progress and raise the site meter by one (if not already epic).`,
      `On ~hit~~miss~, you define a target, but you face an unexpected danger or complication. Imagine what you find (*Ask the Oracle* (send \`.ask\`) if you're not sure).`,
      `On ~hit~~hit~, you define a target and the situation is favorable for you. Pick one.
• Take another move (not progress) and add +1.
• Take +1 momentum (send \`.momentum+\`).`,
    ],
  },
  {
    type: "DELVE MOVES",
    name: "ESCAPE THE DEPTHS",
    aliases: [],
    fakeAliases: [],
    description: `When you leave the site, consider the situation and your approach. If you are...
• Looking for the fastest way out: send \`.cold \`.
• Protect yourself from the horrors of this place: send \`.heart \`.
• You make your way: send \`.iron \`.
• You calculate your steps or find an alternative way: send \`.wits \`.
• Stay away: send \`.shadow \`.
On ~hit~~hit~ you leave the site safely. Take +1 Momentum (send \`.momentum+\`).
On ~hit~~miss~ you will find a way out, but this place has a price tag. Pick one.
• Are you tired or injured: **Take damage**.
• The experience leaves you overwhelmed: **Get stressed**.
• You are delayed and it comes out sideways for you.
• You are leaving something important behind.
• You face a new complication when you leave the site.
• The denizen of the site is plotting revenge.
On ~miss~~miss~ a terrible threat or obstacle stands in your way. send \`.danger\`. If you survive, you can escape.

`,

    results: [],
  },
];

export const moves: IMove[] = [
  ...adventureMoves,
  ...battleMoves,
  ...relationMoves,
  ...aftermathMoves,
  ...fateMoves,
  ...delveMoves,
];
