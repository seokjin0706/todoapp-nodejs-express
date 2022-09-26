
const MongoClinet = require('mongodb').MongoClient;
let _db;

const connectDB = (callback) => {
    MongoClinet.connect(process.env.DB_URL, (err, client) => {
        _db = client.db('todoapp');
        return callback(err);
    });

}

const getDB = () => _db;
const disconnectDB = () => _db.close();

module.exports = { connectDB, getDB, disconnectDB };

