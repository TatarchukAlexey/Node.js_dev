// const express = require ('express');
const MongoClient = require('mongodb').MongoClient; //подключаем основные методы для работы с базой
// const app = express();
const assert = require("assert");
const uri = "mongodb+srv://Alex:ljdjl321@abra-ni0lm.mongodb.net/test?retryWrites=true"; // удаленное посылание к базе данных
const client = new MongoClient(uri, { useNewUrlParser: true });  // создаем новое подключение, куда прокидаем аргументами - урл и опции(useNewUrlParser по умолчанию)

client.connect(err => {   //подкл к базе данных
    assert.equal(null, err);   //

    console.log(("Connect successfully to Db"));
    const db = client.db("test"); 
    indexCollection(db, function() {   // здесь!!!! меняем функции которые написаны ниже
             client.close();
        });
//   client.close();
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  //метод, кот.обновляет
  const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });  
  }


  const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
  }


  const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
      { "a": 1 },
        null,
        function(err, results) {
          console.log(results);
          callback();
      }
    );
  };