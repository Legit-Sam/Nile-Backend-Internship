const express = require('express');
const { loginVendor, registerVendor } = require('../controllers/authController');
const { registerVendorValidator, loginVendorValidator } = require('../validators/vendorValidator');
const { validate } = require('../middleware/validate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Vendor Authentication
 */

/**
 * @swagger
 * /api/vendors/register:
 *   post:
 *     summary: Register a new vendor
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - bank_account
 *               - store_name
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               bank_account:
 *                 type: string
 *               store_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Vendor already exists or validation failed
 */


router.post("/register", registerVendorValidator, validate, registerVendor);

/**
 * @swagger
 * /api/vendors/login:
 *   post:
 *     summary: Login a vendor and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     store_name:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginVendorValidator, validate, loginVendor);

module.exports = router;
