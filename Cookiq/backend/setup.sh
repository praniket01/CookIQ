#!/bin/bash

# Exit on any error
set -e

cd "$(dirname "$0")"  
npm install

echo " Running Prisma generate..."
npx prisma generate --schema=../prisma/schema.prisma


echo "✅ Setup complete."
