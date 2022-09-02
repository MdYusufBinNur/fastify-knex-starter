'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')

const fp = require('fastify-plugin')
const { default: fastifyJwt } = require('@fastify/jwt')

/**
 * This plugins issues Json Web Tokens for Authorization
 * * P-256 ECDSA keys for JWT
 */
const fastJWT = async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: {
      private: readFileSync(`${join(__dirname, '..', 'certs')}/private.pem`),
      public: readFileSync(`${join(__dirname, '..', 'certs')}/public.pem`)
    },
    sign: { algorithm: 'ES256' }
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
