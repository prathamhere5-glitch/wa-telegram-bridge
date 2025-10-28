# 🚀 Git Commands for GitHub Upload

## Quick Upload to GitHub

### Step 1: Initialize Git (if not already done)
```bash
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Commit Changes
```bash
git commit -m "Initial commit: Telegram WhatsApp Automation Bot with deployment configs"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "telegram-whatsapp-bot")
3. Don't initialize with README (we already have one)
4. Copy the repository URL

### Step 5: Add Remote and Push
```bash
# Replace <your-username> and <your-repo-name> with your actual values
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

## Example (Replace with your details)
```bash
git remote add origin https://github.com/yourusername/telegram-whatsapp-bot.git
git branch -M main
git push -u origin main
```

## Verify Upload
After pushing, check your GitHub repository. You should see:
- ✅ 18 files uploaded
- ✅ README.md displayed on main page
- ✅ All documentation files
- ✅ Configuration files for deployment

## Update Repository Later
```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
```

## 🔒 Security Check Before Upload

⚠️ **IMPORTANT**: Your bot token is in `bot.js`

If you want to keep it private:
1. Create `.env` file (already in .gitignore)
2. Move token to `.env`:
   ```
   TELEGRAM_TOKEN=8111876690:AAH28e-37x48Q-NxrccgdOjkt9dfdwpqk0w
   ```
3. Update `bot.js` to use:
   ```javascript
   require('dotenv').config();
   const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
   ```
4. Make repository private on GitHub

## Repository Settings

### Make Repository Private (Recommended)
1. Go to repository Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Private"

### Add Repository Description
```
Telegram bot for WhatsApp automation - manage multiple accounts and send automated messages
```

### Add Topics (Tags)
- telegram-bot
- whatsapp-automation
- nodejs
- automation
- messaging-bot

## 🎉 You're Done!

Your code is now on GitHub and ready to deploy to any of the 10 free hosting platforms!

See `DEPLOYMENT.md` for deployment instructions.
