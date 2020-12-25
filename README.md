## Jötunn Bot - Ironsworn Open-table Bot

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
