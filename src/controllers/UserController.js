const { User} = require('../models/User')

const renderRegisterPage = (req, res)=>{
    res.render('users/register');
}
const registerUser = async (req, res, next)=>{
    try {
        const {user} = req.body;
        const userObj = await User.create(user);
        req.login(userObj, err=>{
            if(err){
                return next(err);
            }
            req.flash('success', "Saytimizga xush kelibsiz");
            res.redirect('/posts');
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/registers');
    }
}
const renderLoginPage = (req, res)=>{
    res.render('users/login')
}
const loginUser = (req, res)=>{
    req.flash('success', 'Xush kelibsiz');
    const redirectUrl = req.session.returnTo || '/posts'
    delete req.session.returnTo
    res.redirect(redirectUrl);
}
const logoutUser = (req, res)=>{
    req.logout();
    res.redirect('/posts');
}
module.exports = {
    renderRegisterPage,
    registerUser,
    renderLoginPage,
    loginUser,
    logoutUser
}