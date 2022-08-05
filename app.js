'use strict'

const { default: fastifyCors } = require('@fastify/cors')
const { default: fastifyHelmet } = require('@fastify/helmet')
const { default: fastifySensible } = require('@fastify/sensible')
const { default: formBodyPlugin } = require('@fastify/formbody')
const { default: fastifyMultipart } = require('@fastify/multipart')

const dbConfig = require('./knexfile')
const knex = require('./plugins/knex')
const fastJWT = require('./plugins/jwt')
const routes = require('./app/routes')

module.exports = async function (fastify, opts) {
  fastify.register(fastifyCors, {
    origin: ['http://127.0.0.1:9000', '/.*.arektacoinstore.com/', 'arektacoinstore.com'],
    method: ['GET', 'PUT', 'POST', 'DELETE']
  })
  fastify.register(fastifyHelmet, { global: true })

  fastify.register(formBodyPlugin)

  fastify.register(fastifyMultipart)

  fastify.register(fastifySensible)

  fastify.register(knex, dbConfig)

  fastify.register(fastJWT)

  fastify.register(routes)
}
