const express = require('express');
const {catchAsync} = require('../helpers/catchAsync');
const {upload} = require('../helpers/photoHandler');
const passport = require('passport')
const { 
    registerUser,
    loginUser,
    renderRegisterPage, 
    renderLoginPage,
    logoutUser
} = require('../controllers/UserController');


const UserRouter = express.Router()
UserRouter.get('/register', renderRegisterPage);
UserRouter.post('/register', upload.single('avatar'), catchAsync(registerUser));
UserRouter.get('/login', renderLoginPage)
UserRouter.post('/login', passport.authenticate('local', {failureFlash: false, failureRedirect: '/'}), loginUser)
UserRouter.get('/logout', logoutUser)
module.exports = {UserRouter}