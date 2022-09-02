'use strict'

require('dotenv').config()

const Fastify = require('fastify')
const closeWithGrace = require('close-with-grace')
const { default: fastifyCors } = require('@fastify/cors')
const { default: fastifyHelmet } = require('@fastify/helmet')
const { default: fastifySensible } = require('@fastify/sensible')
const { default: fastifyRedis } = require('@fastify/redis')

const knexconf = require('./knexfile')
const knex = require('./helpers/plugins/knex')
const fastJWT = require('./helpers/plugins/jwt')
const routes = require('./app/routes')

/**
 * * give array of ip for trustproxy in production
 */
const app = Fastify({
  trustProxy: true,
  logger: {
    transport:
      process.env.NODE_ENV == 'dev'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname'
            }
          }
        : undefined
  }
})

const corsOptions = {
  origin: [
    /\.example\.com$/,
    'http://localhost:3000',
  ],
  method: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.register(fastifyCors, corsOptions)
app.register(fastifyHelmet, { global: true })
app.register(fastifySensible)

app.register(fastifyRedis, {
  host: process.env.REDIS_URL || 'redis.redis.svc.cluster.local',
  port: process.env.REDIS_PORT || '6379'
})

app.register(knex, knexconf)
app.register(fastJWT)

/**
 * * Register the app directory
 */
app.register(routes)

/**
 *  * delay is the number of milliseconds for the graceful close to finish
 * */
const closeListeners = closeWithGrace({ delay: 2000 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

app.listen(
  {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  err => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
)
