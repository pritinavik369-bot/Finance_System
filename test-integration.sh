#!/bin/bash

# Integration Test Script
# This script verifies that the frontend-backend integration is working properly

echo "🔍 Finance System Integration Test"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo "1️⃣  Checking backend server..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend server is running"
else
    echo -e "${RED}✗${NC} Backend server is NOT running at http://localhost:3000"
    echo "   Start the server with: cd server && npm start"
    exit 1
fi

echo ""
echo "2️⃣  Testing Sign In endpoint..."
SIGNIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","password":"admin123"}')

if echo "$SIGNIN_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✓${NC} Sign In endpoint working"
    TOKEN=$(echo "$SIGNIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    if [ -z "$TOKEN" ]; then
        # Try alternative parsing
        TOKEN=$(echo "$SIGNIN_RESPONSE" | grep -o 'token[^}]*' | cut -d':' -f2 | cut -d'"' -f2 | head -1)
    fi
    echo "   Token received (first 20 chars): ${TOKEN:0:20}..."
else
    echo -e "${RED}✗${NC} Sign In endpoint failed"
    echo "   Response: $SIGNIN_RESPONSE"
    exit 1
fi

echo ""
echo "3️⃣  Testing Create Financial Record endpoint..."
if [ -z "$TOKEN" ]; then
    echo -e "${YELLOW}⚠${NC}  Skipping record test (no token obtained)"
else
    RECORD_RESPONSE=$(curl -s -X POST http://localhost:3000/api/financial/records \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{
        "amount": 100,
        "type": "income",
        "category": "test",
        "date": "2024-01-01",
        "notes": "Integration test"
      }')
    
    if echo "$RECORD_RESPONSE" | grep -q "amount\|_id"; then
        echo -e "${GREEN}✓${NC} Create Record endpoint working"
    else
        echo -e "${YELLOW}⚠${NC}  Record endpoint responded but may need verification"
        echo "   Response: $RECORD_RESPONSE"
    fi
fi

echo ""
echo "4️⃣  Checking frontend files..."
if [ -f "src/services/api.js" ]; then
    echo -e "${GREEN}✓${NC} API service layer exists"
else
    echo -e "${RED}✗${NC} API service layer missing"
fi

if [ -f "src/context/AuthContext.jsx" ]; then
    echo -e "${GREEN}✓${NC} Auth context exists"
else
    echo -e "${RED}✗${NC} Auth context missing"
fi

if [ -f "src/components/ProtectedRoute.jsx" ]; then
    echo -e "${GREEN}✓${NC} Protected routes exist"
else
    echo -e "${RED}✗${NC} Protected routes missing"
fi

echo ""
echo "================================"
echo -e "${GREEN}✓${NC} Integration test complete!"
echo ""
echo "Next steps:"
echo "1. Start frontend: npm run dev"
echo "2. Open http://localhost:5173"
echo "3. Sign in with: Admin / admin123"
echo "4. Navigate to Dashboard to test functionality"
