'use strict'

const fp = require('fastify-plugin')
// const multipart = require('@fastify/multipart')
const formbody = require('@fastify/formbody')

/**
 * This plugins adds essential security headers.
 */
module.exports = fp(async function (fastify, opts) {
  // fastify.register(multipart)
  fastify.register(formbody)
})
