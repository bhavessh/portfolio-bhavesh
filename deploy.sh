#!/bin/bash

echo "🚀 Deploying Portfolio CMS..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to Netlify using CLI
echo "🌐 Deploying to Netlify..."
cd frontend
npx netlify deploy --prod --dir=dist --open
cd ..

echo "✅ Deployment complete!"
