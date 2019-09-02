const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'HelloThere69',
  database: 'talk-to-me',
  insecureAuth : true
});

connection.connect();

module.exports = connection;