const db = require('../db/queries');
const bcrypt = require('bcryptjs');

// Displays homepage
async function getHomepage(req, res, next) {
    console.log(req.user)
    try {
        res.render('index', {
            title: 'Secret Message Club',
            user: req.user || null
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
    try {
        res.render('new-message', {
            title: 'New Message'
        });
    } catch(error) {
        next(error);
    };
};

// Displays the secret code page to authenticate members and admins
async function getSecretCodePage(req, res, next) {
    try {
        res.render('secret-code', {
            title: 'What is the secret code?'
        });
    } catch(error) {
        next(error);
    };
};

// Adds new user to database
async function postNewUser(req, res, next) {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await db.createUser(user.firstName, user.lastName, user.username, hashedPassword);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

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

module.exports = {
    getHomepage,
    getLoginPage,
    getRegisterPage,
    getNewMessagePage,
    getSecretCodePage,
    postNewUser,
    logOutUser,
};