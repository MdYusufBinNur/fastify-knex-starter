'use strict'
const { is_admin } = require('../helpers/common/hooks')

const authRoutes = require('./auth')
const userRoutes = require('./user')

module.exports = async function (fastify, options) {
  /**
   * * Entrypoint Cache Test
   */
  fastify.get('/', async function (request, reply) {
    const key = 'web:hello'

    var data = await fastify.redis.get(key, (error, value) => {
      if (error) fastify.log.warn(error)
      if (value != null) {
        return value
      }
    })

    if (!data) {
      data = 'Hello World'
      this.redis.set(key, 'Redis => API for Website')
    }

    reply.code(200)
    return {
      error: false,
      message: data
    }
  })

  /**
   * * Global Redis Flush
   */
  fastify.delete('/flush', { onRequest: is_admin }, async function (request, reply) {
    const res = await fastify.redis.flushall('SYNC', (error, success) => {
      if (error) fastify.log.error(error)
      if (success === 'OK') {
        fastify.log.info('Redis Cache flushed.')
      }
    })

    if (res === 'OK') {
      reply.code(200)
      return {
        error: false,
        message: 'Redis globally flushed'
      }
    }

    reply.code(400)
    return {
      error: true,
      message: 'Action Not Performed'
    }
  })

  /**
   * * Service Routes Registration with Prefix
   */
  fastify.register(authRoutes, { prefix: '/v1/auth' })
  fastify.register(userRoutes, { prefix: '/v1/user' })
}
