'use strict'

async function register(req, reply) {
  try {
    const token = await this.jwt.sign({ user_email: 'axel.tahmid@gmail.com' })
    return { token }
  } catch (err) {
    return err
  }
}

async function me(req, reply) {
  try {
    // introduces race condition, if async, use return not reply
    // reply.send(req.user)
    return req.user
  } catch (err) {
    return err
  }
}

module.exports = { register, me }
