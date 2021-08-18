// // Import the dependency.
import dbConnect from './dbConnect'
// // Handler
module.exports.myConn = async (req, res) => {
    // Get the MongoClient by calling await on the promise.
    // Because it is a promise, it will only resolve once.
    const client = await dbConnect();
    // Use the client to return the name of the connected database.
    res.status(200).json({ dbName: client.db().databaseName });
}