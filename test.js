const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'pynode',
  user: 'root',
  password: 'abu0418',
});

connection.connect();

connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});

connection.end();