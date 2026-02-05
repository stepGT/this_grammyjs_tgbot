require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } = require('grammy');
const bot = new Bot(process.env.TOKEN_BOT);
//
bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Запуск бота',
  },
  {
    command: 'share',
    description: 'Получить контакты',
  },
  {
    command: 'inline_keyboard',
    description: 'Инлайн кейборд',
  },
]);
//
bot.command('share', async (ctx) => {
  const moodKeyboard = new Keyboard()
    .requestLocation('Location')
    .row()
    .requestContact('Contact')
    .row()
    .requestPoll('Poll')
    .placeholder('Data')
    .resized();
  await ctx.reply('How are u?', {
    reply_markup: moodKeyboard,
  });
});

bot.command('inline_keyboard', async (ctx) => {
  const inlineKeyboard = new InlineKeyboard().url('Go to channel', 'https://t.me/pomazkovjs');
  await ctx.reply('Press button', {
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery(/button-[1-3]/, async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(`You choose button: ${ctx.callbackQuery.data}`);
});

// bot.on('callback_query:data', async (ctx) => {
//   await ctx.answerCallbackQuery();
//   await ctx.reply(`You choose button: ${ctx.callbackQuery.data}`);
// });

bot.on(':contact', async (ctx) => {
  await ctx.reply('Thx for contact!');
});

bot.hears('Okey', async (ctx) => {
  await ctx.reply('Its Okey!!', {
    reply_markup: { remove_keyboard: true },
  });
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
