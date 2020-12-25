export const rules = [
  {
    channel: "phases",
    messages: [
      `The whole game consists mainly of the following phases.

**1. Use a scene**. To start a story, find a channel from the **SCENES** category or create your own scene by sending something like \`.scene path to wild forest\` - where "path to wild forest"  is  a title of the scene. A scene usually describes one location. To end the scene use the command \`.end\`, after scene completion, the entire narration falls into the #chronic channel without game details (dice roll results, etc.). More details #1-use-a-scene 

**2. Describe character actions** or somehow reveal the character. For comments to other players use the *italicized* message. Such messages are not chronicled. To describe dialogs, use "character name:" or "me:" at the beginning of the message. More details #2-write-character-action 

**3. Make a move**. On the basis of  the description of the character's actions, select an appropriate move from **MOVES** on the left in the menu and send a command from the appropriate move. To quickly see the commands of all moves, send \`.moves\` More details #3-make-move 

**4. The world reacts**. On the basis of the result of the roll, describe the reaction of the world, the scene master or other players can help you. Ask **Oracle** (send \`.o\` or send \`.oracle\` ) when you have questions in solo or co-op play, or for game master's inspiration in guided play. More details #4-world-reacts 

*Repeat steps 2-4 as long as you wish*

**5. World is changing**.  When a scene ends (.end) or a vow is fulfilled (~ptroll - pressed on a vow tracker), make a special phase move - World is changing. More details #5-world-is-changing 







~stub~
    `,
      `**BOT COMMANDS**
To display a list of all commands, send \`.help\` or \`.? \`
To get detailed information about the team send 
\`<command> help\`
    or 
\`<command> ?\`  

Example: \`.heart ?\`
Call options: \`.help\` \`.? \` \`.help \`



~stub~`,
    ],
  },
  {
    channel: "1-use-a-scene",
    messages: [
      `You can play solo or CoOp. To find CoOp players use #rumors-and-legends 

**1. Use a scene**. To start a story, find a channel from the **SCENES** category or create your own scene by sending something like \`.scene path to wild forest\` - where "path to wild forest"  is  a title of the scene. A scene usually describes one location. To end the scene use the command \`.end\`. After scene completion, the entire narration falls into the #chronic channel without game details (dice roll results, etc.). After completing the scene, don't forget to mark the progress of the vows involved in the scene. 
  
At the beginning of a scene, send a link to some English rule and pin it (e.g. RULE: <somelink>). If you use this rule during the scene, send \`.rule\` it will give you +1 momentum. Feel free to correct other player's English. Use \`*italic*\` for it.
  
  
  
~stub~`,
      `**DELVE**
When you enter a dangerous and unknown territory *Discover a site* (send \`.site\`). A special Delve scene will appear and bot will advise you appropriate delve moves (#delve-moves ).
  
**Commands**
\`\`\`
Enter the site
Template 1: .site (it will show themes and domains lists)
Template 2: .site <rank> <theme> <domain> (where rank is: 1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic)
Example: ".site 2 corrupted cavern"
\`\`\`



**SCENES WITH DOOM POINTS**
You may create a scene with Doom Points. Spend Doom Points on your or your allies' problems. Spending Doom Points increases your Luck Points. By the end of the scene, you need to spend all the Doom Points, otherwise they will work at once at the end of the scene.

Example: \`.doom Bear hunting\`


~stub~`,
      `**Tips so that you don't get tired of playing:**
- It is better to write one big message than many small ones
- Better to write one message every day than 7 sentences on Sunday
- Usually, every message should be followed by a move or a question to the oracles. After that, it is necessary to interpret the message from the bot and describe it literally. Because all messages from the bot will be deleted in the chronicle.
- On ~hit~~hit~ the player describes everything himself, on ~hit~~miss~ or ~miss~~miss~ other players throw fun at him.
- When a player is mastering, his character is in a passive mode, i.e. does not take an active part, fights in the background, can help other characters.

**Commands**
\`\`\`
Start a new scene
Example: ".scene Bear hunting"
\`\`\`
\`\`\`
End of a scene
Example: .end
\`\`\`

~stub~`,
    ],
  },
  {
    channel: "2-write-character-action",
    messages: [
      `**2. Describe the actions of the character** or somehow reveal the character. For comments to other players use the \`*italicized*\` *message*. Such messages are not chronicled. To describe dialogs, use "character name:" or "me:" at the beginning of the message. Vows help us to describe and develop our characters.
      
~stub~`,
      ` **VOWS**
Vows are divided into types (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic) depending on how quickly they can be fulfilled and how much experience the character will receive for fulfilling the vow. At the end of the scene, if you have made progress in the vow, advance the progress by clicking on the symbol ~ptadd~  on the vow tracker. To fulfill the vow, click ~rolloracle~, more details in #fate-moves 

If you need ideas for your vows, use LORE category, #rumors-and-legends or ask oracle (send \`.o\`)

**Command**
\`\`\`
Add a vow
Parameters: rank (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic)
Template: .vow <rank> <vow description>
Example: .vow 4 Save the princess
\`\`\`


~stub~`,
      `**English word learning** 
You can create a special tracker to track words that you are learning. When you use a word from this tracker in the scene, mark progress (press ~ptadd~ ) . When you complete the tracker you get a Luck Point.
\`\`\`
Word tracker
Purpose: Add words to learn them. Increase progress when you use one of these words from the tracker. 
Parameters: level (1 - Hard, 2 - Dangerous, 3 - Terrible, 4 - Fatal, 5 - Epic), description. 
Example: .words 2 disobey crawl strike rift
\`\`\`
`,
    ],
  },
  {
    channel: "3-make-move",
    messages: [
      `**3. Make a move**. Based on the description of the character's actions, select the appropriate move from **RULES** on the left in the menu and send a command from the appropriate move. To quickly see the commands of all moves, send \`.moves\`

**MOVES**
Whenever you do something or encounter a situation, refer to \`.moves\` and follow its instructions to see what happens. When the name of a move is indicated in the rules or description of another move, it will be written in *italics*.

**MOMENTUM**
*BURNING MOMENTUM*
You may cancel any challenge dice which are less than your momentum value. If you do it, press :moment: on the move result.

*RESETTING MOMENTUM*
• The default reset is +2.
• One debility marked = your momentum reset is +1.
• More than one debility marked = your momentum reset is 0.

*SUFFERING NEGATIVE MOMENTUM*
When your momentum is less than 0, and it matches the value of your action die, you must cancel your action die.
When you suffer -momentum, and your momentum is already at -6, you will instead make the *Face a Setback* move.


~stub~`,
      `**ACTION ROLL**
When you send move commands, the bot makes an action roll. The result looks like this:
> **4** (**2** + 2) vs. **13**
> @Thorgan~hit~~hit~ Strong hit! 

Where **4** is the action rating: the result of the action die roll (d6 = **2**) + the modifiers from the assets (+2), and 1 and 3 are the results of the challenge dice rolls (2d10). 

The result is calculated as follows:
• ~hit~~hit~ Strong hit = Action score is greater than both of the challenge dice.
• ~hit~~miss~ Weak Hit = Action score is greater than one of the challenge dice.
• ~miss~~miss~ Miss = Action score is not greater than either of the challenge dice.

When you roll a match on your challenge dice... (e.g. **3** & **3**):
• Strong hit: The match represents a twist in the narrative, something interesting, or a new opportunity.
• Miss: The match represents a heightened negative outcome, a complication, or a new danger.
If you’re unsure what happens, *Ask the Oracle* (send \`.ask\`) .

~stub~`,
      `**CUSTOM MOVE**
If you don't know which move to make, come up with your own and throw a more suitable ATTRIBUTE (for example, \`.wits\`).
**Edge**: Quickness, agility, and prowess in ranged combat.
**Heart**: Courage, willpower, empathy, sociability, and loyalty.
**Iron**: Physical strength, endurance, aggressiveness, and prowess in close combat.
**Shadow**: Sneakiness, deceptiveness, and cunning.
**Wits**: Expertise, knowledge, and observation.



**COMPANIONS**
If you roll a 1 on your action die when using a companion ability, any negative outcome of the move should involve your companion.
When a companion suffers physical damage, make the Companion Endure Harm move.

~stub~
`,
      `**PvP**
If you are taking an action in opposition to an ally and want to resolve this conflict through a move, you can use this process:
• You both describe what you are doing to act against or resist your ally, and *Face Danger* (send \`.face\`) using an appropriate stat.
• If at least one of you scores a hit, determine who gains control of the outcome by comparing your level of success (strong hit > weak hit > miss). If you both have the same level of success, use your action score (you action die + stat + any adds) as a tie-breaker. If you are still tied, envision how your actions lead to a complete stalemate.
• Whoever gains control of the outcome decides which of the two moves should be resolved. The result of the other move is ignored.
• If neither of you scored a hit, resolve the miss for both moves. Each of you must Pay the Price.`,
    ],
  },
  {
    channel: "4-world-reacts",
    messages: [
      `**4. The world reacts**. On the basis of the result of the roll, describe the reaction of the world. The scene master or other players can help you. Ask **Oracle** (send \`.o\` or send \`.oracle\` ) when you have questions in solo or co-op play, or for game master's inspiration in a guided game. Read more #4-world-reacts 


**ORACLES**
When you do not know how the story should develop, *Ask the Oracle* (send \`.ask\`) or use a random oracle prompts (send \`.o\` or send \`.oracle\`). 

**Commands**
\`\`\`
Oracles
Template 1: .o (if you send without a parameter, it will display a list of all tables.)
Template 2: .o <table name> (it will show random result from the table)
Example: .o location
Aliases: .o .oracle
\`\`\`

\`\`\`
Add custom oracle
Template: .newo <name> <items> (items are separated by space or ";")
Example: .newo creatures classes fighter cleric mage thief
Aliases: .newo .neworacle .new-o .new-oracle
\`\`\`

\`\`\`
Roll from the list 
Purpose: Selects a random item from the table without adding a new oracle. Items are separated by space or ";"
Example: .tbl fighter cleric mage thief
Aliases: .tbl .table .tab
\`\`\`

\`\`\`
Decreasing roll
Purpose: Roll from the list with decreasing probability. The first element will appear more often than the last. Items are separated by space or ";"
Example: .tlog fighter cleric mage thief
Aliases: .tdesc .tlog
\`\`\`


~stub~`,

      `**ROLL CHANNEL**
In the roll channel, you can select a random message from the channel, so it is convenient to choose randomly from the options of several players. You can use \`||spoilers||\` (||spoilers||) for the effect of surprise

**Commands**
\`\`\`
Create roll channel 
Template: .roll-channel <channel name>
Example: .roll-channel enemy tactics
\`\`\`

\`\`\`
Clear roll channel 
Example: .clear
\`\`\`

\`\`\`
Select a custom message from the roll channel
Example: .roll
\`\`\`

\`\`\`
Select a denizen (for the Delve Denizens channel)
Example: .denizen
\`\`\`


~stub~`,
      `**PROGRESS TRACKERS**
These are similar to vows only do not give experience for fulfilling them. Most often they are needed to count the health of the enemy, the progress of the journey or some kind of long process.

**Moves of progress:** When you click on ~ptroll~ on the tracker, the bot will roll the challenge dice (2d10) and compare with the progress value.
You cannot use the momentum when you are making progress.

**Commands**
\`\`\`
Add tracker
Parameters: rank (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic), description.
Example: .tracker 2 Angry wolf pack
\`\`\`

~stub~`,
    ],
  },
  {
    channel: "5-world-is-changing",
    messages: [
      `When a scene ends (\`.end\`) or a vow is fulfilled (~ptroll~ - pressed on a vow tracker), make a special phase move - *World is changing*.

***World is changing***
- Think about the consequences of your scene and how those consequences might affect the rest of the world and the settlement.
- update LORE channels according to these effects (the step above)
- spread new rumors here #rumors-and-legends to involve other players


**Luck points**
Player gets luck point for LORE updating and scenes creating. A luck point can be used to change any challenge die (d10) into ~hit~. To do this, press ~luck~ on roll message.
Luck points are given automatically for the master's work (creating scenes, oracles, using rock tokens, using master unit progress counters, etc.) and manually by the server admin for helping the channel.

Luck points and LORE category have the goal of uniting players in a Co-op parties and making the players' solo stories more integral, affecting what is happening in one world.`,
    ],
  },
];
