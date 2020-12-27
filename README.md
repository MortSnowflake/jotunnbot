## Jötunn Bot - Ironsworn Text Open-Table Game Bot

# Quick start

1. Create a server from the template ([click here](https://discord.new/2Z4FsZmG73ub))
2. Upload [these emoji](/src/images/emoji/emoji.zip) (`Server Settings` > `Emoji` > click `Upload Emoji` > select all emojis > press `Open`)
3. Invite the bot to the server ([click here](https://discord.com/api/oauth2/authorize?client_id=729358913279099000&permissions=8&scope=bot))
4. Move Jötunn Bot to the top of the role list (`Server Settings` > `Roles`) ([example](/src/images/help/roles-list.png))
5. Open channel: #table
6. Send `.bootstrap all`
7. Send `.start`

## Installation details

- The `.bootstrap all` command deploys the content of the game. You can bootstrap something specific, for this you need to send `.bootstrap moves`, `.bootstrap rules` or `.bootstrap assets`
- The `.start` command launches the character creation dialog. The admin appears on the server before the bot that is why admin have to send this command. For those who join the server after configuring the bot, the character creation dialog will start automatically.

# Description

## Concept

The bot's goal is to simplify the game as much as possible in the following styles:

**Open table**. One world for all games on a discord server. The game is divided into scenes. Whether you play Co-Op or Solo, the actions of your characters in the scenes affect the overall world of the game that you share with other players. The actions of the characters reveal unknown areas of the shared game world (discord server). Solo/Co-Op Open Table mode allows you to play the text board game whenever you want, asynchronously, so that the presence of the master is not necessary for the game and does not stop the course of the company if the master disappears.

**Learn English**. The game gives bonuses for using words from the player's personal dictionary and for using certain grammar rules in the scene.

**Play Ironsworn**. Although Jottunbot mainly focuses on open table play, you can use it for your daily Ironsworn play with text or voice. Just ignore the open table and language learning homebrews (in the future I will add the ability to disable these homebrews in the bot settings).

**Mobile UX**. Easy to play from your smartphone.

## The bot can:

- ask the player questions about the character and generate the character sheet based on the result;
- hold a short training session with players;
- create default and custom assets and upgrade it for the player's experience points, gain experience points for completing vows;
- create scenes and add their summary to the chronicle channel ;
- make Ironsworn moves using char attributes;
- tell when player can burn momentum;
- roll dice if there is no suitable move or if you just need to;
- give tips during the game;
- use oracles and create new oracles (tables for generating a plot and other lore details);
- lead characters in the dungeon-scene according to the rules of Delve.

## Localization

If somebody wants to help with translation into other languages it would be great! For that open [these files](https://github.com/MortSnowflake/jotunnbot/tree/main/src/local) in a text editor and translate all phrases in "" and `` quotation marks.

Perhaps moves, assets and oracles are already publicly available in your language with open cc license, we can use them.

So far we are planning to translate into Spanish, Portuguese and Russian. Any help is welcome :)

## Feedback

To discuss the bot and also play with it on our [discord server](https://discord.gg/x9Evgh5NPt)

To report a bug you can use [issue tracker](https://github.com/MortSnowflake/jotunnbot/issues)

## Acknowledgments

Thanks to Shawn Tomkin for his awesome table-top role-playing game: [Ironsworn](https://www.ironswornrpg.com/)

Thanks to [rsek](https://github.com/rsek) for a very convenient data format: [Datasworn](https://github.com/rsek/datasworn)
