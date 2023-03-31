import { MongoClient } from 'mongodb' 

export default function getChats(req, res) {

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://root:example@0.0.0.0:6666";

// create mongo connection client
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db("courses");
  
      const movies = database.collection("chats");

      //query for movies that have runtime less than 15 min

      const query = { };
      const options = {

      };

      const cursor = movies.find(query, options);

      res.status(200).json(cursor);
      let buffer = '';

      //loop over records
      cursor.forEach(element => {
        console.log(element);
        buffer = buffer + element;
        res.status(200).json(element);

      });


      
      //print a message if no documents found

    } finally {

    }
}
run().catch(console.dir);

}
