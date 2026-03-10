import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Agent from './models/Agent.js'
import Transaction from './models/Transaction.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Agent check-in (when agent arrives at shop)
app.post('/api/agents/checkin', async (req, res) => {
  try {
    const { agentId, latitude, longitude } = req.body
    const agent = await Agent.findOneAndUpdate(
      { agentId },
      {
        status: 'Active',
        checkInTime: new Date(),
        currentLocation: { latitude, longitude, timestamp: new Date() }
      },
      { new: true }
    )
    res.json({ success: true, agent })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Agent check-out
app.post('/api/agents/checkout', async (req, res) => {
  try {
    const { agentId } = req.body
    const agent = await Agent.findOneAndUpdate(
      { agentId },
      { status: 'Inactive', checkOutTime: new Date() },
      { new: true }
    )
    res.json({ success: true, agent })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update agent location (real-time tracking)
app.post('/api/agents/location', async (req, res) => {
  try {
    const { agentId, latitude, longitude } = req.body
    const agent = await Agent.findOneAndUpdate(
      { agentId },
      { currentLocation: { latitude, longitude, timestamp: new Date() } },
      { new: true }
    )
    res.json({ success: true, agent })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Record transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body)
    await transaction.save()
    res.json({ success: true, transaction })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get agent dashboard data
app.get('/api/agents/:agentId/dashboard', async (req, res) => {
  try {
    const { agentId } = req.params
    const agent = await Agent.findOne({ agentId })
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const transactions = await Transaction.find({
      agentId,
      timestamp: { $gte: today }
    })
    
    const stats = {
      totalTransactions: transactions.length,
      successfulTransactions: transactions.filter(t => t.status === 'Success').length,
      totalRevenue: transactions.reduce((sum, t) => sum + t.amount, 0),
      customerCount: new Set(transactions.map(t => t.customerPhone)).size
    }
    
    res.json({ agent, stats, transactions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find()
    res.json(agents)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get hourly transaction data
app.get('/api/transactions/hourly/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const transactions = await Transaction.find({
      agentId,
      timestamp: { $gte: today }
    })
    
    const hourlyData = Array.from({ length: 12 }, (_, i) => ({
      hour: `${8 + i * 2}:00`,
      mpesa: 0,
      airtime: 0,
      registration: 0,
      bills: 0
    }))
    
    transactions.forEach(t => {
      const hour = t.timestamp.getHours()
      const index = Math.floor((hour - 8) / 2)
      if (index >= 0 && index < 12) {
        if (t.transactionType.includes('M-PESA')) hourlyData[index].mpesa++
        else if (t.transactionType.includes('Airtime')) hourlyData[index].airtime++
        else if (t.transactionType.includes('Registration')) hourlyData[index].registration++
        else if (t.transactionType.includes('Bill')) hourlyData[index].bills++
      }
    })
    
    res.json(hourlyData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
