const db = require('../db/queries');
const bcrypt = require('bcryptjs');

// Displays homepage
async function getHomepage(req, res, next) {
    console.log(req.user)
    const messages = await db.getAllMessages();
    console.log(messages)
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
    const id = Number(req.params.id)
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
    const id = Number(req.params.id);
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
        const user = req.body;
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

async function postNewMessage(req, res, next) {
    try {
        const id = Number(req.params.id)
        const message = req.body;
        console.log(id, message)
        await db.addMessage(id, message.title, message.text);
        res.redirect('/');
    } catch(error) {
        next(error);
    };
};

async function upgradeUser(req, res, next) {
    const code = req.body.secretCode;
    const id = Number(req.params.id)
    try {
        if (code === 'member') {
            await db.updateMember(id);
        };

        if (code === 'admin') {
            await db.updateAdmin(id);
        };

        res.redirect('/')
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
};