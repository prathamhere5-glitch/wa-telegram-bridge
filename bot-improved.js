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

let bot;
let pollingErrorCount = 0;
const MAX_POLLING_ERRORS = 5;

function initializeBot() {
    // Create bot with improved polling configuration
    bot = new TelegramBot(TELEGRAM_TOKEN, {
        polling: {
            interval: 1000,
            autoStart: false,
            params: {
                timeout: 10
            }
        }
    });

    // Handle polling errors with retry logic
    bot.on('polling_error', (error) => {
        pollingErrorCount++;
        
        console.error(`❌ Polling Error #${pollingErrorCount}:`, error.code);
        
        if (error.code === 'ETELEGRAM') {
            if (error.message.includes('409')) {
                console.error('');
                console.error('⚠️  CONFLICT ERROR (409)');
                console.error('Another instance of this bot is already running!');
                console.error('');
                console.error('📝 Solutions:');
                console.error('1. Stop all other instances of this bot');
                console.error('2. Wait 30 seconds and try again');
                console.error('3. Or use: pkill -f "node.*bot"');
                console.error('');
                bot.stopPolling();
                process.exit(1);
            } else if (error.message.includes('401')) {
                console.error('');
                console.error('🔴 AUTHENTICATION ERROR (401)');
                console.error('');
                console.error('This usually means:');
                console.error('• The bot token has been revoked');
                console.error('• There\'s a temporary Telegram API issue');
                console.error('• The token has extra spaces or characters');
                console.error('');
                console.error('📝 Try these steps:');
                console.error('1. Run: node test-token.js (to verify token)');
                console.error('2. Check .env file for extra spaces');
                console.error('3. Regenerate token from @BotFather');
                console.error('');
                
                if (pollingErrorCount >= MAX_POLLING_ERRORS) {
                    console.error('❌ Too many polling errors. Stopping bot.');
                    bot.stopPolling();
                    process.exit(1);
                }
            }
        } else {
            console.error('Error details:', error.message);
        }
    });

    // Bot state
    let linkedAccounts = [];
    let isMessagingActive = false;
    let messageDelay = 10;
    let scheduledTime = null;
    const randomMessages = [
        'Hey there! 👋',
        'Automated ping from the bot! 🤖',
        'Random update: Stay connected! 🌟',
        'Bot is live and chatting! 💬'
    ];

    // Function for mutual messaging loop
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
                console.log(`🚀 Manual Send: From ${sender} to ${receiver}: "${message}"`);
            }
        }, messageDelay * 1000);
    }

    // Main menu
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const keyboard = [
            [{ text: '▶️ Start', callback_data: 'start' }, { text: '📊 Status', callback_data: 'status' }],
            [{ text: '📋 List Accounts', callback_data: 'list_accounts' }, { text: '➕ Add Accounts', callback_data: 'add_accounts' }],
            [{ text: '⏱️ Delay', callback_data: 'delay' }, { text: '📅 Schedule', callback_data: 'schedule' }],
            [{ text: '⏹️ Stop', callback_data: 'stop' }, { text: '👨‍💻 Developer', callback_data: 'developer' }]
        ];
        const replyMarkup = { inline_keyboard: keyboard };
        bot.sendMessage(chatId, '🤖 *WhatsApp Automation Bot*\n\nYour sleek control panel! Choose an option below:', { 
            reply_markup: replyMarkup, 
            parse_mode: 'Markdown' 
        }).then(() => {
            console.log('✅ /start command processed for chat:', chatId);
            pollingErrorCount = 0; // Reset error count on successful operation
        }).catch((err) => {
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
                bot.sendMessage(chatId, `✅ Manual messaging started! 🤩\n\nGenerating messages every ${messageDelay}s between ${linkedAccounts.join(', ')}.\n\nCheck console for instructions.`);
            }
        } else if (data === 'status') {
            const status = isMessagingActive ? '🟢 Active' : '🔴 Inactive';
            const accountCount = linkedAccounts.length;
            bot.sendMessage(chatId, `📊 *Bot Status*\n\nStatus: ${status}\nLinked Accounts: ${accountCount}\nMessage Delay: ${messageDelay}s\n\n${isMessagingActive ? 'Messages are being generated! 🚀' : 'Ready to start? Click ▶️ Start.'}`, { parse_mode: 'Markdown' });
        } else if (data === 'list_accounts') {
            const linked = linkedAccounts.length > 0 ? linkedAccounts.join(', ') : 'None yet';
            bot.sendMessage(chatId, `📋 *Linked Accounts*\n\n${linked}\n\n${linkedAccounts.length < 2 ? 'Add more with ➕ Add Accounts! 📱' : 'All set for mutual messaging! 🎉'}`, { parse_mode: 'Markdown' });
        } else if (data === 'add_accounts') {
            const keyboard = [
                [{ text: '📱 Login via QR', callback_data: 'qr_login' }, { text: '🔗 Pairing Code', callback_data: 'pairing_login' }]
            ];
            const replyMarkup = { inline_keyboard: keyboard };
            bot.sendMessage(chatId, '➕ *Add Accounts*\n\nChoose your login method:', { reply_markup: replyMarkup, parse_mode: 'Markdown' });
        } else if (data === 'qr_login') {
            const account = String.fromCharCode(97 + linkedAccounts.length);
            linkedAccounts.push(account);
            bot.sendMessage(chatId, `✅ Account ${account} added! 📱\n\nManually:\n1. Open https://web.whatsapp.com/\n2. Scan the QR code to link\n3. Return here! 🔄`);
        } else if (data === 'pairing_login') {
            const account = String.fromCharCode(97 + linkedAccounts.length);
            linkedAccounts.push(account);
            bot.sendMessage(chatId, `✅ Account ${account} added! 🔗\n\nManually:\n1. Go to WhatsApp > Linked Devices\n2. Link a Device\n3. Get the pairing code\n4. Return here! 🔄`);
        } else if (data === 'delay') {
            bot.sendMessage(chatId, `⏱️ *Set Message Delay*\n\nCurrent: ${messageDelay}s\n\nSend: /setdelay <seconds>\nExample: /setdelay 15`, { parse_mode: 'Markdown' });
        } else if (data === 'schedule') {
            bot.sendMessage(chatId, '📅 *Schedule Messages*\n\nSend: /setschedule <HH:MM>\nExample: /setschedule 14:30\n\nManual sending at that time. 🕒', { parse_mode: 'Markdown' });
        } else if (data === 'stop') {
            isMessagingActive = false;
            bot.sendMessage(chatId, '⏹️ Messaging stopped. Take a break! 😎\n\nReady to restart? Click ▶️ Start.');
        } else if (data === 'developer') {
            bot.sendMessage(chatId, '👨‍💻 *Bot Developer Info*\n\n🤖 Bot: WhatsApp Automation Bot\n📦 Version: 1.0.0\n⚡ Powered by: Node.js + Telegram Bot API\n🔧 Library: node-telegram-bot-api v0.66.0\n\n💡 This bot helps automate WhatsApp messaging between linked accounts!', { parse_mode: 'Markdown' });
        }

        bot.answerCallbackQuery(query.id);
    });

    // Commands
    bot.onText(/\/setdelay (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const delay = parseInt(match[1]);
        if (delay > 0 && delay <= 3600) {
            messageDelay = delay;
            bot.sendMessage(chatId, `⏱️ Delay updated to ${messageDelay} seconds! ⚙️`);
        } else {
            bot.sendMessage(chatId, '❌ Invalid delay. Use a value between 1-3600 seconds.\n\nExample: /setdelay 10');
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

    // Start polling
    bot.startPolling();
    
    console.log('✅ Bot initialized successfully!');
    console.log('🤖 WhatsApp Automation Bot is running smoothly... 🚀');
    console.log('📱 Waiting for /start command from Telegram...');
    console.log('');
    console.log('💡 To test: Open Telegram and send /start to @wsmessengerbot');
    console.log('');
}

// Initialize the bot
try {
    initializeBot();
} catch (error) {
    console.error('❌ Fatal error initializing bot:', error.message);
    process.exit(1);
}
