require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');
const bot = new Bot(process.env.TOKEN_BOT);
bot.use(hydrate());
//
bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Запуск бота',
  },
  {
    command: 'menu',
    description: 'Выбрать меню',
  },
]);
//
const menuKeyBoard = new InlineKeyboard()
  .text('Check status', 'order-status')
  .text('Go to support', 'support');
const backKeyBoard = new InlineKeyboard().text('< Back to menu', 'back');
//
bot.command('menu', async (ctx) => {
  await ctx.reply('Choose menu point', {
    reply_markup: menuKeyBoard,
  });
});
bot.callbackQuery('order-status', async (ctx) => {
  await ctx.callbackQuery.message.editText('In delivery', {
    reply_markup: backKeyBoard,
  });
  await ctx.answerCallbackQuery();
});
bot.callbackQuery('support', async (ctx) => {
  await ctx.callbackQuery.message.editText('Write your question:', {
    reply_markup: backKeyBoard,
  });
  await ctx.answerCallbackQuery();
});
bot.callbackQuery('back', async (ctx) => {
  await ctx.callbackQuery.message.editText('Choose menu point', {
    reply_markup: menuKeyBoard,
  });
  await ctx.answerCallbackQuery();
});
//
bot.catch((err) => {
  const { ctx } = err;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const { error } = err;
  if (error instanceof GrammyError) {
    console.error('Error in request:', error.description);
  } else if (error instanceof HttpError) {
    console.error('Could not contact Telegram:', error);
  } else {
    console.error('Unknown error:', error);
  }
});
//
bot.start();
