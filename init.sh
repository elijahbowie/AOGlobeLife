#!/bin/bash

# Apex Sales Academy - Development Initialization Script
# This script sets up and validates the development environment

set -e

echo "🏆 Apex Sales Academy - Initialization"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "\n${YELLOW}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v 2>/dev/null || echo "not installed")
if [[ "$NODE_VERSION" == "not installed" ]]; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 20+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"

# Check if we're in the right directory
if [[ ! -f "feature-list.json" ]]; then
    echo -e "${RED}❌ Not in project root. Please run from /Users/elijahbowie/AOGlobeLife${NC}"
    exit 1
fi

# Install client dependencies
if [[ -d "client" ]]; then
    echo -e "\n${YELLOW}Installing client dependencies...${NC}"
    cd client
    npm install
    cd ..
    echo -e "${GREEN}✓ Client dependencies installed${NC}"
fi

# Install server dependencies
if [[ -d "server" ]]; then
    echo -e "\n${YELLOW}Installing server dependencies...${NC}"
    cd server
    npm install
    cd ..
    echo -e "${GREEN}✓ Server dependencies installed${NC}"
fi

# Start development servers
echo -e "\n${YELLOW}Starting development servers...${NC}"

# Start backend in background (if exists)
if [[ -d "server" ]]; then
    echo "Starting backend server..."
    cd server
    npm run dev &
    BACKEND_PID=$!
    cd ..
    sleep 2
    echo -e "${GREEN}✓ Backend running on http://localhost:3001${NC}"
fi

# Start frontend
if [[ -d "client" ]]; then
    echo "Starting frontend server..."
    cd client
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    sleep 3
    echo -e "${GREEN}✓ Frontend running on http://localhost:5173${NC}"
fi

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${GREEN}🚀 Development environment ready!${NC}"
echo -e "${GREEN}=======================================${NC}"
echo -e "\nFrontend: http://localhost:5173"
echo -e "Backend:  http://localhost:3001"
echo -e "\nPress Ctrl+C to stop all servers"

# Wait for user interrupt
wait
