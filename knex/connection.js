const knex = require('knex');

module.exports = knex({
  client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: 'api'
    },
});