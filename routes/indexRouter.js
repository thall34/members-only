const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
// const authentication = require('../middleware/authMiddleware');

indexRouter.get('/', indexController.getHomepage);
indexRouter.get('/sign-up', indexController.getRegisterPage);
indexRouter.post('/sign-up', indexController.postNewUser);
indexRouter.get('/login', indexController.getLoginPage);
indexRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'true',
    })
);
indexRouter.get('/logout', indexController.logOutUser);
indexRouter.get('/message/:id', indexController.getNewMessagePage);
indexRouter.post('/message/:id', indexController.postNewMessage);
indexRouter.get('/secret/:id', indexController.getSecretCodePage);
indexRouter.post('/secret/:id', indexController.upgradeUser);

module.exports = indexRouter;