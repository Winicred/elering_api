const dbConfig = require("./dbconfig")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

module.exports = sequelize;