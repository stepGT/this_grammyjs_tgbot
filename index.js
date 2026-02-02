require('dotenv').config();
const { Bot } = require('grammy');
const bot = new Bot(process.env.TOKEN_BOT);
//
bot.command('start', async (ctx) => {
  await ctx.reply('Hello i am bot!');
});
//
bot.on('message', async (ctx) => {
  await ctx.reply('I need to think about it.');
});
//
bot.start();
