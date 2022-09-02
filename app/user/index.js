'use strict'

const { default: formBodyPlugin } = require('@fastify/formbody')
const bcrypt = require('../../helpers/plugins/bcrypt')

const { is_admin } = require('../../helpers/common/hooks')
const { flush, fetchList, fetchById, create, update, destroy, role } = require('./user.handlers')
const {
  fetchListSchema,
  fetchByIdSchema,
  createSchema,
  updateSchema,
  removeSchema,
  roleSchema
} = require('./user.schemas')

const { flushSchema } = require('../../helpers/common/schema')

module.exports = async function (fastify) {
  fastify.register(formBodyPlugin)
  fastify.register(bcrypt)

  fastify.route({
    method: 'POST',
    url: '/role',
    onRequest: is_admin,
    schema: roleSchema,
    handler: role
  })

  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: is_admin,
    schema: fetchListSchema,
    handler: fetchList
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    onRequest: is_admin,
    schema: fetchByIdSchema,
    handler: fetchById
  })

  fastify.route({
    method: 'POST',
    url: '/',
    onRequest: is_admin,
    schema: createSchema,
    handler: create
  })

  fastify.route({
    method: ['PUT', 'PATCH'],
    url: '/:id',
    onRequest: is_admin,
    schema: updateSchema,
    handler: update
  })

  fastify.route({
    method: 'DELETE',
    url: '/flush',
    onRequest: is_admin,
    schema: flushSchema,
    handler: flush
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    onRequest: is_admin,
    schema: removeSchema,
    handler: destroy
  })
}
