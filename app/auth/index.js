'use strict'

const { login, register, me } = require('./auth.handlers')
const { loginSchema, registerSchema, meSchema } = require('./auth.schemas')
const bcrypt = require('./bcrypt')

module.exports = async function (fastify) {
  fastify.register(bcrypt)

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: register
  })

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: login
  })

  fastify.route({
    method: 'GET',
    url: '/me',
    onRequest: fastify.authenticate,
    schema: meSchema,
    handler: me
  })
}
