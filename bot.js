require('dotenv').config();
const {Client} = require('discord.js');
const client = new Client(
  {partials: ['MESSAGE','REACTION']}
);
const PREFIX = '$';

client.on('ready',()=>{
  console.log(`${client.user.tag} has logged in`)
})

client.on('message',async (message)=>{
  if(message.author.bot) return
  //console.log(`[${message.author.tag}]:${message.content}`)
  //if(message.content=='Hello'){
    //message.channel.send('Hello bruda');}
  if(message.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args]=message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    //  console.log(CMD_NAME);
    //  console.log(args);
    if(CMD_NAME === 'kick'){
      if(!message.member.hasPermission('KICK_Members'))
        return message.reply('Bruda above my paygrade');
      if(args.length === 0)
        return message.reply('Provide ID');
      const member = message.guild.members.cache.get(args[0]);
      if(member){
        member
          .kick()
          .then((member)=>message.channel.send(`${member} not a bruda anymore`))
          .catch((err)=> message.channel.send('Cant kick the boss'))
      }else{
        message.reply('Bruda doesnt exist fam');
      }
    }
    else if(CMD_NAME==="ban"){
      if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('NO Permission');
      if(args.length === 0)
          return message.reply('Provide ID');
      try{
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User Banned')

      }
      catch(err){
        console.log(err);
        message.channel.send('An error occured.')
      }

    }
  }
});

client.on('messageReactionAdd', (reaction,user)=>{
  //console.log('hello');
  const {name} = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id)
  if(reaction.message.id === "869126877787336756"){
    switch(name){
      case '🔒':
        member.roles.add('868896658799349861');
        break;
      case '⬜':
        member.roles.add('869258368622141441');
        break;
      case '👶':
        member.roles.add('869125360267173900');
        break;
    }
  }
})

client.on('messageReactionRemove', (reaction,user)=>{
//  console.log('hello');
  const {name} = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id)
  if(reaction.message.id === "869126877787336756"){
    switch(name){
      case '🔒':
        member.roles.remove('868896658799349861');
        break;
      case '⬜':
        member.roles.remove('869258368622141441');
        break;
      case '👶':
        member.roles.remove('869125360267173900');
        break;
    }
  }
})


client.login(process.env.DISCORDJS_BOT_TOKEN);
