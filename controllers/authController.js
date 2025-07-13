const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerVendor = async (req, res) => {
  try {
    const {name, email, password, bank_account, store_name} = req.body

  if (!name || !email || !password || !bank_account || !store_name) {
  return res.status(400).json({ error: "All fields are required." });
}


    const existingVendor = await Vendor.findOne({email});
    if (existingVendor) {
      return res.status(400).json({ error: "Vendor already exists." });
      }

const lowecaseEmail = email.toLowerCase();
const hashedPassword = await bcrypt.hash(password, 10);
const vendor = new Vendor({
  name,
  email: lowecaseEmail,
  password: hashedPassword,
  bank_account,
  store_name
  });
  await vendor.save();
  res.status(201).json({ message: "Vendor created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create vendor." });
    }

}

exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Destructure to omit password
    const { password: _, ...vendorData } = vendor.toObject();

    res.status(200).json({
      message: 'Login successful',
      token,
      vendor: vendorData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

