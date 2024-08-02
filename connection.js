const { Sequelize } = require('sequelize')
const dbConfig = require('./config/db.config.js')

const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: console.log,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

async function connect() {
    try {
        await sequelize.authenticate()
        console.log('db connected');
    } catch (error) {
        console.error('error', error.message);

        if(error instanceof Sequelize.ConnectionError) {
            console.error('connection error', error)
        } else {
            console.error('other error', error)
        }
    }
}

connect()

module.exports = { sequelize }