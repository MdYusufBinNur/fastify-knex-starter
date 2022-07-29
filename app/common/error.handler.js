'use strict'

function validationErrorMessage(error, context) {
  const { dataPath, message, params } = error
  const prefix = `${context || ''}${dataPath || ''}`
  const paddedPrefix = prefix ? `${prefix} ` : ''
  const allowedValues =
    params && Array.isArray(params.allowedValues)
      ? `: ${params.allowedValues.map(v => `'${v}'`).join(', ')}`
      : ''
  return `${paddedPrefix}${message}${allowedValues}`
}

function errorHandler(error, request, reply) {
  this.log.error(error)

  /**
   * Validation error formatting
   */
  if (Array.isArray(error.validation)) {
    var body = {
      errors: error.validation.map(err => ({
        code: 'REQUEST_VALIDATION_ERROR',
        message: validationErrorMessage(err, error.validationContext)
      }))
    }
    reply.code(400)
    reply.type('application/json')
    reply.send(body)
    return
  }

  /**
   * SQL Error formatting
   */
  if (error.sql) {
    var body = {
      code: error.code,
      message: error.sqlMessage,
      error: error.message
    }

    reply.code(500)
    reply.type('application/json')
    reply.send(body)
    return
  }

  var body = {
    code: 'UNHANDLED_ERROR',
    message: error.message,
    error: true
  }
  reply.code(error.statusCode ? error.statusCode : 500)
  reply.type('application/json')
  reply.send(body)
  return
}

module.exports = {
  errorHandler
}
