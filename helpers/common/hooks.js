/**
 * * anonymous function. separated logic for allowed role
 * *  add to route ->  onRequest: is_admin,
 */
const is_admin = async (request, reply) => {
  await request.jwtVerify()
  if (request.user.admin == false) {
    reply.code(401)
    throw Error(`${request.user.email} does not have permission`)
  }
}

/**
 * * email verified middleware.
 * * for ordering and profile operations
 */
const is_email_verified = async (request, reply) => {
  await request.jwtVerify()
  if (request.user.email_verified == false) {
    reply.code(403)
    throw Error(`User: ${request.user.email} is not verified`)
  }
}

module.exports = { is_admin, is_email_verified }
