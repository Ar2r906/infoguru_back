const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const theme_3 = sequelize.define(
    'theme_3',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.UUID,
        },
        question_1: {
            type: DataTypes.TEXT,
        },
        question_2: {
            type: DataTypes.TEXT,
        }
    },
    {
        tableName: 'theme_3',
        timestamps: true
    }
)

async function get_theme_3_table() {
    await theme_3.sync()
    console.log('Синхронизация с таблицей theme_3 выполнена')
}

module.exports = theme_3