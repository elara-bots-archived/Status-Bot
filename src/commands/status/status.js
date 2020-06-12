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
        let online = [], idle = [], dnd = [], offline = [], streaming = [];
        await for (let user of client.users.cache) {
             let object = await this.client.users.cache.get(user.userID);
            switch(object.presence.status){
                case "online":
                online.push(`${object.username}`)
                break;
                case "idle":
                idle.push(object.username)
                break;
                case "dnd":
                dnd.push(object.username)
                break;
                case 'offline':
                offline.push(object.username)
                break;
                case "streaming":
                streaming.push(object.username)
                break;
            }
        }
        return message.channel.send({
            embed : {
                color: 0x+message.member.displayColor,
                fields: [
              {
                name: `**Offline**`,
                value: offline.join('\n') || '-'
             },
            {
                name: `**Online**`,
                value: online.join('\n') || '-'
            },
            {
                name: `**Idle**`,
                value: idle.join('\n') || '-'
            },
            {
                name: `**Dnd**`,
                value: dnd.join('\n') || '-'
            },
            {
                name: `**Streaming**`,
                value: streaming.join('\n') || '-'
            }
        ]
        }
        })
    }
}
