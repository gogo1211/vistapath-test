module.exports = {
  development: {
    username: 'postgres',
    password: 'LM2450252',
    database: 'vistapath',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    connectionString: '',
    dialect: 'postgres'
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
