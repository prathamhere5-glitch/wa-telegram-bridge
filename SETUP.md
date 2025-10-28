# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Bot Token

Your bot token is already configured in `bot.js`:
```
Token: 8111876690:AAH28e-37x48Q-NxrccgdOjkt9dfdwpqk0w
```

## Step 3: Test Locally (Optional)

```bash
npm start
```

## Step 4: Deploy to Hosting Platform

Choose one of the 10 free hosting platforms listed in `DEPLOYMENT.md`:

### Quick Deploy Options:

**Option 1: Render (Easiest)**
1. Go to [render.com](https://render.com)
2. Create new Background Worker
3. Connect GitHub repo
4. Deploy automatically

**Option 2: Railway**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Auto-deploys with `railway.json`

**Option 3: Fly.io**
```bash
flyctl launch
flyctl deploy
```

## Step 5: Start Using Your Bot

1. Open Telegram
2. Search for your bot
3. Send `/start`
4. Enjoy! 🎉

## 📁 Files Included

- `bot.js` - Main bot code with your token
- `package.json` - Dependencies
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Detailed deployment guide for 10 platforms
- `Procfile` - For Heroku/Render
- `Dockerfile` - For Docker deployments
- `railway.json` - Railway configuration
- `render.yaml` - Render configuration
- `fly.toml` - Fly.io configuration
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variable template
- `LICENSE` - MIT License
- `CONTRIBUTING.md` - Contribution guidelines

## 🌐 10 Free Hosting Platforms

1. ✅ **Render** - 750 hours/month free
2. ✅ **Railway** - $5 free credit monthly
3. ✅ **Fly.io** - 3 free VMs
4. ✅ **Heroku** - 550 hours/month free
5. ✅ **Glitch** - Free with sleep
6. ✅ **Replit** - Free tier available
7. ✅ **Cyclic** - Generous free tier
8. ✅ **Deta Space** - Free forever
9. ✅ **Koyeb** - Free tier available
10. ✅ **Vercel** - Serverless (requires webhook setup)

See `DEPLOYMENT.md` for detailed instructions for each platform!

## 🔒 Security Note

Your bot token is currently hardcoded in `bot.js`. For production:
1. Use environment variables
2. Never commit tokens to public repos
3. Rotate tokens regularly

## 📞 Support

- Read `README.md` for features
- Check `DEPLOYMENT.md` for deployment help
- Open GitHub issue for bugs

Happy botting! 🤖✨
