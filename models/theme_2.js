const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const theme_2 = sequelize.define(
    'theme_2',
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
        },
        question_3: {
            type: DataTypes.TEXT,
        },
        question_4: {
            type: DataTypes.TEXT,
        },
        question_5: {
            type: DataTypes.TEXT,
        },
        question_6: {
            type: DataTypes.TEXT,
        },
        question_7: {
            type: DataTypes.TEXT,
        },
        question_8: {
            type: DataTypes.TEXT,
        },
        question_9: {
            type: DataTypes.TEXT,
        },
        question_10: {
            type: DataTypes.TEXT,
        }
    },
    {
        tableName: 'theme_2',
        timestamps: true
    }
)

async function get_theme_2_table() {
    await theme_2.sync()
    console.log('Синхронизация с таблицей theme_2 выполнена')
}

module.exports = theme_2