const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const auth = sequelize.define(
    'auth',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: DataTypes.UUID
        },
        role: {
            type: DataTypes.TEXT
        },
        AccessToken: {
            type: DataTypes.TEXT
        },
        RefreshToken: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT,
            required: true,
            minlength: 8,
        },
        email: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'auths',
        timestamps: true
    }
)

async function get_auth_table() {
    await auth.sync()
    console.log('Синхронизация выполнена');
}

module.exports = { auth, get_auth_table }