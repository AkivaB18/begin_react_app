#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Start the frontend
echo "Starting frontend..."
cd ..
npm run dev &
FRONTEND_PID=$!

# Function to handle termination
cleanup() {
  echo "Shutting down servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Register the cleanup function for when script is terminated
trap cleanup SIGINT

# Keep the script running
wait