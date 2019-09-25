import {config as dotenvInit} from 'dotenv';
import {Client, TextChannel} from "discord.js";

dotenvInit();

let rand = Math.random() * 6;
if (rand <= 1) {
    console.log('test');
}

let discordClient = new Client();
const muteTime = parseInt(process.env.MUTE_TIME) * 1000;

discordClient.on("message", async msg => {
    if (msg.content != '!рулетка') return;

    if (msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Сорян, бро, админы в игре не учавствуют.");
        return;
    }

    let rand = Math.random() * 6;
    if (rand <= 1) {
        msg.member.addRole(process.env.MUTE_ROLE);
        msg.channel.send("**ВЫСТРЕЛ КОЛЬТА В ТУПОЕ ЕБЛО <@" + msg.author.id + ">! ЭТОТ ПАРЕНЬ ЗНАЛ НА ЧТО ШЕЛ И ПОЛУЧИЛ СВОЙ МУТ НА 24 ЧАСА**");
        console.log('Added mute to: ' + msg.member.id);
        setTimeout(() => {
            msg.member.removeRole(process.env.MUTE_ROLE);
        }, muteTime);
    }
});
discordClient.login(process.env.DISCORD_BOT_TOKEN);