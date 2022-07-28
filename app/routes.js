'use strict'
const { errorHandler } = require('./common/errorHandler')
const authRoutes = require('./auth')
const { register, me } = require('./auth/auth.controller')

module.exports = async function (fastify, options) {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async function (request, reply) {
    return { root: true, hello: 'world' }
  })

  fastify.post('/register', register)
  fastify.get('/me', { onRequest: [fastify.authenticate] }, me)

  fastify.register(authRoutes, { prefix: '/v1/auth' })
}
