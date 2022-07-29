'use strict'

const { errorHandler } = require('./common/error.handler')
const authRoutes = require('./auth')

module.exports = async function (fastify, options) {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async function (request, reply) {
    return { hello: 'world' }
  })

  fastify.register(authRoutes, { prefix: '/v1/auth' })
}
