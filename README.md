# Welcome to the Status Bot repository


- Alrighty with the welcome out of the way, lets get started.

# Discord Notice

In order for this to work you WILL need to enable these
![img](https://i.imgur.com/GWXtIOW.png)

On the Discord Developers page for your bot.


# Getting started


> ⚠ You'll need nodejs v12+ to run this code, due to discord.js-v12



- 1. Download the bot or use `git clone https://github.com/elara-bots/Status-Bot`
- 2. Once you got that done open either `git bash` or `command prompt` in the folder and do `npm install` and wait until it's finished.
- 3. Go to `index.js` and put in the required information.
```js
    owners: [] // Your owner ID, example: owners: ["123456789"]
    prefix: "?" // Your bot's prefix, example: prefix: "?" // default prefix is "?"
    token: "" // Your bot's token, you get this from the Discord Developers page, if you're unsure where to get it do a quick google to figure it out.
    watch: [] // This is an array-object for which users to watch by the bot and announce when they go offline/online
    // Example: [add("USERID", "WEBHOOK_URL", "GUILD_ID", {role: "ROLE_ID", enabled: true})] // note: the role is optional.. 
    // Why use webhooks? 
    // Webhooks allow you to mention the role without needing it mentionable in the server settings. 🙂
    presence: { // optional
        status: "", // Types: online, idle, dnd, invisible
        name: "", // Whatever you want the bot to say it's playing.
        type: "", // Types: PLAYING, LISTENING, STREAMING, WATCHING
        url: "" // only needed for the streaming playing status.
    }
```


# Extra Information
This repository uses: [great-commando](https://github.com/elara-bots/great-commando/tree/v12) [v12 branch].. if you have any issues with the `great-commando` package open an issue in that repository, include the branch you're using.


