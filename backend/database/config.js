const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'HelloThere69',
  database: 'talk-to-me',
  insecureAuth : true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;