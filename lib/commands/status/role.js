const {Command} = require('discord.js-commando'), {MessageEmbed} = require('discord.js');
module.exports = class Status extends Command{
    constructor(client){
        super(client, {
            name: "role",
            memberName: "role",
            aliases: [`gimmerole`, `giverole`, `removerole`, `role-`, `role+`],
            group: "status",
            description: `Gives/Removes you from the status ping role, [If Manage Roles can assign the role to others]`,
            examples: [`${client.commandPrefix}role`],
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What member?",
                    type: "member",
                    default: message => message.member
                }
            ]
        })
    };
    async run(message, {member}){
        let e = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor(message.member.displayColor)
        .setTitle(`Loading..`)
        let msg = await message.channel.send(e)
        let role = await message.guild.roles.get(this.client.role);
        if(!role) {
            e.setTitle(`INFO`).setDescription(`I cannot find the Status Ping role in this server!`).setColor(`#FF0000`);
            return msg.edit(e)
        }
        if(message.member.id === member.id){
            if(this.client.publicrole){
                if(message.member.roles.has(role.id)){
                    e.setTitle(`Success`).setDescription(`You will not be notified when a user/bot goes offline!`)
                    message.member.roles.remove(role.id).catch(err => {
                        e.setTitle(`ERROR`).setDescription(err)
                    });
                    return msg.edit(e)
                }else{
                    e.setTitle(`Success`).setDescription(`You will now be notified when a user/bot goes offline!`)
                    message.member.roles.add(role.id).catch(err => {
                        e.setTitle(`ERROR`).setDescription(err)
                    });
                    return msg.edit(e)
                }
            }else{
                if(this.client.isOwner(message.author.id)){
                    if(message.member.roles.has(role.id)){
                        e.setTitle(`Success`).setDescription(`You will not be notified when a user/bot goes offline!`)
                        message.member.roles.remove(role.id).catch(err => {
                            e.setTitle(`ERROR`).setDescription(err)
                        });
                        return msg.edit(e)
                    }else{
                        e.setTitle(`Success`).setDescription(`You will now be notified when a user/bot goes offline!`)
                        message.member.roles.add(role.id).catch(err => {
                            e.setTitle(`ERROR`).setDescription(err)
                        });
                        return msg.edit(e)
                    }
                }else{
                    e.setTitle(`INFO`).setDescription(`The status ping role isn't public, it can only be assigned by the bot owners/developers!`).setColor(`#FF0000`)
                    return msg.edit(e)
                }
            }
        }else{
            if(message.member.hasPermission("MANAGE_GUILD")){
                if(member.roles.has(role.id)){
                    e.setTitle(`Success`).setDescription(`${member} will not be notified when a user/bot goes offline!`)
                    member.roles.remove(role.id).catch(err => {
                        e.setTitle(`ERROR`).setDescription(err)
                    });
                    return msg.edit(e)
                }else{
                    e.setTitle(`Success`).setDescription(`${member} will now be notified when a user/bot goes offline!`)
                    member.roles.add(role.id).catch(err => {
                        e.setTitle(`ERROR`).setDescription(err)
                    });
                    return msg.edit(e)
                }
            }else{
                e.setDescription(`You need to have \`Manage Server\` permission to assign the status ping role to others!`).setTitle(`INFO`).setColor(`#FF0000`)
                return msg.edit(e)
            }
        }
    }
}