'use strict'

/**
 * * Fetch User by Email
 */
const fetchUser = async (app, email) => {
  const user = await app.knex('users').where('email', email).first()

  if (user == null) throw app.httpErrors.notFound(`User: ${email}, not found!`)

  return user
}

/**
 * * Generate User Access Token ( JWT )
 */
const access_token = async (user, jwt) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      email_verified: Boolean(user.email_verified),
      admin: Boolean(user.is_admin)
    },
    { expiresIn: '1d' }
  )
}

/**
 * * Authenticate passed user
 */
const authenticate = async (app, props) => {
  const user = await fetchUser(app, props.email)

  const match = await app.bcrypt.compare(props.password, user.password)

  if (match == false) throw app.httpErrors.forbidden('Password Incorrect!')

  return await access_token(user, app.jwt)
}

/**
 * * Create User via Registration
 */
const registration = async (app, props) => {
  const user = await app.knex('users').where('email', props.email).first()

  if (user != null)
    throw app.httpErrors.badRequest(`User: ${props.email} already exists! Please Login`)

  const hash = await app.bcrypt.hash(props.password)

  /**
   * * knex insert returns array of id's , of created data
   */
  await app.knex.insert({ email: props.email, password: hash }).into('users')
}

const verifyUserEmail = async (app, email) => {
  await app.knex('users').where('email', email).update({ email_verified: true })

  const user = await fetchUser(app, email)
  const token = await access_token(user, app.jwt)

  return token
}

const updateUserPassword = async (app, props) => {
  const user = await fetchUser(app, props.email)

  const hashedPassword = await app.bcrypt.hash(props.password)

  await app.knex('users').where('email', user.email).update({ password: hashedPassword })
}

/**
 * * Generate OTP Code
 */
const getOTP = async (app, email) => {
  const otp = Math.floor(Math.random() * 90000) + 10000

  //* 30 minute expiry
  await app.redis.setex(`OTP:${email}`, 1800, otp.toString())
  return otp.toString()
}
/**
 * * Verify OTP Code
 */
const verifyOTP = async (app, props) => {
  const key = `OTP:${props.email}`

  return await app.redis.get(key, async (error, otp) => {
    if (error) app.log.error(error)

    if (otp != null && otp == props.code) {
      await revokeOTP(app, key)
      return true
    } else {
      return false
    }
  })
}
/**
 * * Revoke OTP
 */
const revokeOTP = async (app, key) => {
  await app.redis.del(key, (err, response) => {
    if (err) app.log.error(err)
    if (response == 1) {
      app.log.info(`${key} revoked`)
    } else {
      app.log.info('no action')
    }
  })
}

module.exports = {
  registration,
  authenticate,
  access_token,
  fetchUser,
  getOTP,
  verifyOTP,
  verifyUserEmail,
  updateUserPassword
}
