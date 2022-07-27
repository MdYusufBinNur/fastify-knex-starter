'use strict'

require('dotenv').config()
const fp = require('fastify-plugin')
const jwt = require('@fastify/jwt')

/**
 * This plugins issues Json Web Tokens for Authorization
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
