const { body } = require('express-validator');

const validateRegistration = [
    body('firstName')
    .trim()
    .notEmpty().withMessage('Must include a first name')
    .isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
    body('firstName')
    .trim()
    .notEmpty().withMessage('Must include a first name')
    .isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
    body('username')
    .trim()
    .notEmpty().withMessage('Must include an email')
    .isLength({ max: 50 }).withMessage('Email must be less than 50 characters')
    .isEmail().withMessage('Must be a valid email (example@example.com)')
    .normalizeEmail(),
    body('password')
    .trim()
    .notEmpty().withMessage('Must include a password')
    .isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters but less than 20')
    .isStrongPassword({
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Password must contain at least 1 lower case letter, 1 upper case letter, 1 number, and 1 symbol'),
    body('confirmPassword')
    .trim()
    .notEmpty().withMessage('Please confirm your password by entering it again')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        };

        return true;
    }),
];

module.exports = validateRegistration;