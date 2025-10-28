#!/usr/bin/env node

/**
 * Simple token validation script
 * Tests if the Telegram bot token is valid
 */

require('dotenv').config();
const https = require('https');

const TELEGRAM_TOKEN = (process.env.TELEGRAM_TOKEN || '8111876690:AAH28e-37x48Q-NxrccgdOjkt9dfdwpqk0w').trim();

console.log('🔍 Testing Telegram Bot Token...');
console.log('📱 Token:', TELEGRAM_TOKEN.substring(0, 15) + '...');
console.log('');

const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getMe`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            
            if (response.ok) {
                console.log('✅ TOKEN IS VALID!');
                console.log('');
                console.log('🤖 Bot Information:');
                console.log('   ID:', response.result.id);
                console.log('   Name:', response.result.first_name);
                console.log('   Username: @' + response.result.username);
                console.log('   Can Join Groups:', response.result.can_join_groups);
                console.log('');
                console.log('✨ Your bot is ready to use!');
                console.log('💡 Start it with: npm start');
                console.log('');
            } else {
                console.log('❌ TOKEN IS INVALID!');
                console.log('');
                console.log('Error:', response.description);
                console.log('');
                console.log('📝 How to fix:');
                console.log('1. Go to https://t.me/BotFather');
                console.log('2. Send /mybots');
                console.log('3. Select your bot');
                console.log('4. Get a new API token');
                console.log('5. Update .env file with the new token');
                console.log('');
                process.exit(1);
            }
        } catch (error) {
            console.error('❌ Error parsing response:', error.message);
            console.error('Response:', data);
            process.exit(1);
        }
    });
}).on('error', (error) => {
    console.error('❌ Network error:', error.message);
    console.error('');
    console.error('Please check your internet connection and try again.');
    process.exit(1);
});
