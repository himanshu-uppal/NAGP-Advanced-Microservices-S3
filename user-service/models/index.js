const Sequelize = require('sequelize')
const {
    user
} = require('./user');

const db = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    database: 'nagpmicroservices',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_SERVICE_URL,
    port: 3306
});

// User Model 
const User = db.define('user', user)

module.exports = {
    db,
    User
}