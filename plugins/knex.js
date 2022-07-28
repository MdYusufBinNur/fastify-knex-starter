'use strict'

const fp = require('fastify-plugin')
const knex = require('knex')
const dbConfig = require('../knexfile')

async function knexPlugin(fastify, options, next) {
  try {
    if (!fastify.knex) {
      const handler = await knex(dbConfig)

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
