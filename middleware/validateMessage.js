const { body } = require('express-validator');

const validateMessage = [
    body('title')
    .trim()
    .notEmpty().withMessage('Must include a title')
    .isLength({ max: 50 }),
    body('text')
    .trim()
    .notEmpty().withMessage('Must include a message')
    .isLength({ max: 150 }).withMessage('Message must be shorter than 150 characters'),
];

module.exports = validateMessage;