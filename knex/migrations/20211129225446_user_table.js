
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.timestamps();
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('users')
};
