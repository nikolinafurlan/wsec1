import { MongoClient } from 'mongodb';

export default async function saveChat(req, res) {
  const username = req.body.username;
  const comment = req.body.comment;

  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://root:example@0.0.0.0:6666";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("courses");

    const chats = database.collection("chats");

    const chatMessage = { username, comment };

    const result = await chats.insertOne(chatMessage);

    console.log(`Chat message inserted with id: ${result.insertedId}`);

    res.status(200).json(chatMessage);

  } 
  
  catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  } 
  
  finally {
    await client.close();
  }
}