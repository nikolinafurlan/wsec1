export default async function handler(req, res) {

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

  const { id } = req.query;

  try {
    await connection.execute('DELETE FROM students WHERE id = ?', [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
