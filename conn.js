const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db;

const collection = client.db('sample_mflix').collection('movies');

  // Create an index on the 'title' field
  collection.createIndex({ title: 1 }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  });
 
module.exports = {
    connectToServer: async function (callback) {
      try {
        await client.connect();
        _db = client.db("sample_mflix");
      console.log("Successfully connected to MongoDB.");
      }catch (e) {
        console.error(e);
      }

      return (_db === undefined ? false : true);
    },
  getDb: function () {
    return _db;
  },
};