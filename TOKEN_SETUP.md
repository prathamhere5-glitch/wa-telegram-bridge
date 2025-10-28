# 🔑 How to Get a Valid Telegram Bot Token

## The 401 Unauthorized Error

If you're seeing `ETELEGRAM: 401 Unauthorized` errors, it means your bot token is **invalid, expired, or revoked**.

## Steps to Fix:

### 1. Open BotFather on Telegram
- Go to: https://t.me/BotFather
- Or search for `@BotFather` in Telegram

### 2. Get Your Bot Token

#### Option A: Get Token for Existing Bot
```
1. Send: /mybots
2. Select your bot from the list
3. Click "API Token"
4. Copy the new token (format: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz)
```

#### Option B: Create a New Bot
```
1. Send: /newbot
2. Choose a name for your bot (e.g., "My WhatsApp Bot")
3. Choose a username (must end in 'bot', e.g., "mywhatsapp_bot")
4. BotFather will give you a token
5. Copy the token
```

### 3. Update Your Token

#### Method 1: Using .env file (Recommended)
```bash
# Edit the .env file
nano .env

# Replace the token:
TELEGRAM_TOKEN=YOUR_NEW_TOKEN_HERE
TELEGRAM_CHAT_ID=your_chat_id
```

#### Method 2: Direct in bot.js
```javascript
// Edit bot.js line 4:
const TELEGRAM_TOKEN = 'YOUR_NEW_TOKEN_HERE';
```

### 4. Restart the Bot
```bash
# Stop the current process (Ctrl+C)
# Then restart:
npm start
```

## ⚠️ Important Notes:

1. **Never share your bot token publicly** - It's like a password!
2. **Token format**: Should look like `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
3. **If token is compromised**: Use `/revoke` in BotFather to get a new one
4. **Keep .env in .gitignore** - Don't commit tokens to GitHub!

## 🔍 How to Get Your Chat ID:

1. Start a chat with your bot on Telegram
2. Send any message to your bot
3. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
4. Look for `"chat":{"id":123456789}` in the response
5. Copy that number as your TELEGRAM_CHAT_ID

## ✅ Testing Your Token:

Run this command to test if your token is valid:
```bash
curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe
```

If valid, you'll see your bot's information. If invalid, you'll see an error.

## 🆘 Still Having Issues?

1. Make sure there are no extra spaces in your token
2. Verify the token format is correct (numbers:letters)
3. Check if the bot was deleted in BotFather
4. Create a completely new bot and try again
