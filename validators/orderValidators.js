const { body, param } = require('express-validator');

exports.createOrderValidator = [
  body('name')
    .notEmpty()
    .withMessage('Order name is required'),

  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either pending or completed'),
];
