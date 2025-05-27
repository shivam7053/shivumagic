import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Install via npm install uuid

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    index: true,
  },
  name: String,
  email: String,
  service: String,
  plan: String,
  description: String,

  status: {
    type: String,
    enum: ['Initiate', 'Working', 'Prototype', 'Complete'],
    default: 'Initiate',
  },

  adminNote: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before save
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
