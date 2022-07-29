'use strict'

const { createUser, authenticate, fetchUser } = require('./auth.services')

/**
 * Handler for /register
 */
async function register(request, reply) {
  const { name, email, password } = request.body

  await createUser(this, { name, email, password })

  const response_data = {
    error: false,
    message: 'Registration Sucessful'
  }

  reply.code(201)
  reply.send(response_data)
  return
}

/**
 * Handler for /login
 */
async function login(request, reply) {
  const { email, password } = request.body

  const user_email = await authenticate(this, { email, password })

  const access_token = this.jwt.sign({ email: user_email })

  const response_data = {
    error: false,
    message: 'Login Sucessful',
    access_token
  }

  reply.code(200)
  reply.send(response_data)
  return
}

/**
 * Handler for /me
 */
async function me(request, reply) {
  const { email } = request.user

  const data = await fetchUser(this, email)

  const response_data = {
    error: false,
    message: 'User Fetched!',
    data
  }

  reply.code(200)
  reply.send(response_data)
  return
}

module.exports = { login, register, me }
