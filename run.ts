import {config as dotenvInit} from 'dotenv';
import {Barrel} from "./src/Barrel";
import {Bot} from "./src/Bot";

dotenvInit();

const muteTime = parseInt(process.env.MUTE_TIME) * 1000;
const barrel = new Barrel();
const bot = new Bot(barrel, muteTime);

bot.connect(process.env.DISCORD_BOT_TOKEN);