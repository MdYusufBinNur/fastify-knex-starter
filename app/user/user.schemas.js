'use strict'

const S = require('fluent-json-schema')

const {
  userObject,
  emailPassObj,
  responseObject,
  responseListObject
} = require('../../helpers/common/schema')

/**
 * * Schema GET /v1/users/
 */
const fetchListSchema = {
  response: { 200: responseListObject(userObject) }
}
/**
 * * Schema GET /v1/users/:id
 */
const fetchByIdSchema = {
  params: S.object().prop('id', S.number().required()),
  response: { 200: responseObject(userObject) }
}
/**
 * * Schema POST /v1/users/
 */
const createSchema = {
  body: emailPassObj.prop('email_verified', S.boolean()),
  response: { 201: responseObject() }
}
/**
 * * Schema PUT | PATCH /v1/users/:id
 */
const updateUserBody = S.object()
  .prop('email', S.string().minLength(6).maxLength(100).format('email'))
  .prop('password', S.string())
  .prop('email_verified', S.boolean())

const updateSchema = {
  // querystring: S.object().prop('id', S.number().required()),
  params: S.object().prop('id', S.number().required()),
  body: updateUserBody,
  response: { 201: responseObject(userObject) }
}
/**
 * * Schema DELETE /v1/users/:id
 */
const removeSchema = {
  params: S.object().prop('id', S.number().required()),
  response: { 201: responseObject(userObject) }
}
/**
 * * Schema POST /v1/users/role
 */
const roleBody = S.object()
  .prop('id', S.number().required())
  .prop('action', S.enum(['grant', 'revoke']).required())

const roleSchema = {
  body: roleBody,
  response: { 200: responseObject() }
}

module.exports = {
  fetchListSchema,
  fetchByIdSchema,
  createSchema,
  updateSchema,
  removeSchema,
  roleSchema
}
