import { body } from 'express-validator'

export const registerVendorValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('bank_account').notEmpty().withMessage('Bank account is required'),
  body('store_name').notEmpty().withMessage('Store name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

export const loginVendorValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]