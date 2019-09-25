import {Client} from "discord.js";
import {responseTo} from "./Chat";
import {Barrel} from "./Barrel";

export class Bot {
    private client = new Client();

    constructor(barrel: Barrel, muteTime: number) {
        this.client.on("message", async msg => {
            if (msg.content != '!рулетка') return;

            if (msg.member.hasPermission("ADMINISTRATOR")) {
                responseTo(msg, "Сорян, бро, админы в игре не учавствуют.", 5);
                return;
            }

            if (!barrel.canShoot(msg.author.id)) {
                responseTo(msg, "Не много ль ты рискуешь своей судьбой, ковбой? Будь осторожен, приходи в другое время.", 7);
                return;
            }

            barrel.shoot(msg.author.id);

            let rand = Math.random() * 6;
            if (rand <= 1) {
                msg.member.addRole(process.env.MUTE_ROLE);
                msg.channel.send("**ВЫСТРЕЛ КОЛЬТА В ТУПОЕ ЕБЛО <@" + msg.author.id + "> РАЗНОСИТ МОЗГ ПО ДРОБЯМ! ЭТОТ ПАРЕНЬ ЗНАЛ НА ЧТО ШЕЛ И ПОЛУЧИЛ СВОЙ МУТ НА 24 ЧАСА**");
                console.log('Added mute to: ' + msg.member.id);
                setTimeout(() => {
                    console.log('Removed mute from: ' + msg.member.id);
                    msg.member.removeRole(process.env.MUTE_ROLE);
                }, muteTime);
                return;
            } else {
                responseTo(msg, "Сегодня тебя пронесло, ковбой.", null, true);
            }
        });
    }

    public connect(token: string): void {
        this.client.login(token);
    }
}