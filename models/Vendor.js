const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  bank_account: String,
  email: { type: String, unique: true },
  password: String,
  store_name: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
