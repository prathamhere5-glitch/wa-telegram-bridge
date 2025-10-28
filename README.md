# 🤖 Telegram WhatsApp Automation Bot

A powerful Telegram bot that helps you manage multiple WhatsApp accounts and automate message sending between linked accounts.

## ✨ Features

- 🔐 **Multi-Account Management**: Link multiple WhatsApp accounts
- 📱 **Flexible Login**: Support for both QR code and pairing code authentication
- 💬 **Automated Messaging**: Send random messages between linked accounts
- ⏱️ **Customizable Delay**: Set message intervals (default: 10 seconds)
- 📅 **Scheduling**: Schedule messages for specific times
- 📊 **Status Monitoring**: Check bot status and linked accounts
- 🎯 **User-Friendly Interface**: Intuitive button-based controls with emojis

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- A Telegram Bot Token (get it from [@BotFather](https://t.me/botfather))
- Your Telegram Chat ID

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd telegram-whatsapp-automation-bot
```

2. Install dependencies:
```bash
npm install
```

3. Configure your bot:
   - Copy `.env.example` to `.env`
   - Add your Telegram bot token and chat ID

4. Start the bot:
```bash
npm start
```

## 📋 Commands

- `/start` - Open the main control panel
- `/setdelay <seconds>` - Set message delay (e.g., `/setdelay 15`)
- `/setschedule <HH:MM>` - Schedule messages (e.g., `/setschedule 14:30`)

## 🎮 Bot Controls

- **▶️ Start** - Begin automated messaging
- **📊 Status** - Check bot status
- **📋 List Linked Accounts** - View all connected accounts
- **➕ Add Accounts** - Link new WhatsApp accounts
- **⏱️ Delay** - Configure message intervals
- **📅 Schedule** - Set scheduled messaging
- **⏹️ Stop** - Stop automated messaging

## 🔧 Configuration

Edit `bot.js` to customize:
- Random messages array
- Default delay settings
- Bot behavior

## 📦 Dependencies

- `node-telegram-bot-api` - Telegram Bot API wrapper
- `whatsapp-web.js` - WhatsApp Web automation
- `qrcode-terminal` - QR code generation for terminal
- `qrcode` - QR code generation
- `dotenv` - Environment variable management

## 🌐 Free Hosting Options

Deploy your bot on these platforms:

1. **[Render](https://render.com)** - Free tier with 750 hours/month
2. **[Railway](https://railway.app)** - $5 free credit monthly
3. **[Fly.io](https://fly.io)** - Free tier with 3 VMs
4. **[Heroku](https://heroku.com)** - Free dynos (limited hours)
5. **[Glitch](https://glitch.com)** - Free hosting for Node.js apps
6. **[Replit](https://replit.com)** - Free tier with always-on option
7. **[Cyclic](https://cyclic.sh)** - Free serverless hosting
8. **[Deta](https://deta.space)** - Free cloud platform
9. **[Koyeb](https://koyeb.com)** - Free tier available
10. **[Vercel](https://vercel.com)** - Free for hobby projects (serverless)

### Deployment Tips

- Most platforms require a `Procfile` or start script
- Set environment variables in the hosting platform's dashboard
- Keep your bot token secure - never commit it to Git
- Some platforms may require a credit card for verification

## 🔒 Security

- Never share your bot token
- Keep `.env` file in `.gitignore`
- Use environment variables for sensitive data
- Regularly rotate your bot token

## 📝 License

MIT License - feel free to use and modify!

## 👨‍💻 Developer

Created with ❤️ for WhatsApp automation enthusiasts

## 🐛 Issues & Support

If you encounter any issues, please open an issue on GitHub.

---

**Note**: This bot provides manual instructions for WhatsApp linking. Automated browser-based WhatsApp Web login requires additional setup with Puppeteer or similar tools.
