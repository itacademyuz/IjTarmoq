const LocalStrategy = require('passport-local');
const {User} = require('../models/User');
const { BlogError } = require('./BlogErrors');

const localConfig = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async(email, password, done)=>{
        try {
            console.log(email);
            const user =  await User.findOne({where: {email: email}});
            if(!user) return done(null, false);
            const isCorrectPassword = await user.verifyPassword(password);
            if(!isCorrectPassword) return done(null, false);
            return done(null, user);
        } catch (e) {
            throw new BlogError(e.message, 500);
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })
    passport.deserializeUser(async(id, done)=>{
        try {
            const user = await User.findByPk(id);
            done(null, user)
        } catch (e) {
            throw new BlogError(e.message, 500)
        }
    })
}

module.exports = {localConfig}