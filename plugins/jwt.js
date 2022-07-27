'use strict'

const fp = require('fastify-plugin')
const jwt = require('@fastify/jwt')

/**
 * This plugins adds cors functionalities
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(jwt, {
    secret: 'supersecret'
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
