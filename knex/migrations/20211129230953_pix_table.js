
exports.up = function(knex) {
  return knex.schema.createTable('pix', (table) => {
    table.increments('id').primary();
    table.string('key').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.timestamps();
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('pix')
};
