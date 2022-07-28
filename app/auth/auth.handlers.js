'use strict'

const { createUser, fetchUser } = require('./auth.services')

// if async, reply.code(200); return req.user;
// if sync,  reply.code(200),send(req.user);

async function register(request, reply) {
  /**
   * * 1. Check for any extra validations
   * * 2. Format the data that is to be passed to services
   * * 3. Receive the response and make any changes if required.
   */

  this.log.info('here in handler')

  const data = await createUser(this, { request })

  reply.code(201)
  return data
}

async function me(request, reply) {
  const data = await fetchUser(this, { request })

  reply.code(200)
  return data
}

module.exports = { register, me }
