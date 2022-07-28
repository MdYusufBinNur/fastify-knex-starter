'use strict'

async function createUser(app, { request }) {
  try {
    const { email, password } = request.body
    //   const { data: createdUser, error } = '';
    //   if (error) throw error;
    //   return createUser;
    app.log.info('here in service')

    // app.knex('users').insert({ email, password })

    const access_token = app.jwt.sign({ email: email })

    return { access_token, email }
  } catch (err) {
    return err
  }
}

module.exports = { createUser }
