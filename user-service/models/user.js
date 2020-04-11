const Sequelize = require('sequelize')
const DT = Sequelize.DataTypes

module.exports = {
    user: {
        id: {
            type: DT.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        age: {
            type: DT.INTEGER(11),
            allowNull: false
        },
        name: {
            type: DT.STRING(50),
            allowNull: false
        },
        email: {
            type: DT.STRING(70),
            allowNull: false
        }
    }
}