const { 
    Telegraf, Markup 
} = require('telegraf');
require('dotenv').config();
const text = require('./const')

// 1

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'пользователь'} для дальнейшей работы набери: /service`));
bot.help((ctx) => ctx.reply(text.commands));
bot.command('service', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Образцы исков и заявлений</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Иск для взыскания алиментов', 'btn_1')], 
                [Markup.button.callback('Иск увелечения размеров алиментов', 'btn_2')], 
                [Markup.button.callback('Бездействие ЧСИ', 'btn_3')], 
                [Markup.button.callback('Привлечение к угол ответственности', 'btn_4')], 
                [Markup.button.callback('Отправить результат мне', 'btn_5')], 
                [Markup.button.callback('Все информация по алиментам', 'btn_6')]
            ]
        ))
    } catch (err) {
        console.log(err);
    }
})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            if (src !== false) {
                ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch(err) {
            console.log(err);
        }
    })
}
addActionBot('btn_1', './image/1.jpeg', text.text1)
addActionBot('btn_2', './image/2.jpeg', text.text2)
addActionBot('btn_3', './image/3.jpeg', text.text3)
addActionBot('btn_4', './image/4.jpeg', text.text4)
addActionBot('btn_5', false, text.text5)
addActionBot('btn_6', './image/1.jpeg', text.text6)

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));