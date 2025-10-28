#!/bin/bash

echo "🔍 Checking for running bot instances..."
echo ""

# Check for node processes running bot.js
RUNNING=$(ps aux | grep -E "node.*bot\.js" | grep -v grep)

if [ -z "$RUNNING" ]; then
    echo "✅ No bot instances are currently running."
    echo ""
    echo "💡 You can start the bot with: npm start"
else
    echo "⚠️  Found running bot instance(s):"
    echo ""
    echo "$RUNNING"
    echo ""
    echo "🛑 To stop them, run:"
    echo "   pkill -f 'node.*bot\.js'"
    echo ""
    echo "   Or kill specific PIDs:"
    ps aux | grep -E "node.*bot\.js" | grep -v grep | awk '{print "   kill " $2}'
fi

echo ""
