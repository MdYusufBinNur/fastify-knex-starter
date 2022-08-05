'use strict'

const fp = require('fastify-plugin')
const knex = require('knex')

async function knexPlugin(fastify, options, next) {
  try {
    if (!fastify.knex) {
      const handler = await knex(options)

      fastify.decorate('knex', handler)

      fastify.addHook('onClose', (fastify, done) => {
        if (fastify.knex === handler) {
          fastify.knex.destroy(done)
        }
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = fp(knexPlugin)
