require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');
const bot = new Bot(process.env.TOKEN_BOT);
//
bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Запуск бота'
  },
  {
    command: 'hello',
    description: 'Получить приветствие'
  }
]);
//
bot.command(['sayHello', 'hello', 'say_hi'], async (ctx) => {
  await ctx.reply('Hello!');
});
//
bot.command('start', async (ctx) => {
  await ctx.reply('Hello i am bot!');
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
