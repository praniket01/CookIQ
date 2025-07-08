#!/bin/bash

# Exit on any error
set -e

echo "🔧 Installing dependencies..."
npm install

echo "⚙️  Running Prisma generate..."
npx prisma generate

echo "✅ Setup complete."
