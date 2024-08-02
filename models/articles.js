const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const Articles = sequelize.define(
    'articles', 
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
        },
        content: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        }
    },
    {
        tableName: 'articles',
        timestamps: true,
    }
)

async function getArticles() {
    await Articles.sync();
    console.log('Синхронизация выполнена')
}

module.exports =  Articles ;