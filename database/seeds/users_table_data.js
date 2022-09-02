/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  // pass is 123456
  await knex('users').insert([
    {
      email: 'super@admin.com',
      email_verified: true,
      password: '$2a$10$mYKo/KMUnAWpS5hZkAmyyuwocUTNKv1dYrJC534cT7TJ/1.cSeSF2',
      is_admin: true
    }
  ])
}
