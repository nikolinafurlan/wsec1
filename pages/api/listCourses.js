export default function ListallCoursesQuery(req,res) {

    // db
    // get the client
    const mysql = require('mysql2');

    // create the connection to database
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    port: 2222,
    database: 'wse',
  });

  // simple query
  connection.query('SELECT * FROM courses;', function (err, results, fields) {
    //return back the records
    res.status(200).json(results);
  });
}

