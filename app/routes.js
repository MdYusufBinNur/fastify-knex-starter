'use strict'

const authRoutes = require('./auth')

module.exports = async function (fastify, options) {
  fastify.get('/', async function (request, reply) {
    return { hello: 'world' }
  })

  fastify.register(authRoutes, { prefix: '/v1/auth' })
}
