#!/bin/bash

# Exit on any error
set -e

cd "$(dirname "$0")"  # ensures we're in the backend directory
npm install
npm install @prisma/client

echo " Running Prisma generate..."
npx prisma generate --schema=../prisma/schema.prisma


echo "✅ Setup complete."
