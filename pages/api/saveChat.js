import { MongoClient } from 'mongodb' 

export default function saveChat(req, res) {

  // catching the variables
    const username = req.body.username;
    const comment = req.body.comment;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://root:example@0.0.0.0:6666";

// create mongo connection client
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("courses");

    const col = database.collection("chats");

    // create a document to insert
    const doc = {
      username: username,
      content: comment,
    }
    const result = await col.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

    // return back the records
    res.status(200).json(username+""+comment);

}
