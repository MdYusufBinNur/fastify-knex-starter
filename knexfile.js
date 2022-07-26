require('dotenv').config()
const { resolve } = require('path')

const debug = process.env.NODE_ENV == 'dev' ? true : false

const dbConfig = {
  client: 'mysql',
  pool: {
    min: parseInt(process.env.DB_MIN_CONNECTIONS),
    max: parseInt(process.env.DB_MAX_CONNECTIONS)
  },
  acquireConnectionTimeout: 10000,
  migrations: {
    tableName: 'knex_migrations',
    directory: resolve(__dirname, 'database/migrations')
  },
  seeds: {
    directory: resolve(__dirname, 'database/seeds')
  },
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  asyncStackTraces: true,
  debug: debug
}

module.exports = dbConfig
