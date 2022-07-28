'use strict'

const { registerSchema } = require('./schemas/register.schema')
const { registerHandler } = require('./handlers/register.handler')
// const { me: meSchema } = require('./schemas/me.schema')
// const { meHandler } = require('./handlers/me.handler')

module.exports = async function (fastify, options) {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: registerHandler
  })

  // fastify.route({
  //   method: 'GET',
  //   url: '/me',
  //   onRequest: fastify.authenticate,
  //   schema: meSchema,
  //   handler: meHandler
  // })
}
