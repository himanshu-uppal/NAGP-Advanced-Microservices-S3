const Sequelize = require('sequelize')
const {
    user
} = require('./user');

const db = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    database: 'nagpmicroservices',
    password: 'root',
    host: process.env.DB_SERVICE_URL || '35.223.40.69',
    port: 3306
});

// User Model 
const User = db.define('user', user)

module.exports = {
    db,
    User
}