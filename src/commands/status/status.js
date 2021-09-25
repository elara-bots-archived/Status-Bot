const {Command} = require('great-commando'), 
      {MessageEmbed} = require('discord.js');
module.exports = class Status extends Command {
    constructor(client){
        super(client, {
            name: "status",
            memberName: "status",
            aliases: [],
            group: "status",
            description: `Shows the status of the people in the 'watch' array`,
            examples: [`${client.commandPrefix}status`]
        })
    };
    async run(message){
          message.channel.startTyping();
        let online = [], 
            idle = [], 
            dnd = [], 
            offline = [];
        
        for (const user of this.client.watch){
            let object = this.client.users.cache.get(user.userID);
            switch(object.presence.status){
                case "online": online.push(object.username); break;
                case "idle": idle.push(object.username); break;
                case "dnd": dnd.push(object.username); break;
                case "offline": offline.push(object.username); break;
            }
        };
        let e = new MessageEmbed()
        .setTitle(`Status`)
        .setColor(message.member.displayColor).setTimestamp()
        if(offline.length !== 0) e.addField(`**Offline**`, offline.join('\n'))
        if(online.length !== 0) e.addField(`Online`, online.join('\n'))
        if(idle.length !== 0) e.addField(`Idle`, idle.join('\n'));
        if(dnd.length !== 0) e.addField(`Dnd`, dnd.join('\n'))
        return message.channel.send(e).catch(() => null)
          message.channel.stopTyping();
    },
};
