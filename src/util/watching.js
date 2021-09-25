

// DO NOT CHANGE A DAMN THING IN THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING..

// I ain't responsible for idiots who fuck it up, if you fuck it up don't complain.. I warned you to not mess with this file.


const list = [];

module.exports = {
    add: (userID, webhook, guildID, alert = { role: "", enabled: false }) => {
        let obj = { userID, webhook, guildID, alert };
        list.push(obj);
        return obj
    },
    list
};
