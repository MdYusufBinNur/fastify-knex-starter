/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name')
    table.unique('email').dropNullable()
    table.boolean('email_verified').defaultTo(false)
    table.string('active')
    table.string('user_type')
    table.timestamp('created_at').dropNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTableIfExists('users')
}
