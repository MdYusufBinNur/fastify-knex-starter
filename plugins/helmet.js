'use strict'

const fp = require('fastify-plugin')
const helmet = require('@fastify/helmet')

/**
 * This plugins adds cors functionalities
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(helmet, { global: true })
})
