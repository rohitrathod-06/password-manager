const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require ('body-parser')

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
const app = express();
const port = 3000;
app.use(bodyparser.json())

 client.connect();
    console.log("✅ Connected successfully to MongoDB");

    app.get('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    app.post('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.insertOne(password);
          res.send({success:true, result: findResult})

    });

    app.delete('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.deleteOne(password);
               res.send({success:true, result: findResult})

    });


    app.listen(port, () => {
      console.log(`🚀 Code is running on http://localhost:${port}`);
    });
  

