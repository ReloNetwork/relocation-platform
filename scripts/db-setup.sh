#!/bin/bash

# Database setup script for Relo Network
# Usage: ./scripts/db-setup.sh [push|seed|reset]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f "apps/askrelo/.env.local" ]; then
    echo -e "${RED}❌ .env.local file not found in apps/askrelo/"
    echo -e "${YELLOW}📝 Please copy .env.example to .env.local and configure your environment variables${NC}"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' apps/askrelo/.env.local | xargs)

# Check required environment variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo -e "${RED}❌ Required environment variables are missing${NC}"
    echo "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set"
    exit 1
fi

push_schema() {
    echo -e "${YELLOW}🚀 Pushing database schema to Supabase...${NC}"
    
    # Check if supabase CLI is installed
    if ! command -v supabase &> /dev/null; then
        echo -e "${RED}❌ Supabase CLI not found${NC}"
        echo "Please install it with: npm install -g supabase"
        exit 1
    fi
    
    # Apply schema
    supabase db push --db-url "$DATABASE_URL" --file database/schema.sql
    
    echo -e "${GREEN}✅ Schema pushed successfully${NC}"
}

seed_database() {
    echo -e "${YELLOW}🌱 Seeding database with demo data...${NC}"
    
    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js not found${NC}"
        exit 1
    fi
    
    # Install ts-node if not available
    if ! command -v ts-node &> /dev/null; then
        echo "Installing ts-node..."
        npm install -g ts-node typescript
    fi
    
    # Run the seed script
    cd apps/askrelo
    npx ts-node ../../database/seed.ts
    cd ../..
    
    echo -e "${GREEN}✅ Database seeded successfully${NC}"
}

reset_database() {
    echo -e "${YELLOW}🗑️  Resetting database...${NC}"
    
    read -p "Are you sure you want to reset the database? This will delete ALL data (y/N): " -r
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operation cancelled"
        exit 0
    fi
    
    echo "Dropping and recreating schema..."
    push_schema
    seed_database
    
    echo -e "${GREEN}✅ Database reset completed${NC}"
}

setup_stripe() {
    echo -e "${YELLOW}💳 Setting up Stripe products and prices...${NC}"
    
    if [ -z "$STRIPE_SECRET_KEY" ]; then
        echo -e "${RED}❌ STRIPE_SECRET_KEY not found in environment${NC}"
        exit 1
    fi
    
    cd apps/askrelo
    npx ts-node ../../scripts/stripe-setup.ts
    cd ../..
    
    echo -e "${GREEN}✅ Stripe setup completed${NC}"
}

show_help() {
    echo "Relo Network Database Setup"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  push     Apply database schema to Supabase"
    echo "  seed     Populate database with demo data"
    echo "  reset    Drop and recreate database with fresh data"
    echo "  stripe   Setup Stripe products and pricing"
    echo "  help     Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 push"
    echo "  $0 seed"
    echo "  $0 reset"
}

# Main script logic
case "${1:-help}" in
    "push")
        push_schema
        ;;
    "seed")
        seed_database
        ;;
    "reset")
        reset_database
        ;;
    "stripe")
        setup_stripe
        ;;
    "help"|*)
        show_help
        ;;
esac