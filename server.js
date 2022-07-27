'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')

const environment = process.env.NODE_ENV

// Instantiate Fastify with some config
// give array of ip for trustproxy in production
const app = Fastify({
  trustProxy: true,
  logger: {
    transport:
      environment === 'dev'
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

// Register your application as a normal plugin.
const appService = require('./app.js')

app.register(appService)

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen({ port: process.env.PORT || 3000 }, err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
