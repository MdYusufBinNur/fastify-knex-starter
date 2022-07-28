'use strict'

const { PASSWORD } = require('../../common/pattern')
const { errorSchemas } = require('../../common/schema')

const bodyJsonSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 6,
      maxLength: 100
    },
    password: {
      type: 'string'
      // pattern: PASSWORD
    }
  }
}

const responseJsonSchema = {
  type: 'object',
  properties: {
    access_token: { type: 'string' },
    email: { type: 'string' }
  }
}

const registerSchema = {
  body: bodyJsonSchema,
  response: { 201: responseJsonSchema, ...errorSchemas }
}

module.exports = { registerSchema }
