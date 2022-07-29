'use strict'

const S = require('fluent-json-schema')

/**
 * Simple wrapper for response
 */
function responseBody(data) {
  if (data) {
    return S.object()
      .prop('error', S.boolean())
      .prop('message', S.string())
      .prop('access_token', S.string())
      .prop('data', data)
  }
  return S.object()
    .prop('error', S.boolean())
    .prop('message', S.string())
    .prop('access_token', S.string())
}

/**
 * Schema for /login endpoint
 */
const loginBody = S.object()
  .prop('email', S.string().minLength(6).maxLength(100).format('email').required())
  .prop('password', S.string().required())

const loginResponse = responseBody()

const loginSchema = {
  body: loginBody,
  response: { 200: loginResponse }
}

/**
 * Schema for /register endpoint
 */
const registerBody = S.object()
  .prop('name', S.string())
  .prop('email', S.string().minLength(6).maxLength(100).format('email').required())
  .prop('password', S.string().required())

const registerResponse = responseBody()

const registerSchema = {
  body: registerBody,
  response: { 201: registerResponse }
}

/**
 * Schema for /me endpoint
 */
const meResponse = responseBody(
  S.object()
    .prop('id', S.number().required())
    .prop('name', S.string())
    .prop('email', S.string().required())
    .prop('user_type', S.string())
    .prop('created_at', S.string())
    .prop('updated_at', S.string())
)
const meSchema = {
  response: { 200: meResponse }
}

module.exports = { loginSchema, registerSchema, meSchema }
