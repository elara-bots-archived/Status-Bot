Getting Started
=========================

**1.** Download the files or use `git clone` 
Ex: `git clone https://github.com/Elara-Discord-Bots/Status-Bot.git`

**2.** Once you have the files downloaded open up a console in the bot folder and do `npm install` and let it run fully.

**3.** Fill out the options in the [`bot.js`](https://github.com/Elara-Discord-Bots/Status-Bot/blob/master/bot.js) file.

**Required Options**
========================


**token**: Your bot token, Get your bot token from the Discord Developers page: [Link](https://discordapp.com/developers/applications/me)

**owners**: The array of the bot owners/developers, how to get your user id: [Link](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

**watch**: The array of user/bot ids for the bot to watch for, how to get the user ids look at the link above.

**channel**: The channel the bot will post the updates to.

**guild**: The server that the bot will use to only get presence updates from, default is from the channel above. To get the server id look at the link above


**Optional Options**
========================


**role**: The role the bot will ping when the user/bot goes offline

**publicrole**: If false it will not allow others to use the `role` command, other wise it will only work for the bot developers.

**prefix**: The prefix for the bot, default is: `!`

**presence**: 
        
        -> status: The status like online, idle, dnd, invisible
        
        -> name: The name of what the bot is playing.
        
        -> type: The type of the playing status, like watching, listening, streaming, playing
        
        -> url: The twitch link for the playing status (only works for streaming)
        

**embed**:
    
    -> on: 
     
      -> thumbnail: Sets the thumbnail for the embed
      
      -> title: Sets the title for the embed
      
      -> color: Sets the color for the embed
      
      -> author:
                
                -> name: Sets the name for the author in the embed
                
                -> icon: Sets the icon for the author in the embed

 
 -> off: 
      
      -> thumbnail: Sets the thumbnail for the embed
      
      -> title: Sets the title for the embed
      
      -> color: Sets the color for the embed
      
      -> author:
                
                -> name: Sets the name for the author in the embed
                
                -> icon: Sets the icon for the author in the embed


**Embed Types:**

**%user%** - The user's username

**%tag** - The user's Username#tag

**%id%** - The user's ID

**%icon%** - The user's avatar icon url
