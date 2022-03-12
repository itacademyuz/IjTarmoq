const { User } = require("../User");

const findByEmail = async (email) =>{
    return await User.findOne({where: {email: email}})
}
const findByID = async(id)=>{
    return await User.findByPk(id)
}

module.exports = {
    findByEmail, 
    findByID
}