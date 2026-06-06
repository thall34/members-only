const { body } = require('express-validator');

const validateSecret = [
    body('secretCode')
    .trim()
    .notEmpty().withMessage('Please enter a secret code or go back to home page')
    .custom((value) => {
        if (value !== 'member' && value !== 'admin') {
            throw new Error(`Nuh uh uh, you didn't say the magic word`);
        };

        return true;
    }),
];

module.exports = validateSecret;