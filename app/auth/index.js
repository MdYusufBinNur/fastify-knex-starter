'use strict'

const { registerHandler, meHandler } = require('./auth.handlers')
const { registerSchema, meSchema } = require('./auth.schemas')

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: registerHandler
  })

  fastify.route({
    method: 'GET',
    url: '/me',
    onRequest: fastify.authenticate,
    schema: meSchema,
    handler: meHandler
  })
}
