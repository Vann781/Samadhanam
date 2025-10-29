#!/bin/bash

# 🚀 Samadhanam Project - Quick Start Script
# This script helps you start all services at once

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     Samadhanam - Civic Issue Management System          ║"
echo "║              Quick Start Launcher                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "Checking dependencies..."

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are installed${NC}"
echo ""

# Check if node_modules exist, if not, run npm install
install_if_needed() {
    if [ ! -d "$1/node_modules" ]; then
        echo -e "${YELLOW}📦 Installing dependencies for $2...${NC}"
        cd "$1"
        npm install
        cd - > /dev/null
    else
        echo -e "${GREEN}✅ Dependencies already installed for $2${NC}"
    fi
}

echo "Checking and installing dependencies..."
echo ""

# Install dependencies for all services
install_if_needed "CIVIC-ISSUE-MANAGEMENT/Municipal/backend" "Municipal Backend"
install_if_needed "CIVIC-ISSUE-MANAGEMENT/State/backend" "State Backend"
install_if_needed "CIVIC-ISSUE-MANAGEMENT/Municipal/frontend/municipal-frontend" "Municipal Frontend"
install_if_needed "CIVIC-ISSUE-MANAGEMENT/State/frontend/State-frontend" "State Frontend"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Function to start a service
start_service() {
    local service_path=$1
    local service_name=$2
    local port=$3
    
    echo -e "${GREEN}🚀 Starting $service_name on port $port...${NC}"
    echo "   Path: $service_path"
    echo "   Command: npm start"
    echo ""
}

echo "Starting all services..."
echo ""
echo "Please open 4 terminal windows and run the following commands:"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${YELLOW}Terminal 1 - Municipal Backend${NC}"
echo "cd CIVIC-ISSUE-MANAGEMENT/Municipal/backend"
echo "npm start"
echo ""
echo "Expected: Server running on http://localhost:4040"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Terminal 2 - State Backend${NC}"
echo "cd CIVIC-ISSUE-MANAGEMENT/State/backend"
echo "npm start"
echo ""
echo "Expected: Server running on http://localhost:4005"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Terminal 3 - Municipal Frontend${NC}"
echo "cd CIVIC-ISSUE-MANAGEMENT/Municipal/frontend/municipal-frontend"
echo "npm run dev"
echo ""
echo "Expected: Frontend running on http://localhost:5173"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Terminal 4 - State Frontend${NC}"
echo "cd CIVIC-ISSUE-MANAGEMENT/State/frontend/State-frontend"
echo "npm run dev"
echo ""
echo "Expected: Frontend running on http://localhost:5174"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}📝 Quick Links:${NC}"
echo "   Municipal Admin: http://localhost:5173"
echo "   State Admin: http://localhost:5174"
echo "   Municipal API: http://localhost:4040"
echo "   State API: http://localhost:4005"
echo ""
echo -e "${GREEN}📚 Documentation:${NC}"
echo "   Implementation Guide: IMPLEMENTATION_GUIDE.md"
echo "   Summary: IMPLEMENTATION_SUMMARY.md"
echo "   Quick Reference: QUICK_REFERENCE.md"
echo ""
echo -e "${GREEN}✨ All services ready to start!${NC}"
echo ""
