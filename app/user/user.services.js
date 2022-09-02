'use strict'

/**
 * * get all users
 */
const userList = async app => {
  return await app.knex('users')
}

/**
 * * get user by id
 */
const userById = async (app, id) => {
  const user = await app.knex('users').where('id', id).first()

  if (user == null) throw app.httpErrors.notFound(`User with ID: ${id} not found!`)

  return user
}
/**
 * * grant or revoke user admin role
 */
const userRole = async (app, props) => {
  const user = await userById(app, props.id)
  var message = 'No action performed'

  if (props.action == 'grant') {
    if (user.is_admin) throw app.httpErrors.badRequest(`${user.email} is already Admin`)

    await app.knex('users').where('id', user.id).update({ is_admin: true })
    message = `${user.email} granted admin role`
    return message
  }

  if (props.action == 'revoke') {
    if (user.is_admin == false) throw app.httpErrors.badRequest(`${user.email} is not Admin`)

    await app.knex('users').where('id', user.id).update({ is_admin: false })
    message = `${user.email} admin role revoked`
    return message
  }

  const data = await userById(app, props.id)

  return { message, data }
}
/**
 * * create a user
 */
const createUser = async (app, props) => {
  const { email, email_verified, password } = props || {}

  const user = await app.knex('users').where('email', email).first()

  if (user != null)
    throw app.httpErrors.badRequest(`User: ${user.email} already exists! Please Login`)

  const hashedPassword = await app.bcrypt.hash(password)

  await app.knex.insert({ email, email_verified, password: hashedPassword }).into('users')

  return
}
/**
 * * update user email or password
 */
const updateUser = async (app, id, props) => {
  await userById(app, id)

  const { email, email_verified, password } = props || {}

  await app.knex('users').where('id', id).update({ email, email_verified })

  if (password && Object.keys(password).length != 0) {
    const hashedPassword = await app.bcrypt.hash(password)
    await app.knex('users').where('id', id).update({ password: hashedPassword })
  }

  return await userById(app, id)
}
/**
 * * delete a user by id
 */
const deleteUser = async (app, id) => {
  await userById(app, id)

  await app.knex('users').where('id', id).first().del()

  return
}

module.exports = { userRole, userList, createUser, userById, updateUser, deleteUser }
