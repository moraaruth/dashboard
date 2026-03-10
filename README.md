# Safaricom Agent Monitoring System

## System Architecture

### 1. **Agent Mobile App** (agent-app/)
- Agents use this to check-in when they arrive at shop
- Records GPS location automatically
- Submits transactions in real-time
- Tracks check-in/check-out times

### 2. **Backend API** (backend/)
- Express.js REST API
- MongoDB database
- Endpoints:
  - POST /api/agents/checkin - Agent arrives at shop
  - POST /api/agents/checkout - Agent leaves shop
  - POST /api/transactions - Record each transaction
  - GET /api/agents/:id/dashboard - Get agent stats
  - POST /api/agents/location - Update GPS location

### 3. **Management Dashboard** (src/)
- Senior management views all agent activities
- Real-time transaction monitoring
- Performance metrics and analytics
- Agent location tracking

## Data Flow

```
Agent arrives at shop
    ↓
Opens Agent App → GPS captures location
    ↓
Clicks "Check In" → POST /api/agents/checkin
    ↓
Backend saves: agentId, location, timestamp, status="Active"
    ↓
Management Dashboard shows agent is "Active"
    ↓
Agent serves customer
    ↓
Records transaction in Agent App
    ↓
POST /api/transactions → Saves to database
    ↓
Management Dashboard updates in real-time
    ↓
Agent finishes day → Clicks "Check Out"
    ↓
Backend updates status="Inactive"
```

## Setup Instructions

### 1. Install MongoDB
```bash
# Download from: https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Setup Management Dashboard
```bash
cd ..
npm install
npm run dev
```

### 4. Setup Agent App (Optional - for testing)
```bash
cd agent-app
npm install
npm run dev
```

## Integration with Safaricom Systems

### Option 1: Direct Integration
- Connect to Safaricom's existing POS/transaction systems
- Use webhooks to receive transaction data automatically
- No manual entry needed

### Option 2: API Integration
- Safaricom POS sends transaction data to your API
- Endpoint: POST /api/transactions
- Payload: { agentId, transactionType, amount, customerPhone }

### Option 3: Manual Entry (Current)
- Agents manually record transactions via mobile app
- Good for pilot/testing phase

## Real-World Implementation

### For Production:
1. **GPS Tracking**: Use agent's phone GPS
2. **Biometric Check-in**: Fingerprint/face recognition
3. **Automatic Transaction Sync**: Connect to Safaricom POS
4. **SMS Notifications**: Alert management of issues
5. **Offline Mode**: Queue transactions when no internet
6. **Security**: JWT authentication, encrypted data

## Environment Variables

Create `.env` files:

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safaricom_agents
JWT_SECRET=your_secret_key
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/agents/checkin | Agent check-in with GPS |
| POST | /api/agents/checkout | Agent check-out |
| POST | /api/transactions | Record transaction |
| GET | /api/agents | Get all agents |
| GET | /api/agents/:id/dashboard | Get agent dashboard data |
| GET | /api/transactions/hourly/:id | Get hourly transaction data |

## Database Schema

**Agents Collection**
- agentId, name, phone, shopLocation
- currentLocation (lat, lng, timestamp)
- status (Active/Inactive)
- checkInTime, checkOutTime
- rating

**Transactions Collection**
- agentId, transactionType, customerPhone
- amount, status, timestamp
- location (lat, lng)
