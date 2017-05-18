const { MongoClient } = require('mongodb');

const connect = (callback) => {
  const url = 'mongodb://localhost:27017/scraper';
  MongoClient.connect(url, callback);
}

module.exports = {
  addProduct: (product) => {
    connect((err, db) => {
      var collection = db.collection('products');
      collection.insertOne(product, (err, res) => {
        console.log(err, res.insertedCount);
      });
    })
  }
};

