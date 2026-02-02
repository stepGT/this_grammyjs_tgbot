require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');
const bot = new Bot(process.env.TOKEN_BOT);
//
bot.command('start', async (ctx) => {
  await ctx.reply('Hello i am bot!');
});
//
bot.on('message', async (ctx) => {
  await ctx.reply('I need to think about it.');
});

bot.catch((err) => {
  const { ctx } = err;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const { error } = err;
  if (e instanceof GrammyError) {
    console.error('Error in request:', error.description);
  } else if (error instanceof HttpError) {
    console.error('Could not contact Telegram:', error);
  } else {
    console.error('Unknown error:', error);
  }
});
//
bot.start();
