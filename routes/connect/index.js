
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const connect = function(callback){
  // Connection URL
  // const url = 'http://0.0.0.0:27017/';
  
  // Database Name
  const url = 'mongodb://localhost:27017/';
  const dbName = '1726a';
  const fullUrl = url + dbName; // which should evaluate to this 'mongodb://localhost:27017/ceramo'

  // Use connect method to connect to the server
  MongoClient.connect(fullUrl, function(err, client) {
    assert.equal(null, err);
    console.log("数据库链接成功");
   
    const db = client.db(dbName);

    const close = client.close.bind(client);

    callback(db, close);

  });

}

module.exports = connect
