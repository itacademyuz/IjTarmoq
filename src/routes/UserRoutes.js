const express = require('express');
const {catchAsync} = require('../helpers/catchAsync');
const passport = require('passport')
const { 
    registerUser,
    loginUser
} = require('../controllers/UserController');


const UserRouter = express.Router()
UserRouter.post('/register', catchAsync(registerUser));
UserRouter.post('/login', passport.authenticate('local', {failureFlash: false, failureRedirect: '/'}), loginUser)

module.exports = {UserRouter}