const {MongoClient, ObjectId} = require('mongodb')

const {uri} = require('./Secrets/mongodb.json')
const client = new MongoClient(uri)

const connectMongoDB = async() => {
    await client.connect()
    console.log("Connected to MongoDB")
}

const getCollection = async (dbName, collectionName) => {
    await connectMongoDB()
    return client.db(dbName).collection(collectionName)
}

module.exports = {getCollection, ObjectId}