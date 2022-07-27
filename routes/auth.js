'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true, hello: 'world' }
  })

  fastify.post('/signup', (req, reply) => {
    const token = fastify.jwt.sign({ username: 'Axel Tahmid' })
    reply.send({ token })
  })

  fastify.get(
    '/me',
    {
      onRequest: [fastify.authenticate]
    },
    async function (request, reply) {
      return request.user
    }
  )
}
