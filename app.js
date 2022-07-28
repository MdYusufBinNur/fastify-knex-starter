'use strict'
const { join } = require('path')
const AutoLoad = require('@fastify/autoload')
const routes = require('./app/routes')

module.exports = async function (fastify, opts) {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(routes)
}
