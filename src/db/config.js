const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('myblog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
})
const connect = async(forceOption)=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: forceOption})
        console.log(`Ma'lumotlar ba'zasi bilan aloqa bog'landi`);
    } catch (e) {
        console.log(`Bazaga ulanishda xatolik yuz berdi`, e);
    }
}

module.exports = {connect, sequelize}
