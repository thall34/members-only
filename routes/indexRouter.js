const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const authentication = require('../middleware/authMiddleware');

indexRouter.get('/', authentication, indexController.getHomepage);
indexRouter.get('/sign-up', indexController.getRegisterPage);
indexRouter.post('/sign-up', indexController.postNewUser);
indexRouter.get('/login', indexController.getLoginPage);
indexRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'true',
    })
);
indexRouter.get('/message', indexController.getNewMessagePage);
indexRouter.get('/secret', indexController.getSecretCodePage);

module.exports = indexRouter;