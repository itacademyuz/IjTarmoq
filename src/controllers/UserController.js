const { User} = require('../models/User')


const registerUser = async (req, res, next)=>{
    try {
        const {user} = req.body;
        const userObj = await User.create(user);
        req.login(userObj, err=>{
            if(err){
                return next(err);
            }
            res.status(201).json({xabar: "Siz ro'yxatdan o'tdingiz"})
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e.message})
    }
}

const loginUser = (req, res)=>{
    res.status(200).json({msg:` Xush kelibsiz ${req.user.first_name}`})
}

module.exports = {
    registerUser,
    loginUser
}