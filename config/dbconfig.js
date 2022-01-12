module.exports = {
    host: "localhost",
    username: "root",
    password: "",
    dbname: "elering_vkg",
    dialect: "mysql",
    pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
  }