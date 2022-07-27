/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name')
    table.string('email', 128).unique().notNullable()
    table.boolean('email_verified').defaultTo(false)
    table.string('password', 64).notNullable()
    table.string('user_type')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTableIfExists('users')
}
