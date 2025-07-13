const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order_id: { type: String, unique: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
