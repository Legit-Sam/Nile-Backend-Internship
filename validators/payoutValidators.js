const { param } = require('express-validator');

exports.getPayoutSummaryValidator = [
  param('vendorId').isMongoId().withMessage('Invalid vendor ID')
];
