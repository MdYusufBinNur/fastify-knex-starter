'use strict'

async function createUser(fastify, { request }) {
  try {
    const { email, password } = request.body

    fastify.log.info('here in service')

    // fastify.knex('users').insert({ email, password })
    //   if (error) throw error;
    //   return createUser;

    const access_token = fastify.jwt.sign({ email: email })

    return { access_token, email }
  } catch (err) {
    return err
  }
}

async function fetchUser(fastify, { request }) {
  try {
    fastify.log.info('here in me service')

    // fastify.knex('users').insert({ email, password })

    return request.user
  } catch (err) {
    return err
  }
}

module.exports = { createUser, fetchUser }
