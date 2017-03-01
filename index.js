var Discord = require("discord.js");
var aaronID = "215091619328819200";
var brettID = "180751833587908608";
var mybot = new Discord.Client();
var schedule = require("node-schedule");
var giphy = require("giphy-api")();
var fs = require("fs");
var commands = [
					[/giphy (.*)/i,processGiphy],	
					[/\/vote /,processVote],
					[/\d+\s*d\s*\d+/i,processDice],
					[/dat.*boi/i, processDatBoi],
					[/bailey/i, processBailey],
					[/suh/i, processSuh],
					[/🍠/i, processPotato],
					[/lunch.*time/i, processLunchTime],
					[/\(╯°□°\）╯︵ ┻━┻/,processTableFlip],
					[/parrotBomb/i,processParrotBomb],
					[/doritoB/i,processDoritoBag],
					[/hey.*fagit/i,processAaron],
					[/#wc/i,processWaterCloset],
					[/ogrebomb/i,processOgreBomb],
					[/crashPLZ/,processForceCrash],
					[/\/sob/i,processSob],
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
	if(k.user.id == brettID){
		if(k.guild.presences.get(brettID).status == "online"){
			var today = new Date();
			var diffMs = (today - lastLogin); // milliseconds between now & Christmas
			var diffDays = Math.floor(diffMs / 86400000); // days
			var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
			var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
			console.log(diffMs + " " + diffDays + " " + diffHrs + " " + diffMins);
			if(diffMins > 10){
				sendMessageToTheChat("@everyone make our fagit feel welcome :> " + k.guild.members.get(brettID));
			}
			lastLogin = new Date();
		}
	}

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

var job= schedule.scheduleJob(new Date().setHours(12,30,1), function(){ sendMessageToTheChat("WINDOWS + L AND GTFO"); });

function login(){
	getLunchTime();
	mybot.login("MjE1MTM4MjE0MjYyODY1OTIx.CpTKmw.1OwPygwhbXL8OA9lj7q92pjqu3A");
}

function getLunchTime(){
	var now = new Date();
	var curHour = now.getHours();
	var curMinute = now.getMinutes();
	var curSeconds = now.getSeconds();
	var lunchStart = new Date();
	lunchStart.setHours(12);
	lunchStart.setMinutes(30);
	lunchStart.setSeconds(0);
	var lunchEnd = new Date(lunchStart.toString());
	lunchEnd.setHours(lunchEnd.getHours() + 1);
	//console.log(lunchStart.getHours() + ":" + lunchStart.getMinutes() + ":" + lunchStart.getSeconds());
	if(now < lunchStart){
		return -1;
	}else if(now > lunchEnd){
		return 1;
	}else{   
		return 0;
	}
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

var cKickee = null;
var votesTowardsKick = [];
function processVote(regex, commandString, message){
	if(/kick /i.test(commandString)){
		if(cKickee == null){
			if(message.mentions[0] != null){
				if(message.mentions[1] == null){
					cKickee = message.mentions[0];
				}else{
					console.log('one person at a time please');
				}
			}else{
				console.log('you have to mention someone');
			}
		}else{
			console.log('someone is already getting kicked.');
		}
	}
	if(/\/vote yes/i.test(message.content) || /\/vote no/i.test(message.content)){
		if(cKickee != null){

		}else{
			console.log('no one is getting kicked currently');
		}
	}
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

function processDatBoi(regex, commandString, message){
    message.channel.sendTTSMessage("oh shit waddap");
}

function processBailey(regex, commandString, message){
	message.channel.sendTTSMessage("I'm Old Greg");
}

function processSuh(regex, commandString, message){
	var emojis = [":ok_hand:", ":sunglasses:",":v:"];
	var randEmoji = Math.floor(Math.random() * emojis.length );
	var messages = ["suhh dude",("suh dude" + emojis[randEmoji]), ( emojis[randEmoji] + "ahaha"), ":v:", ("suhhhhh :v: " + emojis[randEmoji]), ("asuhhh dude " + emojis[randEmoji])];
	var randMessage = Math.floor(Math.random() * messages.length);
	message.reply(messages[randMessage]);
}

function processPotato(regex, commandString, message){
	message.reply("OH GOD PLeASE NO #triggered");
}

function processLunchTime(regex, commandString, message){
	var lunchtimeInt = getLunchTime();
	var replyString = "";
	if(lunchtimeInt == -1){
		replyString = "Unfortunately it's not lunch time yet...";
	}else if(lunchtimeInt == 0){
		replyString = "Get the fuck away from your computer and get food.";
	}else{
		replyString = "You already had lunch, you cheeky bugger";
	}
	message.reply(replyString);
}

function processTableFlip(regex,commandString,message){
	message.channel.sendMessage('┬─┬﻿ ノ( ゜-゜ノ)');
}

function processOgreBomb(regex, commandString, message){
	var msg = "";
	var options = ["OgreZ:shake3 ","OgreZ:shake2 ", "OgreZ:spin ", "OgreZ:1spin ", "OgreZ:pulse ", "OgreZ:3spin ", "OgreZ:spin3 ", "OgreZ:spin2 ", "OgreZ:2spin ", "OgreZ:flap "];

	for(var i = 0;i<9;i++){
		for(var j = 0; j < 9; j ++ ){
			var randomChoice = Math.floor((Math.random() * options.length));
			msg += options[randomChoice];
		}
		msg += "\n"
	}
	message.channel.sendMessage(msg);
	//message.channel.sendMessage("OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:spin3 OgreZ:spin3 OgreZ:spin3 OgreZ:shake OgreZ:3spin OgreZ:3spin OgreZ:3spin OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:spin3 OgreZ:spin2 OgreZ:spin2 OgreZ:shake2 OgreZ:2spin OgreZ:2spin OgreZ:3spin OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:2spin OgreZ:spin OgreZ:shake3 OgreZ:shake3 OgreZ:shake3 OgreZ:1spin OgreZ:spin2 OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:2spin OgreZ:spin OgreZ:shake3 OgreZ:pulse OgreZ:shake3 OgreZ:1spin OgreZ:spin2 OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:2spin OgreZ:spin OgreZ:shake3 OgreZ:shake3 OgreZ:shake3 OgreZ:1spin OgreZ:spin2 OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:spin3 OgreZ:spin2 OgreZ:spin2 OgreZ:shake2 OgreZ:2spin OgreZ:2spin OgreZ:3spin OgreZ:pulse \n"+
	//							"OgreZ:pulse OgreZ:spin3 OgreZ:spin3 OgreZ:spin3 OgreZ:shake OgreZ:3spin OgreZ:3spin OgreZ:3spin OgreZ:pulse\n"+
	//							"OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse OgreZ:pulse");
}
function processForceCrash(regex, commandString, message){
	message.channel.sendMessage("Yes Sir, Immediately Sir.").then(message => process.exit(420));
}

function processSob(regex, commandString, message){
	message.delete().then(msg => message.channel.sendMessage("Oh great, you made " + message.author + " cry. BibleThump You're basically satan :downfrance: ") );
	
}
function processSong(regex, commandString, message){
	
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

function processDoritoBag(regex, commandString, message){
	message.delete(message);
	message.channel.sendMessage('▼ ◄ ▲ ► ▼ ▲ ► ▼ ◄ ▲ ▼ ▼ ◄▼ ◄ ▲ ► ▼ ◄ ▲ ► ▼ \n Sorry, ' + message.author + ' dropped their bag of Doritos® brand chips\n ▲ ► ▼ ◄ ▲ ► ▼ ◄ ▲ ▼ ◄ ▲ ► ▼ ◄ ▲ ► ▼ ◄ ▲ ► ▼ ▼ ◄ ▲ ► ▼ ◄▼ ▼ ',function(error,message){
		console.log(error);
	});
}

function processAaron(regex, commandString, message){
	message.channel.sendMessage('I\'m not Aaron EleGiggle');
}

function processWaterCloset(regex, commandString, message){
	var handsCleaned = false;
	var cleanHands = [/clean/i,/yes/i,/true/i,/wow/i];
	for(var i = 0; i < cleanHands.length;i++){
		if (cleanHands[i].test(commandString)){
			i=cleanHands.length;
			handsCleaned = true;
		}
	}
	fs.writeFile("test.txt", (new Date().toString() + " : " + handsCleaned + '\n'), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}

function sendMessageToTheChat(messageToSend){
	mybot.channels.forEach(function(channel){
		if(channel.name == "The Chat" || channel.name == "general"){
			channel.sendMessage(messageToSend);
		}
	});
}

// VOTE KICK COMMAND
// REMIND ME COMMAND
// CLOCK IN COMMAND
