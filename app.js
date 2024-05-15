const express = require('express')
const path = require('path')

const menu = require('./Public/menu')
const event = require('./Public/event')

const {ObjectId} = require('mongodb')

const {getCollection} = require('./mongo-db')
const exp = require('constants')

const app = express()
const PORT = process.env.PORT || 3003

const root = path.join(__dirname, 'Public')

//Middleware
    app.use(express.json())
    app.use(express.static('Public'))
//Middleware

//GET

    app.get('/menu', (request, response) => {
        response.sendFile('menu.html', { root: 'Public/menu.html' });
    });

    app.get('/api/menuItem/', async (request, response) => {
        const collection = await getCollection('FoodTruck', 'MenuItems')
        const menuItems = await collection.find({}).toArray()
        //response.sendFile('menu.html', {root})
        response.send(menuItems)
    });

    app.get('/events', (request, response) => {
        response.sendFile('index.html', { root: 'Public/index.html' });
    });

    app.get('/api/Events/', async (request, response) => {
        const collection = await getCollection('FoodTruck', 'Events')
        const events = await collection.find({}).toArray()
        //response.sendFile('index.html', {root})
        response.send(events)
    });

//POST
    app.post('/api/menuItem/', async (request, response) => {
        const { body } = request
        const { itemName, itemDescription, itemPrice } = body
        const menu = { itemName, itemDescription, itemPrice }

        const collection = await getCollection('FoodTruck', 'MenuItems')
        const result = await collection.insertOne(menu)
        response.send(result.ops)
    })

    app.post('/api/Events/', async (request, response) => {
        const { body } = request
        const { eventName, eventDate } = body
        const event = { eventName, eventDate }

        const collection = await getCollection('FoodTruck', 'Events')
        const result = await collection.insertOne(event)
        response.send(result.ops)
    }); 
    
//Put
    app.put('/api/menuItem/:id', async (request, response) => {
        const { body, params } = request
        const { id } = params
        const { itemName, itemDescription, itemPrice } = body
        const menu = { itemName, itemDescription, itemPrice }

        const collection = await getCollection('FoodTruck', 'MenuItems')
        const result = await collection.updateOne({_id: new ObjectId(id) }, {$set: menu})
        response.send(result)
    })

    app.put('/api/Events/:id', async (request, response) => {
        const { body, params } = request
        const { id } = params
        const { eventName, eventDate } = body
        const event = { eventName, eventDate }

        const collection = await getCollection('FoodTruck', 'Events')
        const result = await collection.updateOne({_id: new ObjectId(id) }, {$set: event})
        response.send(result)
    })

//Delete

    app.delete('/api/menuItem/:id', async (request, response) => {
        const { id } = request.params

        const collection = await getCollection('FoodTruck', 'MenuItems')
        const result = await collection.deleteOne({_id: new ObjectId(id) })
        response.send(result)
    })

    app.delete('/api/Events/:id', async (request, response) => {
        const { id } = request.params 

        const collection = await getCollection('FoodTruck', 'Events')
        const result = await collection.updateOne({_id: new ObjectId(id) })
        response.send(result)
    }) 




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})








