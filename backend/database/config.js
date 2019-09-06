const mysql = require('mysql');

let pool = {}

if(process.env.NODE_ENV === "production"){
  pool = mysql.createPool({
    host: 'talk-to-me.cilhwpqjm37r.us-west-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: process.env.DATABASE_PASS,
    database: 'talk-to-me',
    insecureAuth : true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}
else{
  pool = mysql.createPool({
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
}

module.exports = pool;