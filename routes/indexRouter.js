const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const validateId = require('../middleware/validateId');
const validateRegistration = require('../middleware/validateRegistration');
const validateLogin = require('../middleware/validateLogin');
const validateMessage = require('../middleware/validateMessage');
const validateSecret = require('../middleware/validateSecret');

indexRouter.get('/', indexController.getHomepage);
indexRouter.get('/sign-up', indexController.getRegisterPage);
indexRouter.post('/sign-up', validateRegistration, indexController.postNewUser);
indexRouter.get('/login', indexController.getLoginPage);
indexRouter.post('/login', validateLogin, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'true',
    })
);
indexRouter.get('/logout', indexController.logOutUser);
indexRouter.get('/message/:id', validateId, indexController.getNewMessagePage);
indexRouter.post('/message/:id', validateId, validateMessage, indexController.postNewMessage);
indexRouter.get('/message/:id/delete', validateId, indexController.deleteMessage);
indexRouter.get('/secret/:id', validateId, indexController.getSecretCodePage);
indexRouter.post('/secret/:id', validateId, validateSecret, indexController.upgradeUser);

module.exports = indexRouter;