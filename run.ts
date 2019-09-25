import {config as dotenvInit} from 'dotenv';
import {Client, TextChannel} from "discord.js";

dotenvInit();

let rand = Math.random() * 6;
if (rand <= 1) {
    console.log('test');
}

let discordClient = new Client();
const muteTime = parseInt(process.env.MUTE_TIME) * 1000;
const lastRuns = new Map<string, number>();

function couldRun(member_id): boolean {
    if (!lastRuns.has(member_id)) {
        return true;
    }

    let lastRunTime = lastRuns.get(member_id);
    return Date.now() - 84600 > lastRunTime;
}

discordClient.on("message", async msg => {
    if (msg.content != '!рулетка') return;

    // if (msg.member.hasPermission("ADMINISTRATOR")) {
    //     msg.channel.send("Сорян, бро, админы в игре не учавствуют.");
    //     return;
    // }

    if (!couldRun(msg.member.id)) {
        msg.channel.send("Не много ль ты рискуешь своей судьбой, ковбой? Будь осторожен, приходи в другое время.")
        return;
    }

    let rand = Math.random() * 6;
    if (rand <= 1) {
        msg.member.addRole(process.env.MUTE_ROLE);
        msg.channel.send("**ВЫСТРЕЛ КОЛЬТА В ТУПОЕ ЕБЛО <@" + msg.author.id + "> РАЗНОСИТ МОЗГ ПО ДРОБЯМ! ЭТОТ ПАРЕНЬ ЗНАЛ НА ЧТО ШЕЛ И ПОЛУЧИЛ СВОЙ МУТ НА 24 ЧАСА**");
        console.log('Added mute to: ' + msg.member.id);
        setTimeout(() => {
            msg.member.removeRole(process.env.MUTE_ROLE);
        }, muteTime);
    } else {
        msg.channel.send("Сегодня тебя пронесло, ковбой.");
    }
    msg.delete();
    lastRuns.set(msg.author.id, Date.now());
});
discordClient.login(process.env.DISCORD_BOT_TOKEN);