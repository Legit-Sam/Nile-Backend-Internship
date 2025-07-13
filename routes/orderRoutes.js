const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');
const { createOrderValidator } = require('../validators/orderValidators');
const { validate } = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Vendor Orders and Payouts
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation error or missing fields
 */
router.post('/', authenticate, createOrderValidator, validate, orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', authenticate, orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/payout/{vendorId}:
 *   get:
 *     summary: Get payout summary for a vendor
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the vendor
 *     responses:
 *       200:
 *         description: Payout summary with fee and net payout
 *       400:
 *         description: Invalid vendor ID or no completed orders
 */
router.get('/payout/:vendorId', authenticate, validate, orderController.getPayoutSummary);

module.exports = router;
