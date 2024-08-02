const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const theme_1 = sequelize.define(
    'theme_1',
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
        },
        question_11: {
            type: DataTypes.TEXT,
        },
        question_12: {
            type: DataTypes.TEXT,
        }
    },
    {
        tableName: 'theme_1',
        timestamps: true
    }
)

async function get_theme_1_table() {
    await theme_1.sync()
    console.log('Синхронизация с таблицей theme_2 выполнена')
}

module.exports = theme_1