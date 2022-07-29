'use strict'

async function createUser(fastify, { request }) {
  const { email, password } = request.body

  const hash = await fastify.bcrypt.hash(password)

  // fastify.log.info(`hashed password: ${hash}`)

  await fastify.knex.insert({ email, password: hash }).into('users')

  const access_token = fastify.jwt.sign({ email: email })

  return { access_token, email }
}

async function authenticate(fastify, { request }) {
  const { email, password } = request.body

  // fastify.log.info('login query: ')
  const query = await fastify.knex('users').where('email', email)
  // fastify.log.info(query)

  if (query.length == false)
    throw fastify.httpErrors.notFound(`User with email: ${email}, not found!`)

  const match = await fastify.bcrypt.compare(password, query[0].password)

  if (match == false) throw fastify.httpErrors.forbidden('Password Incorrect!')

  const access_token = fastify.jwt.sign({ email: email })

  return { data: query[0], access_token }
}

async function fetchUser(fastify, { request }) {
  try {
    fastify.log.info('here in me service')

    // var check = await fastify.knex('users').where({ email: email })
    // fastify.log.info('check query')
    // fastify.log.info(check)
    // if (check) {
    //   throw new Error(`User with email: ${email} already exists`)
    // }

    var check = await fastify.knex('users').where({ email: request.user })

    return check
  } catch (err) {
    return err
  }
}

module.exports = { createUser, authenticate, fetchUser }
