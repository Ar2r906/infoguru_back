const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')
const { auth } = require('./auths')
const { PASSWORD } = require('../config/db.config')

const user = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.TEXT
        },
        second_name: {
            type: DataTypes.TEXT
        },
        patr_name: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'users',
        timestamps: true
    }
)

user.belongsTo(auth, {
    as: 'Uid',
    foreignKey: 'uid'
})

async function get_user_table() {
    await user.sync()
    console.log('Синхронизация выполнена');
}
module.exports = { user, get_user_table }