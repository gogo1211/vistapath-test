module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.CI_USERNAME,
    password: process.env.CI_PASSWORD,
    database: process.env.CI_DATABASE,
    host: process.env.CI_HOST,
    port: process.env.CI_PORT,
    dialect: 'postgres'
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres'
  }
}
