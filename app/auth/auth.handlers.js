'use strict'

const { createUser, fetchUser } = require('./auth.services')

async function registerHandler(request, reply) {
  /**
   * * 1. Check for any extra validations
   * * 2. Format the data that is to be passed to services
   * * 3. Receive the response and make any changes if required.
   */

  this.log.info('here in handler')

  const data = await createUser(this, { request })

  return reply.code(201).send(data)
}

async function meHandler(request, reply) {
  this.log.info('here in me handler')

  const data = await fetchUser(this, { request })

  // introduces race condition, if async, use return not reply
  // reply.send(req.user)
  return reply.code(200).send(data)
}

module.exports = { registerHandler, meHandler }
