'use strict'

const {
  userRole,
  userList,
  userById,
  createUser,
  updateUser,
  deleteUser
} = require('./user.services')

const { getCache, removeCache } = require('../../helpers/common/services')

/**
 * * Handler GET /v1/category/flush
 */
const flush = async function (request, reply) {
  await removeCache(this, 'user*')

  reply.code(200)
  return {
    error: false,
    message: 'User Cache Removed'
  }
}
/**
 * * Handler POST /v1/users/role
 */
const role = async function (request, reply) {
  const { action, id } = request.body

  const { message, data } = await userRole(this, { action, id })

  this.redis.set(`user:${id}`, JSON.stringify(data))

  reply.code(200)

  return {
    error: false,
    message
  }
}
/**
 * * Handler GET /v1/users/
 */
const fetchList = async function (request, reply) {
  const key = 'user'

  var data = await getCache(this, key)

  if (!data) {
    data = await userList(this)
    this.redis.set(key, JSON.stringify(data))
  }

  reply.code(200)

  return {
    error: false,
    message: 'User List Fetched!',
    data
  }
}
/**
 * * Handler GET /v1/users/:id
 */
const fetchById = async function (request, reply) {
  const id = request.params.id
  const key = `user:${id}`

  var data = await getCache(this, key)

  if (!data) {
    data = await userById(this, id)
    this.redis.set(key, JSON.stringify(data))
  }

  reply.code(200)

  return {
    error: false,
    message: `User ID: ${id} Fetched!`,
    data
  }
}
/**
 * * Handler POST /v1/users/
 */
const create = async function (request, reply) {
  await createUser(this, request.body)

  reply.code(201)

  return {
    error: false,
    message: 'Registration Sucessful'
  }
}

/**
 * * Handler PUT | PATCH /v1/users/:id
 */
const update = async function (request, reply) {
  const id = request.params.id
  const data = await updateUser(this, id, request.body)

  this.redis.set(`user:${id}`, JSON.stringify(data))

  reply.code(201)

  return {
    error: false,
    message: 'User Updated'
  }
}

/**
 * * Handler DELETE /v1/users/:id
 */
const destroy = async function (request, reply) {
  const id = request.params.id
  await deleteUser(this, id)

  this.redis.del(`user:${id}`)

  reply.code(200)
  return {
    error: false,
    message: `User with ID: ${id} deleted.`
  }
}

module.exports = { flush, role, fetchList, fetchById, create, update, destroy }
