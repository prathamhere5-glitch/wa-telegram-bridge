require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Get token from environment variable or use hardcoded value
const TELEGRAM_TOKEN = (process.env.TELEGRAM_TOKEN || '8111876690:AAH28e-37x48Q-NxrccgdOjkt9dfdwpqk0w').trim();
const TELEGRAM_CHAT_ID = (process.env.TELEGRAM_CHAT_ID || '6729390752').trim();

// Validate token format
if (!TELEGRAM_TOKEN || !TELEGRAM_TOKEN.includes(':')) {
    console.error('❌ ERROR: Invalid Telegram bot token format!');
    console.error('Please check your token at https://t.me/BotFather');
    process.exit(1);
}

console.log('🔧 Initializing Telegram Bot...');
console.log('📱 Bot Token:', TELEGRAM_TOKEN.substring(0, 15) + '...');

// Create bot with improved polling configuration
const bot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

// Handle polling errors with better error handling
bot.on('polling_error', (error) => {
    console.error('❌ Polling Error:', error.code, '-', error.message);
    
    if (error.code === 'ETELEGRAM' && error.message.includes('401')) {
        console.error('');
        console.error('🔴 AUTHENTICATION FAILED!');
        console.error('');
        console.error('Your bot token appears to be invalid or has been revoked.');
        console.error('');
        console.error('📝 Troubleshooting steps:');
        console.error('1. Go to https://t.me/BotFather on Telegram');
        console.error('2. Send /mybots');
        console.error('3. Select your bot: @wsmessengerbot');
        console.error('4. Click "API Token" to regenerate');
        console.error('5. Update the token in .env file');
        console.error('');
        console.error('💡 Note: If you recently created the bot, wait a few minutes and try again.');
        console.error('');
        
        // Stop polling to prevent infinite error loop
        bot.stopPolling();
        process.exit(1);
    }
});

// Bot state
let linkedAccounts = []; // Array of linked accounts (e.g., ['a', 'b'])
let isMessagingActive = false;
let messageDelay = 10; // Default delay in seconds
let scheduledTime = null;
const randomMessages = [
    'Hey there! 👋',
    'Automated ping from the bot! 🤖',
    'Random update: Stay connected! 🌟',
    'Bot is live and chatting! 💬'
]; // 4 random messages

// Function for mutual messaging loop (manual)
function mutualMessageLoop() {
    if (linkedAccounts.length < 2) return;
    const interval = setInterval(() => {
        if (!isMessagingActive) {
            clearInterval(interval);
            return;
        }
        for (let i = 0; i < linkedAccounts.length; i++) {
            const sender = linkedAccounts[i];
            const receiver = linkedAccounts[(i + 1) % linkedAccounts.length];
            const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            console.log(`🚀 Manual Send: From ${sender} to ${receiver}: "${message}" (Copy-paste into WhatsApp Web)`);
        }
    }, messageDelay * 1000);
}

// Main menu with inline keyboard (2 buttons per row, emojis)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = [
        [{ text: '▶️ Start', callback_data: 'start' }, { text: '📊 Status', callback_data: 'status' }],
        [{ text: '📋 List Linked Accounts', callback_data: 'list_accounts' }, { text: '➕ Add Accounts', callback_data: 'add_accounts' }],
        [{ text: '⏱️ Delay', callback_data: 'delay' }, { text: '📅 Schedule', callback_data: 'schedule' }],
        [{ text: '⏹️ Stop', callback_data: 'stop' }, { text: '👨‍💻 Developer', callback_data: 'developer' }]
    ];
    const replyMarkup = { inline_keyboard: keyboard };
    bot.sendMessage(chatId, '🤖 *WhatsApp Automation Bot* - Your sleek control panel! Choose an option below:', { reply_markup: replyMarkup, parse_mode: 'Markdown' })
        .then(() => {
            console.log('✅ /start command processed for chat:', chatId);
        })
        .catch((err) => {
            console.error('❌ Error sending message:', err.message);
        });
});

// Handle button callbacks
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'start') {
        if (linkedAccounts.length < 2) {
            bot.sendMessage(chatId, '❌ Oops! Link at least 2 WhatsApp accounts first. Use ➕ Add Accounts to get started. 💡');
        } else {
            isMessagingActive = true;
            mutualMessageLoop();
            bot.sendMessage(chatId, `✅ Manual messaging started! 🤩 Generating messages every ${messageDelay}s between ${linkedAccounts.join(', ')}. Check console for copy-paste instructions.`);
        }
    } else if (data === 'status') {
        const status = isMessagingActive ? '🟢 Active' : '🔴 Inactive';
        bot.sendMessage(chatId, `📊 Current Status: ${status}. ${isMessagingActive ? 'Messages are being generated! 🚀' : 'Ready to start? Click ▶️ Start.'}`);
    } else if (data === 'list_accounts') {
        const linked = linkedAccounts.length > 0 ? linkedAccounts.join(', ') : 'None yet';
        bot.sendMessage(chatId, `📋 Linked Accounts: ${linked}. ${linkedAccounts.length < 2 ? 'Add more with ➕ Add Accounts! 📱' : 'All set for mutual messaging! 🎉'}`);
    } else if (data === 'add_accounts') {
        const keyboard = [
            [{ text: '📱 Login via QR', callback_data: 'qr_login' }, { text: '🔗 Pairing Code', callback_data: 'pairing_login' }]
        ];
        const replyMarkup = { inline_keyboard: keyboard };
        bot.sendMessage(chatId, '➕ *Add Accounts* - Choose your login method:', { reply_markup: replyMarkup, parse_mode: 'Markdown' });
    } else if (data === 'qr_login') {
        const account = String.fromCharCode(97 + linkedAccounts.length); // 'a', 'b', etc.
        linkedAccounts.push(account);
        bot.sendMessage(chatId, `✅ Account ${account} added! 📱 Manually: Open https://web.whatsapp.com/ and scan the QR code to link. Then return here! 🔄`);
    } else if (data === 'pairing_login') {
        const account = String.fromCharCode(97 + linkedAccounts.length);
        linkedAccounts.push(account);
        bot.sendMessage(chatId, `✅ Account ${account} added! 🔗 Manually: Go to WhatsApp > Linked Devices > Link a Device, get the pairing code, and note it. Then return here! 🔄`);
    } else if (data === 'delay') {
        bot.sendMessage(chatId, '⏱️ Send /setdelay <seconds> to set message delay (e.g., /setdelay 15 for 15s intervals). Current: ' + messageDelay + 's. ⚡');
    } else if (data === 'schedule') {
        bot.sendMessage(chatId, '📅 Send /setschedule <HH:MM> to schedule a message (e.g., /setschedule 14:30). Manual sending at that time. 🕒');
    } else if (data === 'stop') {
        isMessagingActive = false;
        bot.sendMessage(chatId, '⏹️ Messaging stopped. Take a break! 😎 Ready to restart? Click ▶️ Start.');
    } else if (data === 'developer') {
        bot.sendMessage(chatId, '👨‍💻 *Bot Developer Info*\n\n🤖 Bot: WhatsApp Automation Bot\n📦 Version: 1.0.0\n⚡ Powered by: Node.js + Telegram Bot API\n\n💡 This bot helps automate WhatsApp messaging between linked accounts!', { parse_mode: 'Markdown' });
    }

    bot.answerCallbackQuery(query.id);
});

// Commands for advanced settings
bot.onText(/\/setdelay (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const delay = parseInt(match[1]);
    if (delay > 0) {
        messageDelay = delay;
        bot.sendMessage(chatId, `⏱️ Delay updated to ${messageDelay} seconds! ⚙️`);
    } else {
        bot.sendMessage(chatId, '❌ Invalid delay. Try /setdelay 10. ⏱️');
    }
});

bot.onText(/\/setschedule (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    scheduledTime = match[1];
    bot.sendMessage(chatId, `📅 Scheduled for ${scheduledTime}. Remember to send manually at that time! 🔔`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n⏹️  Shutting down bot gracefully...');
    bot.stopPolling();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n⏹️  Shutting down bot gracefully...');
    bot.stopPolling();
    process.exit(0);
});

console.log('✅ Bot initialized successfully!');
console.log('🤖 WhatsApp Automation Bot is running smoothly... 🚀');
console.log('📱 Waiting for /start command from Telegram...');
console.log('');
console.log('💡 To test: Open Telegram and send /start to @wsmessengerbot');
console.log('');
