import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema({
  agentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  shopLocation: { type: String, required: true },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  },
  status: { type: String, enum: ['Active', 'Inactive', 'On Break'], default: 'Inactive' },
  checkInTime: Date,
  checkOutTime: Date,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Agent', agentSchema)
