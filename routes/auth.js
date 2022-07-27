'use strict'

const { register, me } = require('../controllers/auth')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true, hello: 'world' }
  })

  fastify.post('/register', register)
  fastify.get('/me', { onRequest: [fastify.authenticate] }, me)
}
