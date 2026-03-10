import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  agentId: { type: String, required: true },
  transactionType: { 
    type: String, 
    enum: ['M-PESA Deposit', 'M-PESA Withdrawal', 'Airtime Purchase', 'SIM Registration', 'Bill Payment', 'SIM Swap', 'Other'],
    required: true 
  },
  customerPhone: { type: String, required: true },
  amount: { type: Number, default: 0 },
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
  location: {
    latitude: Number,
    longitude: Number
  }
})

export default mongoose.model('Transaction', transactionSchema)
