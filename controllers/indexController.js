const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator');

// Displays homepage
async function getHomepage(req, res, next) {
    const messages = await db.getAllMessages();
    try {
        res.render('index', {
            title: 'Secret Message Club',
            user: req.user,
            messages: messages,
        });

    } catch (err) {
        next(err);
    };
};

// Displays login page
async function getLoginPage(req, res, next) {
    try {
        res.render('login-page', {
            title: 'User Login'
        });
    } catch(error) {
        next(error);
    };
};

// Displays new user page
async function getRegisterPage(req, res, next) {
    try {
        res.render('register-page', {
            title: 'Register New User'
        });
    } catch(error) {
        next(error);
    };
};

// Displays form page for adding a new message
async function getNewMessagePage(req, res, next) {
    const id = req.validatedId;
    try {
        res.render('new-message', {
            title: 'New Message',
            id: id,
        });
    } catch(error) {
        next(error);
    };
};

// Displays the secret code page to authenticate members and admins
async function getSecretCodePage(req, res, next) {
    const id = req.validatedId;
    try {
        res.render('secret-code', {
            title: 'What is the secret code?',
            id: id,
        });
    } catch(error) {
        next(error);
    };
};

// Adds new user to database
async function postNewUser(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('register-page', {
                title: 'Register New User',
                errors: errors.array()
            });
        };

        const user = matchedData(req);
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await db.createUser(user.firstName, user.lastName, user.username, hashedPassword);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

// Logs current user out of passport session
async function logOutUser(req, res, next) {
    try {
        req.logout((error) => {
            if (error) {
                return next(error);
            };
            
            res.redirect('/')
        });
    } catch(error) {
        next(error);
    };
};

// Adds new message to database
async function postNewMessage(req, res, next) {
    try {
        const errors = validationResult(req);
        const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).render('new-message', {
                title: 'What is the secret code?',
                id: id,
                errors: errors.array()
            });
        };

        const message = matchedData(req);
        await db.addMessage(id, message.title, message.text);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

// Upgrades user to member or admin if code is correct
async function upgradeUser(req, res, next) {
    try {
        const errors = validationResult(req);
        const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).render('secret-code', {
                title: 'New Message',
                id: id,
                errors: errors.array()
            });
        };

        const code = matchedData(req)
        if (code.secretCode === 'member') {
            await db.updateMember(id);
        };

        if (code.secretCode === 'admin') {
            await db.updateAdmin(id);
        };

        res.redirect('/')
    } catch(error) {
        next(error);
    };
};

// Deletes message from database using message id
async function deleteMessage (req, res, next) {
    const id = req.validatedId;
    try {
        await db.deleteMessage(id);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

module.exports = {
    getHomepage,
    getLoginPage,
    getRegisterPage,
    getNewMessagePage,
    getSecretCodePage,
    postNewUser,
    logOutUser,
    postNewMessage,
    upgradeUser,
    deleteMessage,
};