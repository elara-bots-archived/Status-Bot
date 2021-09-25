require("dotenv").config();

const Bot = require("./src/index"),
    { add } = require("./src/util/watching");


new Bot({
    owners: [], // YOUR USER ID IN HERE
    prefix: process.env.PREFIX || "?", // DEFAULT IS ?
    token: process.env.BOT_TOKEN, // YOUR BOT TOKEN  (DO NOT SHARE WITH ANYONE)
    // embed: {} // on: {}, off: {} // refer to the readme
    watch: [
        // The user/bot's ID, The full webhook URL, the guildID that you want the bot to watch for, the roleID and if you want it enabled.
        // add(`USERID`, `WEBHOOK_URL`, `GUILD_ID`, {role: "ROLE_ID", enabled: true}),
    ],
    presence: {
        status: "online",
        name: "Discord Bots",
        type: "WATCHING"
    }
}).start();
