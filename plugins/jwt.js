'use strict'

require('dotenv').config()
const fp = require('fastify-plugin')
const { default: fastifyJwt } = require('@fastify/jwt')

/**
 * This plugins issues Json Web Tokens for Authorization
 */
async function fastJWT(fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
}
module.exports = fp(fastJWT)
