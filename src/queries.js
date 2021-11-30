const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'api',
  password: 'root',
  port: 5432
})
