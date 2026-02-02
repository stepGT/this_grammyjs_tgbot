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

bot.on('message:voice', async (ctx) => {
  await ctx.reply('Получил сообщение с voice');
});

bot.on('::email', async (ctx) => {
  await ctx.reply('Ваше сообщение содержит email');
});

bot.on('message').filter(
  (ctx) => ctx.from.id === 255162448,
  async (ctx) => {
    await ctx.reply('Привет, админ!');
  },
);

bot.hears(/пипец/, async (ctx) => {
  await ctx.reply('Ругаемся?');
});

bot.hears(['пинг', 'еще пинг'], async (ctx) => {
  await ctx.reply('понг');
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
