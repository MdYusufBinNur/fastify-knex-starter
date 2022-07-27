'use strict'

const fp = require('fastify-plugin')
const helmet = require('@fastify/helmet')

/**
 * This plugins adds essential security headers.
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(helmet, { global: true })
})
