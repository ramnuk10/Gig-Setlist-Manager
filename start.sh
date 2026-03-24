#!/bin/bash
# Quick start script for Gig Setlist Manager

set -e  # Exit on error

echo "🎸 Gig Setlist Manager - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
  exit 1
fi

echo "✅ Node.js $(node --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all --silent

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 Starting development servers..."
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Start the development servers
npm run dev
