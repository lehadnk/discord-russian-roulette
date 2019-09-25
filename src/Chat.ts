import {Message} from "discord.js";

export function responseTo(msg: Message, text: string, lifespan: number = null, keepOriginal: boolean = false) {
    let responseText = "<@"+msg.author.id+"> "+text;
    let responseEvent = msg.channel.send(responseText);
    if (lifespan !== null) {
        responseEvent.then((m: Message) => {
            m.delete(lifespan * 1000);
        });
    }
    if (!keepOriginal) {
        msg.delete();
    }
}