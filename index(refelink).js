const { Bot, session } = require('grammy');

const bot = new Bot('your bot token'); // Replace with your actual bot token

// Middleware to handle private messages and channel messages
bot.use(session());

// Handle the /start command
bot.command('reflink', async (ctx) => {
    if (ctx.chat.type === 'private') {
        // Handle private messagess
        await ctx.reply('Welcome to @betbot in private chat!');
    } else if (ctx.chat.type === 'channel' || ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        // Check user roles in channels
        const chatMember = await ctx.getChatMember(ctx.from.id);
        if (chatMember.status === 'creator') {
            // Admin can generate referral links
            const referralLink = `https://t.me/${CasinoBotName}?start=ref_${ctx.chat.id}`; // Replace with your actual link
            ctx.reply(`Your referral link: ${referralLink}`);
        } else {
            ctx.reply('Only admins can generate referral links in this channel.');
        }
    }
});

// Start the bot (using long polling)
bot.start();