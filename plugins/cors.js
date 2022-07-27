'use strict'

const fp = require('fastify-plugin')
const cors = require('@fastify/cors')

/**
 * This plugins adds cors functionalities
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(cors, {
    origin: ['localhost:9000', 'http://127.0.0.1:9000', '*.domain.com'],
    method: ['GET', 'PUT', 'POST', 'DELETE']
  })
})
