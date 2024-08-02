const { sequelize } = require('../connection');
const { DataTypes } = require('sequelize');

const News = sequelize.define(
    'news', 
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
        tableName: 'news',
        timestamps: true,
    }
);

async function getNews() {
    await News.sync();
    console.log('Синхронизация выполнена');
}

module.exports = News;  // Экспортируем только модель
