const { MongoClient, ObjectId, Collection} = require('mongodb')
const {url} = process.env.MONGODB_URL || require('secrets\mongodb.json')
const client = new MongoClient(url)


//Routes

    //Menu items
app.get('/api/menuItem/', async (request, response) => {
    const menuItems = await menuCollection.find({}).toArray();
    response.json(menuItems);
});

    //Events
app.get('/api/Event/', async (request, response) => {
    const events = await eventsCollection.find({}).toArray();
    response.json(events);
});

console.log("Connected to MongoDB")

module.exports = { getCollection, ObjectId}