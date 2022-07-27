'use strict'

async function register(req, reply) {
  try {
    const token = await this.jwt.sign({ user_email: 'axel.tahmid@gmail.com' })
    reply.send({ token })
  } catch (err) {
    reply.send({ err })
  }
}

async function me(req, reply) {
  try {
    reply.send(req.user)
  } catch (err) {
    reply.send({ err })
  }
}

module.exports = { register, me }
