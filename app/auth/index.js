'use strict'

const { register, me } = require('./auth.handlers')
const { registerSchema, meSchema } = require('./auth.schemas')

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: register
  })

  fastify.route({
    method: 'GET',
    url: '/me',
    onRequest: fastify.authenticate,
    schema: meSchema,
    handler: me
  })
}
