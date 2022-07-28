'use strict'

const { createUser } = require('../services/register.service')

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

module.exports = { registerHandler }
