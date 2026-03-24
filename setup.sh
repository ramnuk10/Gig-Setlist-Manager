#!/bin/bash

echo "Installing Gig Setlist Manager..."

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

echo "Setup complete! Run 'npm run dev' to start the application."
