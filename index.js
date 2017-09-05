var Discord = require("discord.js");
var aaronID = "215091619328819200";
var brettID = "180751833587908608";
var mybot = new Discord.Client();
var giphy = require("giphy-api")();
const ytdl = require("ytdl-core");
var fs = require("fs");
var commands = [
					[/giphy (.*)/i,processGiphy],
					[/play/,processPlay],
					[/\d+\s*d\s*\d+/i,processDice],
					[/suh/i, processSuh],
					[/\(╯°□°\）╯︵ ┻━┻/,processTableFlip],
					[/parrotBomb/i,processParrotBomb],
					[/crashPLZ/,processForceCrash],
					[/A+N+T+I+\b/,processAchuuu],
			   ]; 
mybot.on("disconnected", () => {
	//alert the console
	console.log("Disconnected Q_Q");
}); 

mybot.on("error",function(err){
	console.log(err);
});
var lastLogin = new Date();
mybot.on("presenceUpdate",function(k){
	console.log("IT HAPPENED");
});
mybot.on("ready",() =>{
	mybot.channels.forEach(function(channel){
		if(channel.name == "The Chat" || channel.name == "bottesting"){
			var argvs = "";
			var counter = 0;
			process.argv.forEach(function (val, index, array) {
				if (index > 1){
					argvs += ' ' + val;
				}
 				//argvs += (index + ': ' + val);
			});
			channel.sendMessage("Testification");
			channel.sendMessage("Back, bitches 4Head \n Commit Message: " + argvs);		
		}
	});
	console.log("Bot Running Fully");
});

mybot.on("message", function(message) {
	if(!message["author"]["bot"]){
		commands.forEach(function(command){
			if (command[0].test(message.content)){
				command[1](command[0], message.content, message);
			}
		});
	}
});

login();

function login(){
	mybot.login("MzU0NjQwOTYyMjg0NDIxMTIx.DJBMuw.0DzjWNoM76RM8i0oh-y7N5cVlHw");
}

function processGiphy(regex, commandString, message){
	console.log("giphy message");
	giphy.search(regex.exec(message.content)[1], function(err,res){
		if(err){
			mybot.reply(message, "I couldn't find a gif you twat");
		}else{
			if(res["pagination"]["count"] > 0){
				var url = res["data"][Math.floor((Math.random() * res["pagination"]["count"]))]["url"];
				message.reply(url);
			}else{
				message.reply("I Can't Find Shit. ¯\\_(ツ)_/¯ \n https://giphy.com/gifs/mel-brooks-spaceballs-IHOOMIiw5v9VS ");
			}
		}
	});
}
function processPlay(regex, commandString, message){
	// Play streams using ytdl-core
	const streamOptions = { seek: 0, volume: 1 };
	console.log(mybot.manager);
	const broadcast = mybot.manager.client.createVoiceBroadcast();

	voiceChannel.join()
	  .then(connection => {
    	const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
	    broadcast.playStream(stream);
	    const dispatcher = connection.playBroadcast(broadcast);
  	}).catch(console.error);
}
function processDice(regex, commandString, message){
	var result = regex.exec(commandString);
	var numDice = /\d+/.exec(result);
	var dieSize = /\d+/.exec(/d\s*\d+/i.exec(result));
	var reply = "Rolls: \n";
	for(var i=0;i<numDice;i++){
		reply += ("[" + Math.floor((Math.random() * dieSize) + 1) + "] \n");
	}
	message.reply(reply);
}

function processSuh(regex, commandString, message){
	var emojis = [":ok_hand:", ":sunglasses:",":v:"];
	var randEmoji = Math.floor(Math.random() * emojis.length );
	var messages = ["suhh dude",("suh dude" + emojis[randEmoji]), ( emojis[randEmoji] + "ahaha"), ":v:", ("suhhhhh :v: " + emojis[randEmoji]), ("asuhhh dude " + emojis[randEmoji])];
	var randMessage = Math.floor(Math.random() * messages.length);
	message.reply(messages[randMessage]);
}

function processTableFlip(regex,commandString,message){
	message.channel.sendMessage('┬─┬﻿ ノ( ゜-゜ノ)');
}

function processForceCrash(regex, commandString, message){
	message.channel.sendMessage("Yes Sir, Immediately Sir.").then(message => process.exit(420));
}

function processAchuuu(regex, commandString, message){
	var emotes = ["Chuuu:1spin","Chuuu:2spin","Chuuu:3spin","Chuuu:spin","Chuuu:spin2","Chuuu:spin3"];
	var reply = "";
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 10; j++){
			var emote = emotes[Math.floor((Math.random() * 6))];
			reply += emote + " ";
		}
		reply += "\n"
	}
	message.channel.sendMessage(reply);
}

function processParrotBomb(regex, commandString, message){
	var ret = "";
	var randomStartNumber = Math.floor((Math.random() * 2));
	var parrotOne = "";
	var parrotTwo = "";
	if(randomStartNumber == 1){
		parrotOne = "500Parrot ";
		parrotTwo = "RareParrot ";
	}else{
		parrotTwo = "500Parrot ";
		parrotOne = "RareParrot ";
	}
	var rarestParrot = Math.floor((Math.random() * 50000));
	var curEmote = 0;
	for(var i = 0; i < 5; i++){
		for(var j = 0; j < 10; j++){
			if(curEmote == rarestParrot){
				ret += "RarestParrot ";
			}else{
				if(curEmote % 2 == 0){
					if(i % 2 == 0){
						ret += parrotOne;	
					}else{
						ret += parrotTwo;
					}
				}else{
					if(i % 2 == 0){
						ret += parrotTwo;
					}else{
						ret += parrotOne;
					}
				}
			}
			curEmote ++;
		}
		ret += '\n';
	}
	message.channel.sendMessage(ret);
}

function sendMessageToTheChat(messageToSend){
	mybot.channels.forEach(function(channel){
		if(channel.name == "The Chat 2.0"){
			channel.sendMessage(messageToSend);
		}
	});
}

// VOTE KICK COMMAND
// REMIND ME COMMAND
// CLOCK IN COMMAND