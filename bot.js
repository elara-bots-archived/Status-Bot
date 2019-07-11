const Bot = require('./lib/index');
new Bot({
    token: "",
    watch: [],
    owners: [],
    channel: "",
    role: "",
    publicrole: true,
    presence: { // Leave blank if you want the default one.
        status: "", // online, idle, dnd, invisible
        name: "", // Whatever lol
        type: "", // WATCHING, PLAYING, STREAMING, LISTENING
        url: "" // URL for a twitch user
    },
    embed: { // Leave Blank if you want the default one. 
        on: {
            title: '',
            thumbnail: "",
            color: "",
            author: {
                name: "",
                icon: ""
            },
            // Types: %user% | %id% | %icon% | %mention% | %tag%
        },
        off: {
            title: '',
            thumbnail: "",
            color: "",
            author: {
                name: "",
                icon: ""
            },
            // Types: %user% | %id% | %icon% | %mention% | %tag%
        }
    }
});
