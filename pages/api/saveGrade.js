export default function SaveGrade(req,res) {

    const cid = req.body.cid;
    const sid = req.body.sid;
    const grade = req.body.grade;

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

  connection.query(
    "INSERT INTO wse.grades (sid,courseid,grade) VALUES ('"+sid+"','"+cid+"','"+grade+"');",
    function(err, results, fields) {

             

       

        // return back the records
        res.status(200).json(results);





    }
);
   

 
 
 

}
