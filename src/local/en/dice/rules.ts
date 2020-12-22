export const rules = {
  phases: [
    `The whole game consists mainly of the following phases.

**1. We use the scene**. To start the story, find a channel from the **SCENES** category or create your own scene by sending \`.scene <here insert the name of the scene>\`. A scene usually describes one location and after its completion, the entire narration falls into the Chronicle channel without game details (dice roll results, etc.). Promote the progress of the vows.

**2. We describe the actions of the character** or somehow reveal the character. For comments to other players use the *italicized* message. Such messages are not chronicled. To describe dialogs, use "character name:" or "me:" at the beginning of the message.

**3. We make a move**. Based on the description of the character's actions, select an appropriate move from **MOVES** on the left in the menu and send a command from the appropriate move. To quickly see the commands of all moves, send \`.moves\`

**4. The world reacts**. Based on the result of the roll, describe the reaction of the world, the scene master or other players can help you. Ask **Oracle** (send \`.oracle\`) when you have questions in solo or co-op play, or for game master's inspiration in guided play.

*Repeat steps 2-4 as long as you wish*

**5. End of scene**.  We end the scene with the command \`.end\`.  World is changing. 

The phases are described in more detail in other channels, but you can start playing without these details.
    
    
    
    
    
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
};

/*
--phases--

The whole game consists mainly of the following phases.

**1. We use the scene**. To start the story, find a channel from the **SCENES** category or create your own scene by sending `.scene <here insert the name of the scene>`. A scene usually describes one location and after its completion, the entire narration falls into the Chronicle channel without game details (dice roll results, etc.). Detailed instructions on the scene and description of the location can be found in the message attached to any scene. We repeat points 2-4 until we complete all our affairs in the location. We end the scene with the command `.end`. Promote the progress of the vows. More details #1-use-the-scene

**2. We describe the actions of the character** or somehow reveal the character. For comments to other players use the *italicized* message. Such messages are not chronicled. To describe dialogs, use "character name:" or "me:" at the beginning of the message. More details #2-describing-character-actions

**3. We make a move**. Based on the description of the character's actions, select the appropriate move from **MOVES** on the left in the menu and send a command from the appropriate move. To quickly see the commands of all moves, send `.moves` More # 3-make-move

**4. The world reacts**. Based on the result of the roll, describe the reaction of the world, the scene master or other players can help you. Ask **Oracle** (send `.oracle`) when you have questions in solo or co-op play, or for DM inspiration in guided play. Read more #4-world-responsive

The phases are described in more detail in other channels, but you can start playing without these details. An example of a game is in the channel # example-game



----

**BOT COMMANDS**
To display a list of all commands, send `.help` or `.? `
To get detailed information about the team send 
`<command> help`
 or 
`<command> ?`  

Example: `.heart ?`
Call options: `.?` `.help `



:stub:


---------
--1-use-a-scene--

**1. Use a scene**. To start the story, find a channel from the **SCENES** category or create your own scene by sending `.scene <here insert the name of the scene>`. A scene usually describes one location and after its completion, the entire narration falls into the Chronicle channel without game details (dice roll results, etc.). Detailed instructions on the scene and description of the location can be found in the message attached to any scene. We repeat points 2-4 until we complete all our affairs in the location. We end the scene with the command `.end`. Promote the progress of the vows. More details #1-use-the-scene


:stub:

-----

**SCENES**
A scene is a channel for a game, usually limited to one location or several small locations nearby. After the end of the scene, the information from it is moved to the #chronicle so you can play several scenes in parallel, the scenes will be recorded in turn so that there is no mess. After completing the scene, it is worth promoting the progress of the vows involved in the scene.

At the beginning of the scene, a rock counter appears. Spend doom tokens (secured) on problems for allies or the whole party, but not for your character personally. Spending a Doom token increases your luck points. By the end of the scene, you need to spend all the rock tokens (3 pieces), otherwise they will work at once at the end of the scene.

**Tips so that you don't get tired of playing:**
- It is better to write one big message than many small ones
- Better to write one message every day than 7 sentences on Sunday
- Ideally, every message should be followed by a move or a question to the oracles. After that, it is necessary to interpret the message from the bot and describe it literary. Because all messages from the bot will be deleted in the chronicle.
- On :hit::hit: the player describes everything himself, on :hit::miss: or :miss::miss: other players throw fun at him.
- When a player is mastering, his character is in a passive mode, i.e. does not take an active part, fights in the background, can help other characters.

**Commands**
```The beginning of the scene. Parameter <name>
Example ".scene Bear hunting"
Call options: .scene```
```Completion of the scene. Parameter <name>. You can rename the scene at the end if that's better for the chronicle
Example ".scene Hunt for Bjorn"
Call options: .end .the-end


:stub:

-----


**VOWS**
Vows are divided into types (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic) depending on how quickly they can be fulfilled and how much experience the character will receive for fulfilling the oath. At the end of the scene, if you have made progress in the oath, advance the progress by clicking on the symbol :ptadd: on the oath meter. To fulfill the oath, click: rolloracle :, more details in # moves-fate


**Commands**
```Add an oath. Parameters: level (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic), description.
Example: Oath 4 Save the princess

Challenge options: .vow
```

```Add a <formidable> oath 
Example: the formidable rescue the princess

Call options: .formidable 
The following commands are invoked by analogy:.troublesome, .dangerous, .formidable, .extreme, .epic
```


:stub:


-------------

**DELVE**
When you enter a dangerous and unknown territory * Enter the dungeon * (send `.delve`). In the dungeon, moves from # moves-dungeon are used automatically and manually

**Commands**
```Enter the dungeon 
Template: ".delve <rank> <topic> <domain>"
Example: ".delve 2 fortress with antiquities"
Call options: .delve```


:stub:


-----------

--2-describe-the-character-actions--
**2. We describe the actions of the character** or somehow reveal the character. For comments to other players use the *italicized* message. Such messages are not chronicled. To describe dialogs, use "character name:" or "me:" at the beginning of the message.

---------------
--3-make-move--

**3. We make a move**. Based on the description of the character's actions, select the appropriate move from **GOES** on the left in the menu and send a command from the appropriate move. To quickly see the commands of all moves, send `.moves`

**MOVES**
Whenever you do something or encounter a situation on a turn, refer to the turn and follow its instructions to see what happens. When the name of a move is indicated in the rules or description of another move, it will be written in italics.

**MOMENTUM**
*BURN MOMENTUM*
You can cancel any challenge die that is less than the value of your momentum. Then fold your momentum.

*RESET MOMENTUM*
• By default, reset momentum to +2.
• With one weakness noted = discard momentum to +1.
• If more than one weakness is noted = discard momentum to 0.

*CONSEQUENCES OF NEGATIVE MOMENTUM*
When your momentum are less than 0 and match the dice result
action, you cancel the action die and do not use it.
When you have to mark a momentum, and the momentum are already -6, instead make the move FACE DANGER.


:stub:

------------

**DAMAGE**
• If you are armed with a deadly weapon (sword, ax, spear or
bow), you deal 2 damage.
• If you are unarmed, armed with a simple or improvised
weapon (shield, stick, stone, staff, club), you deal 1 damage

:stub:

-------------

**ACTION ROLL**
When MOVES are made or STATUS checks are made, the bot makes an action roll. The result looks something like this:
> **4** (**2** + 2) vs. **13**
> @Thorgan: hit :: hit: Success!

Where **4** is the action rating: the result of the action die roll (d6 = **2**) + the modifiers from the assets (+2), and 1 and 3 are the results of the challenge dice rolls (2d10). 

The result is calculated as follows:
• Success! = action rating above each challenge bone
• Partial Success = Action rating above one challenge die
• Failure = Action rating no greater than any challenge dice

When you get a **double** on the dice (example **3** & **3**):
• Complete success: an unexpected turn in history, something interesting or a new opportunity.
• Failure: worse consequences, complication or new danger. If you are not sure what is going to happen Ask the Oracle.

:stub:

---------------------


**CUSTOM MOVE**
If you don't know which move to make, come up with your own and throw a more suitable ATTRIBUTE (for example, `.wits`).
**Edge**: quickness, dexterity, skill in handling ranged weapons.
**Heart**: courage, willpower, empathy, luck, ability to communicate.
**Iron**: physical strength and stamina, aggressiveness, melee skill.
**Shadow**: stealth, cunning, deception.
**Wits**: experience, knowledge, expertise, observation.

---------------------

**COMPANIONS**
On a roll of 1 on an action die, if you used an ability
companion, any negative consequences of the move apply to him.
When a companion takes physical damage, make a companion move
takes damage.


---------------------
--4-world-reacts--
**4. The world reacts**. Based on the result of the roll, describe the reaction of the world, the scene master or other players can help you. Ask **Oracle** (send `.oracle`) when you have questions in solo or co-op play, or for DM inspiration in guided play.


**ORACLES**
Ask the Oracle when you have questions in a solo or co-op game,
or to inspire the DM in guided play. When you do not know how history should develop, ask the oracles. Oracles are available in the "ORACLES" section and via bot commands.

**Commands**
```Oracles. The <table name> parameter. If you send without a parameter, it will display a list of all tables.
Example ".o location"
Call options: .o .oracle```

```Add your oracle First parameter is <oracle channel>. Other parameters: oracle items. Items are separated by space or ";"
Example .but creatures classes fighter cleric mage thief
Call options: .new oracle .but .add oracle .to .newo```

```Drop from the list of parameters Helps to select a random item from the table without adding a new parameter. Items are separated by space or ";"
Example .tbl fighter cleric mage thief
Call options: .tbl .table .tab```

```Throwing from the list in decreasing probability The first element of the table will be dropped rather than the last. Items are separated by space or ";"
Example .tbl fighter cleric mage thief
Call options: .table-descending .tblub .tabclub .tlog .tbllog 
```

------------

**PROGRESS TRACKERS**
These are similar to vows only do not give experience for fulfilling them. Most often they are needed to count the health of the enemy, the progress of the journey or some kind of long process or learn English words.

**Moves of progress:** When you click on :ptroll: on the tracker, the bot will roll the challenge dice (2d10) and compare with the progress value.
You cannot use the momentum when you are making progress.

**Commands**
```Add tracker: rank (1 - Troublesome, 2 - Dangerous, 3 - Formidable, 4 - Extreme, 5 - Epic), description.
Example: .tracker 2 Angry wolf pack

Aliases: .tracker```

```Add words to learn them. Increase progress when you use one of these words from the tracker. Parameters: level (1 - Hard, 2 - Dangerous, 3 - Terrible, 4 - Fatal, 5 - Epic), description. 
Example: .words 2 disobey crawl strike rift

Aliases: .words```

:stub:

-------------------

**ROLL CHANNEL**
In the roll channel, you can select a random message from the channel, so it is convenient to choose randomly from the options of several players. You can use || spoilers || for the effect of surprise


**Commands**
```Create roll channel 
Example: brutal enemy tactics
Call options: .roll-channel .rollcnl .rch```

```Clear roll channel 
Example. Clear
Call options: .clean```

```Select a custom message from the channel
Example: roll
Call options: .roll .br```


```Select a denizen (for the Delve Denizens channel)
Example: denizen
Call options: .denizen```



---legends---
Here, masters can post requests for quests in the form of announcement boards in settlements or in the form of legends passed from mouth to mouth (they say that mountain is the former forge of the god Tuldra, and his legendary hammer is still somewhere there).


 */
