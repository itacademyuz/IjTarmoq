const isAuthenticated = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', "Iltimos avval ro'yxatdan o'ting");
        return res.redirect('/login')
    }
    next();
}
module.exports = {isAuthenticated}