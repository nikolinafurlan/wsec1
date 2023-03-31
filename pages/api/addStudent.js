export default function AddStudent(req, res) {
    // db
    // get the client
    const mysql = require("mysql2");
  
    // create the connection to database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "example",
      port: 2222,
      database: "wse",
    });
  
    // extract values from request body
    const {
      firstname,
      lastname,
      email,
      address,
      telephone,
      enrolledin,
    } = req.body;
  
    // establish connection
    connection.connect();
  
    connection.query(
      `INSERT INTO students (firstname, lastname, email, address, telephone, enrolledin) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, address, telephone, enrolledin],
      (error, results, fields) => {
        // handle errors
        if (error) throw error;
  
        // send response
        res.status(201).json({ message: "Student record created successfully" });
  
        // close connection
        connection.end();
      }
    );
  }