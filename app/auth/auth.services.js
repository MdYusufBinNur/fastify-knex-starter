'use strict'

/**
 * Service for /login
 */
async function authenticate(fastify, data) {
  const { email, password } = data

  const query = await fastify.knex('users').where('email', email)

  if (query.length == false) throw fastify.httpErrors.notFound(`User: ${email}, not found!`)

  const match = await fastify.bcrypt.compare(password, query[0].password)

  if (match == false) throw fastify.httpErrors.forbidden('Password Incorrect!')

  return email
}

/**
 * Service for /register
 */
async function createUser(fastify, data) {
  const { name, email, password } = data

  const query = await fastify.knex('users').where('email', email)

  if (query.length == true)
    throw fastify.httpErrors.badRequest(`User: ${email} already exists! Please Login`)

  const hash = await fastify.bcrypt.hash(password)
  const role = 'customer'

  await fastify.knex.insert({ name, email, password: hash, user_type: role }).into('users')

  return
}

/**
 * Service for /me
 */
async function fetchUser(fastify, email) {
  const query = await fastify.knex('users').where('email', email)

  if (query.length == false) throw fastify.httpErrors.notFound(`User: ${email}, not found!`)

  return query[0]
}

module.exports = { createUser, authenticate, fetchUser }
