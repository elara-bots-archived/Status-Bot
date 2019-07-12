const {CommandoClient} = require('discord.js-commando'), {MessageEmbed} = require('discord.js'), {join} = require('path');
module.exports = class Bot extends CommandoClient{
    /**
     * @typedef {Object} Options
     * @property {string[]} [owners] - The list of the bot developers/owners 
     * @property {string[]} [watch] - User IDs from the bot to watcch
     * @property {string} [prefix] - The prefix for the bot
     * @property {object} [embed] - The embed format for the online and offline embed messages messages
     * @property {string} [role] - The role to ping if the user(s) go offline
     * @property {string} [guild] - The guild to look for the users in (Default is the channel update guild)
     * @property {string} [channel] - The channel to post updates to, 
     * @property {string} [token] - The token for the bot to connect to discord (DO NOT SHARE)
     * @property {object} [presence] - The presence/playing status for the bot
     * @property {boolean} [publicrole] - If the non bot owners should be able to assign the role to themselfs or others.
     * @property {boolean} [console] - If the presence updates should be posted in the console
	/**
	 * @param {Options} info - The setup 
	 */
    constructor(info){
        super({
            commandPrefix: info.prefix || "!",
            commandEditableDuration: 1000,
            disableEveryone: info.everyone || false,
            invite: info.invite || false,
            fetchAllMembers: info.fetch || true,
            owner: info.owners || [],
            shardCount: "auto"
        });
        this.watch = info.watch || [];
        if(!info.watch){
            console.log(`Please add users to the "watch" option.`);
            return process.exit(1)
        }
        this.publicrole = Boolean(info.publicrole || false);
        this.console = Boolean(info.console || false)
        this.role = info.role || "";
        if(info.embed){
            if(info.embed.off){
            let author = {name: "", icon: ""}, title, color, description, thumbnail;
            if(info.embed.off.author){
                if(info.embed.off.author.name){
                    author['name'] = info.embed.off.author.name
                }else{
                    author['name'] = ""
                }
                if(info.embed.off.author.icon){
                    author['icon'] = info.embed.off.author.icon
                }else{
                    author['icon'] = ''
                }
            }else{
                author['name'] = ""; 
                author['icon'] = "";
            }
            if(info.embed.off.thumbnail){
                thumbnail = info.embed.off.thumbnail
            }else{
                thumbnail = ''
            }
            if(info.embed.off.description){
                description = info.embed.off.description
            }else{
                description = ''
            }
            if(info.embed.off.color){
                color = info.embed.off.color
            }else{
                color = '#FF0000'
            }
            if(info.embed.off.title){
                title = info.embed.off.title
            }else{
                title = `%user% has gone offline!`
            }
            this.eoff = {
                title: title,
                color: color,
                description: description,
                thumbnail: thumbnail,
                author: {
                    name: author.name,
                    icon: author.icon
                }
            };
        }else{
            this.eoff = {
                title: `%user% has gone offline!`,
                color: `#FF0000`,
                description: "",
                author: {
                    name: "",
                    icon: ""
                }
            }
        }
        if(info.embed.on){
            let author = {name: "", icon: ""}, title, color, description, thumbnail;
            if(info.embed.on.author){
                if(info.embed.on.author.name){
                    author['name'] = info.embed.on.author.name
                }else{
                    author['name'] = ""
                }
                if(info.embed.on.author.icon){
                    author['icon'] = info.embed.on.author.icon
                }else{
                    author['icon'] = ''
                }
            }else{
                author['name'] = ""; 
                author['icon'] = "";
            }
            if(info.embed.on.thumbnail){
                thumbnail = info.embed.on.thumbnail
            }else{
                thumbnail = ''
            }
            if(info.embed.on.description){
                description = info.embed.on.description
            }else{
                description = ''
            }
            if(info.embed.on.color){
                color = info.embed.on.color
            }else{
                color = '#FF000'
            }
            if(info.embed.on.title){
                title = info.embed.on.title
            }else{
                title = `%user% has come back online!`
            }
            this.eon = {
                title: title,
                color: color,
                description: description,
                thumbnail: thumbnail,
                author: {
                    name: author.name,
                    icon: author.icon
                }
            };
        }else{
            this.eon = {
                title: `%user% has come back online!`,
                color: `#FF000`,
                description: "",
                thumbnail: "",
                author: {
                    name: "",
                    icon: ""
                }
            };
        }
        }else{
            this.eoff = {
                title: `%user% has gone offline!`,
                color: `#FF0000`,
                description: "",
                thumbnail: "",
                author: {
                    name: "",
                    icon: ""
                }
            };
            this.eon = {
                title: `%user% has come back online!`,
                color: `#FF000`,
                description: "",
                thumbnail: "",
                author: {
                    name: "",
                    icon: ""
                }
            };
        }
        this.guild = info.guild || "";
        this.channel = info.channel;
        if(!info.channel){
            console.log(`Please add a channel id to the "channel" option`);
            return process.exit(1)
        }
        this.config = {
            token: info.token || ""
        }
        this.registry.registerDefaultGroups().registerDefaultTypes().registerDefaultCommands({help: true, prefix: true, eval: true, ping: true, commandState: true, unknownCommand: false})
        .registerGroup('status', "Status Commands", true)
        .registerCommandsIn(join(__dirname, 'commands'))
        this.on("ready", async () => {
            if(info.channel){
                let c = this.channels.get(info.channel);
                if(!c){
                    console.log(`Channel: (${info.channel}) cannot be found! - Make sure that I am in that server!`);
                    return process.exit(1)
                }else{
                    let perms = ["SEND_MESSAGES", "READ_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "USE_EXTERNAL_EMOJIS"];
                    if(!c.permissionsFor(this.user.id).has(perms)){
                        console.log(`I don't have the required permissions in ${c.name} (Guild: ${c.guild.name} [${c.guild.id}])\nPermissions I need\n${perms.join('\n')}`);
                        return process.exit(1)
                    };
                }
            };
            if(info.guild){
                let guild = this.guilds.get(info.guild);
                if(!guild){
                    console.log(`Guild: (${info.guild}) cannot be found - Make sure that I am in that server!`);
                    return process.exit(1)
                }
            }else{
                this.guild = this.channels.get(info.channel).guild.id;
            }
            if(info.presence){
                this.user.setPresence({status: info.presence.status || "online", activity: {name: info.presence.name || "Users", type: info.presence.type || "WATCHING", url: info.presence.url || "https://twitch.tv/Discord"}})
            }else{
                this.user.setPresence({status: "dnd", activity: {name: `Status Bot`, type: 'WATCHING', url: "https://twitch.tv/Discord"}})
            }
            let getWatched = async function(client, watch){
                let users = [];
                await watch.forEach(async user => {
                    let u = await client.users.fetch(user);
                    users.push(u)
                });
                return users;
            }
            this.getWatched = await getWatched(this, this.watch);
            console.log(`${this.user.tag} is now ready in ${this.guilds.size} servers, watching ${this.watch.length} user${this.watch.length === 1 ? "": "s"}`)
            console.log(`Connected to server (${this.guilds.get(this.guild).name}) and channel (${this.channels.get(this.channel).name}) - Watching User${this.watch.length === 1 ? "" : "s"}: ${this.getWatched.map(c => c.tag).join(', ')}`)
        });
        this.on("commandError", (command, error, message, args, pattern) => console.log(`Command Error: ${command.name}\n${error.stack}`))
        this.on('shardReady', (id) => console.log(`Shard: ${id} is now ready!`));
        this.on('shardReconnecting', (id) => console.log(`Shard: ${id} is trying to reconnect`));
        this.on('shardDisconnected', (id) => console.log(`Shard: ${id} has been disconnected!`));
        this.on("shardResumed", (events, id) => console.log(`Shard: ${id} has resumed with [${events}] events!`));
        this.on('shardError', (error, id) => console.log(`Shard: ${id} Error: ${error.stack}`));
        this.on('presenceUpdate',  async (o, n) => {
            try{
            if(n.guild.id !== this.guild) return;
            if(o.status === n.status) return;
            if(n.guild.id === this.guild && this.watch.includes(n.user.id)) {
                if(n.status === "offline"){
                    if(this.role !== ""){
                        let off = this.eoff;
                        let e = new MessageEmbed()
                        .setTitle(off.title.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                        .setDescription(off.description.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                        .setAuthor(off.author.name.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.username, off.author.icon.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                        .setColor(off.color)
                        .setTimestamp()
                        .setThumbnail(off.thumbnail.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                        if(this.console){
                        console.log(`[Watch Tower] - User ${n.user.tag} (${n.user.id}) has gone offline!`)
                        }
                        return this.channels.get(this.channel).send(`<@&${this.role}> ${n.user.tag} has gone offline`, {embed: e})
                    }else{
                        let off = this.eoff;
                        let e = new MessageEmbed()
                        .setTitle(off.title.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                        .setDescription(off.description.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                        .setAuthor(off.author.name.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.username, off.author.icon.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                        .setColor(off.color)
                        .setTimestamp()
                        .setThumbnail(off.thumbnail.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                        if(this.console){
                            console.log(`[Watch Tower] - User ${n.user.tag} (${n.user.id}) has gone offline!`)
                        }
                        return this.channels.get(this.channel).send(e)
                    }
                }
                if(n.status === 'online' && o.status === 'offline'){
                    let on = this.eon;
                    let e = new MessageEmbed()
                    .setTitle(on.title.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                    .setDescription(on.description.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()))
                    .setAuthor(on.author.name.replace(/%user%/g, n.user.username).replace(/%status%/g, n.status).replace(/%mention%/g, n).replace(/%tag%/g, n.user.tag).replace(/%id%/g, n.user.id).replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.username, on.author.icon.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                    .setColor(on.color)
                    .setTimestamp()
                    .setThumbnail(on.thumbnail.replace(/%icon%/g, n.user.displayAvatarURL()) || n.user.displayAvatarURL())
                    if(this.console){
                    console.log(`[Watch Tower] - User ${n.user.tag} (${n.user.id}) has came back online!`)
                    }
                    return this.channels.get(this.channel).send(e)
                }
            }
        }catch(e){}
        })
        this.login(this.config.token).catch(err => {console.log(`Bot Login Error: ${err.stack}`); return process.exit(1)});
    }
}
