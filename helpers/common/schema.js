'use strict'

const S = require('fluent-json-schema')

const responseObject = data =>
  S.object()
    .prop('error', S.boolean().required())
    .prop('message', S.string().required())
    .prop('data', data)

const responseListObject = data =>
  S.object()
    .prop('error', S.boolean().required())
    .prop('message', S.string().required())
    .prop('data', S.array().items(data).required())

const userObject = S.object()
  .prop('id', S.number())
  .prop('email', S.string())
  .prop('email_verified', S.boolean())
  .prop('is_admin', S.boolean())
  .prop('created_at', S.string().format('date'))
  .prop('updated_at', S.string().format('date'))

const emailPassObj = S.object()
  .prop('email', S.string().minLength(6).maxLength(100).format('email').required())
  .prop('password', S.string().required())



const flushSchema = {
  response: { 200: responseObject() }
}

module.exports = {
  responseObject,
  responseListObject,
  userObject,
  emailPassObj,
  productPublicObj,
  flushSchema
}
