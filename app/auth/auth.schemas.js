'use strict'

const S = require('fluent-json-schema')
// const { EMAIL } = require('../../common/pattern') .pattern('')

const registerBody = S.object()
  .prop('email', S.string().minLength(6).maxLength(100).format('email').required())
  .prop('password', S.string().required())

// TODO: success message with data wrapper
const registerResponse = S.object().prop('access_token', S.string()).prop('email', S.string())

const registerSchema = {
  body: registerBody,
  response: { 201: registerResponse }
}

const meResponse = S.object().prop('email', S.string()).prop('iat', S.string())

const meSchema = {
  response: { 200: meResponse }
}

module.exports = { registerSchema, meSchema }
