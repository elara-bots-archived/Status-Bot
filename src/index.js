// DO NOT CHANGE A DAMN THING IN THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING..

// I ain't responsible for idiots who fuck it up, if you fuck it up don't complain.. I warned you to not mess with this file.

const { CommandoClient } = require("great-commando"),
      Hook = require("discord-hook"),
      { join } = require("path"),
      getEmbed = (embed, user) => {
        function filterArgs(args){
            if(typeof args !== "string") return args;
            return args
            .replace(/%user%/gi, user.user.username)
            .replace(/%id%/gi, user.user.id)
            .replace(/%tag%/gi, user.user.tag)
            .replace(/%status%/gi, user.status)
            .replace(/%icon%/gi, user.user.displayAvatarURL({ dynamic: true }))
            .replace(/%mention%/gi, user.toString())
            .replace(/%timestamp%/gi, new Date());
        };
        return {
            title: filterArgs(embed.title || ""),
            description: filterArgs(embed.description || ""),
            thumbnail: filterArgs(embed.thumbnail || ""),
            timestamp: filterArgs(embed.timestamp || ""),
            color: embed.color,
            footer: {
                text: filterArgs(embed.footer.text || ""),
                icon_url: filterArgs(embed.footer.icon_url || "")
            },
            author: {
                name: filterArgs(embed.author.name || ""),
                icon_url: filterArgs(embed.author.icon_url || ""),
		url: filterArgs(embed.author.url || "")
            }
        }
      }, 
      log = (c) => console.log(`[${new Date().toISOString()}] - ${c}`),
      embed = (e, color = 0xFF000, on = false) => {
          let em = {
              title: e.title ? e.title : "",
              description: e.description ? e.description : `%mention% (\`%id%\`)`,
              color: e.color ? e.color : color,
              timestamp: "%timestamp%",
              thumbnail: e.thumbnail ? e.thumbnail : "%icon%",
              footer: {
                  text: e.footer ? e.footer.text ? e.footer.text : "" : "",
                  icon_url: e.footer ? e.footer.icon_url ? e.footer.icon_url : "" : ""
              },
              author: {
                  name: e.author ? e.author.name ? e.author.name : `%tag% ${on ? `has come back online!` : `went offline!`}` : `%tag% ${on ? `has come back online!` : `went offline!`}`,
                  icon_url: e.author ? e.author.icon_url ? e.author.icon_url : "%icon%" : "%icon%",
		  url: e.author ? e.author.url : ""
              }
          };
          return em;
      },
      defEmbed = {
          title: "",
          description: "",
          thumbnail: "",
          color: "",
          footer: {
              text: "",
              icon_url: ""
          },
          author: {
              name: "",
              icon_url: "",
	      url: ""
          },
          timestamp: "%timestamp%"
      }


module.exports = class StatusService extends CommandoClient {
    //----- Typings ----
    /**
     * 
     * @typedef {Object} AuthorOptions
     * @property {string} [name]
     * @property {string} [icon_url]
     * @property {string} [url]
     */
    /**
     * 
     * @typedef {Object} FooterOptions
     * @property {string} [text]
     * @property {string} [icon_url] 
     */
    /**
     * 
     * @typedef {Object} EmbedObject
     * @property {string} [title]
     * @property {string} [description]
     * @property {string} [thumbnail]
     * @property {AuthorOptions} [author]
     * @property {FooterOptions} [footer]
     * @property {string} [color]
     */
    /**
     * @typedef {Object} EmbedOptions
     * @property {EmbedObject} [on] - The online embed format
     * @property {EmbedObject} [off] - The offline embed format
     */
    
    /**
     * 
     * @typedef {Object} Presence
     * @property {string} status - Types: online, idle, dnd, invisible
     * @property {string} name - What the bot says it's playing, default "Discord Bots"
     * @property {string} type - Types: PLAYING, STREAMING, WATCHING, LISTENING
     * @property {string} url - Optional, for the streaming playing status. 
     */
     /**
     * @typedef {Object} Options
     * @property {string[]} [owners] - The list of the bot developers/owners 
     * @property {string[]} [watch] - The objects that contains the userIDs to watch.
     * @property {string} [prefix] - The prefix for the bot, default is ?
     * @property {EmbedOptions} [embed] - The embed format for the online and offline embed messages messages
     * @property {string} [token] - The token for the bot to connect to discord (DO NOT SHARE)
     * @property {Presence} [presence] - The presence/playing status for the bot
     * @property {string} [invite] - The support server invite.
     * @property {boolean} [console] - If the presence updates should be posted in the console
	/**
	 * @param {Options} info - The setup 
	 */
    //---- End of Typings -----
    
    
     constructor(info){
        super({
            commandPrefix: info.prefix || "?",
            invite: info.invite || "https://my.elara.services/support",
            owner: info.owners || [],
            shards: "auto",
            fetchAllMembers: true,
            disableMentions: "all",
            ws: {
                intents: [
                    "GUILDS",
                    "GUILD_MEMBERS",
                    "GUILD_MESSAGES",
                    "GUILD_PRESENCES",
                    "GUILD_MESSAGE_REACTIONS"
                ]
            }
        });
        this.watch = info.watch || [];
        this.console = Boolean(info.console || false);
        this.embed = {
            on: embed(info.embed ? info.embed.on : defEmbed, 0xFF000, true),
            off: embed(info.embed ? info.embed.off : defEmbed, 0xFF0000, false)
        }
        this.cache = []; // this is for ignoring bots/users for a short amount of time and resets after the bot restarts.
        this.on("ready", () => {
            log(`${this.user.tag} is now ready in ${this.guilds.cache.size} servers`);
            if(!Array.isArray(this.watch)){
                log(`Error: "watch" isn't an array!`);
                return process.exit(1);
            };
            if(!this.watch.length){
                log(`You have 0 people in the watch array`);
                return process.exit(1);
            };
            for (const w of this.watch){
                let user = this.users.cache.get(w.userID);
                if(!user){
                    log(`Unable to find ${w.userID} in my cache.`);
                };
                let g = this.guilds.cache.get(w.guildID);
                if(!g){
                    log(`Error: Server (${w.guildID}) I ain't in, so how am I supposed to track ${w.userID}'s activity?`);
                    return process.exit(1);
                }
            };
            if(info.presence){
                this.user.setPresence({
                    status: info.presence.status || "online", 
                    activity: {
                        name: info.presence.name || "Users", 
                        type: info.presence.type || "WATCHING", 
                        url: info.presence.url || "https://twitch.tv/Discord"
                    }
                })
            }else{
                this.user.setPresence({
                    status: "dnd", 
                    activity: {
                        name: `Discord Bots`, 
                        type: 'WATCHING', 
                        url: "https://twitch.tv/Discord"
                    }
                })
            }
        });
        this.on("commandError", (command, error) => log(`Command Error: ${command.name}\n${error.stack}`))
        this.on('shardReady', (id) => log(`Shard: ${id} is now ready!`));
        this.on('shardReconnecting', (id) => log(`Shard: ${id} is trying to reconnect`));
        this.on('shardDisconnected', (id) => log(`Shard: ${id} has been disconnected!`));
        this.on("shardResumed", (events, id) => log(`Shard: ${id} has resumed with [${events}] events!`));
        this.on('shardError', (error, id) => log(`Shard: ${id} Error: ${error.stack}`));
        this.on("presenceUpdate", async (o, n) => {
            if(!o || !n || !o.status || !n.status || o.status === n.status) return null;
            let find = this.watch.find(c => c.userID === n.user.id);
            if(!find || n.guild.id !== find.guildID || !find.webhook) return null;
            if(this.cache.includes(n.user.id)) return null;
            if(n.status === "offline"){
                let em = getEmbed(this.embed.off, n);
                if(!em) return null;
                let { author, title, description, timestamp, color, footer, thumbnail } = em;
                let h = new Hook(find.webhook)
                .embed({
                    author, title, description, timestamp, color, footer,
                    thumbnail: thumbnail ? { url: thumbnail } : undefined
                })
                .name(this.user.username)
                .avatar(this.user.displayAvatarURL({ format: "png", dynamic: true }))
                if(find.alert.enabled && find.alert.role) h.mention(`<@&${find.alert.role}>`);
                if(this.console) log(`${n.user.tag} (${n.user.id}) has gone offline`);
                h.send().catch(e => log(`[SEND_WEBHOOK_ERROR]: `, e));
            }else
            if(["online", "idle", "dnd"].includes(n.status) && o.status === "offline"){
                let em = getEmbed(this.embed.on, n);
                if(!em) return null;
                let { author, title, description, timestamp, color, footer, thumbnail } = em;
                let h = new Hook(find.webhook)
                .embed({
                    author, title, description, timestamp, color, footer,
                    thumbnail: thumbnail ? { url: thumbnail } : undefined
                })
                .name(this.user.username)
                .avatar(this.user.displayAvatarURL({ format: "png", dynamic: true }))
                h.send().catch(e => log(`[SEND_WEBHOOK_ERROR]: `, e));
                if(this.console) log(`${n.user.tag} (${n.user.id}) has come back online!`);
            }
        });

        this.start = () => {
            this.login(info.token).then(() => {
                log(`Connected to the Discord API`);
            }).catch((err) => {
                log(`Discord API login issue\n`, err.stack);
                return process.exit(1);
            })
        };
        this.registry
        .registerDefaultGroups()
        .registerDefaultTypes()
        .registerDefaultCommands({help: true, prefix: true, eval: true, ping: true, commandState: true, unknownCommand: false})
        .registerGroup('status', "Status Commands", true)
        .registerCommandsIn(join(__dirname, 'commands'))
    };
};
