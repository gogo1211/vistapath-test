var parse = require('pg-connection-string').parse;
 
var config = parse(process.env.DATABASE_URL)

module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: 'postgres'
  },
  test: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: 'postgres'
  },
  production: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: 'postgres'
  }
}
