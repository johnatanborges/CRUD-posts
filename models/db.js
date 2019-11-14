const Sequelize = require('sequelize')

// DB MySql connection
    const sequelize = new Sequelize('postapp', 'root', '85520', {
        host: 'localhost',
        dialect: 'mysql',
    })

module.exports = {
    Sequelize,
    sequelize
}