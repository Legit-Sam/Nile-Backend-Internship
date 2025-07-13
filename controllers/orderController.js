const Order = require('../models/Order');
const Vendor = require('../models/Vendor');

// Generate Order ID
const generateOrderId = () => 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

// ✅ Create new order
exports.createOrder = async (req, res) => {
  try {
    const { name, amount, status } = req.body;
    const generateOrderId = () => 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    const order = new Order({
      name,
      order_id: generateOrderId(),
      amount,
      status,
      vendor: req.user.id,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};


// ✅ Get all orders (for testing/admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('vendor', 'name store_name');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// ✅ Get payout summary for logged-in vendor
exports.getPayoutSummary = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const completedOrders = await Order.find({ vendor: vendorId, status: 'completed' });

    const total_amount = completedOrders.reduce((sum, order) => sum + order.amount, 0);
    const platform_fee = total_amount * 0.05;
    const net_payout = total_amount - platform_fee;

    const vendor = await Vendor.findById(vendorId);

    res.status(200).json({
      vendor: vendor.store_name,
      total_orders: completedOrders.length,
      total_amount,
      platform_fee,
      net_payout,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payout summary' });
  }
};
