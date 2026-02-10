const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'apiuser',
  password: 'senha123',
  database: 'restapi',
  port: 3306
});

module.exports = pool;