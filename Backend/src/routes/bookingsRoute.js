//This is essentially for configuring whole trip 'packages', so essentially they are pre-planed trips with set price and so on.

const express = require("express");
const database = require("../Config/connectDB.js");
const ObjectId = require("mongodb").ObjectId;
let bookingRoutes = express.Router();

//CRUD operations (warning, repeating code): 
// Read all. http://localhost:3000/Booking
bookingRoutes.route("/Booking").get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("bookings").find({}).toArray();

    if(data.length >0) {
        res.json(data);
    } else {
        //If this error happens, make sure to check if Config.env is set up properly
        throw new Error("Empty :D");
    }
})

// Read one. http://localhost:3000/Booking/(dynamic_route)
bookingRoutes.route("/Booking/:id").get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("bookings").findOne({_id: new ObjectId(req.params.id)});

    if(Object.keys(data).length >0) {
        res.json(data);
    } else {
        throw new Error("Nothing :/");
    }
})

// Create one. http://localhost:3000/Booking //Note, this should not be available to common users
bookingRoutes.route("/Booking").post(async (req, res) => {
    let db = database.getDb();
    let mongoDbObj = {
        // Attributes for the new object, so example:
        title: req.body.title,
        destination: req.body.destination,
        desc: req.body.desc,
        flight: req.body.flight,
        housing: req.body.housing,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        optImg: req.body.optImg,
        totPrice: req.body.totPrice

    };
    let data = await db.collection("bookings").insertOne(mongoDbObj);
    res.json(data);
})

// Update one. http://localhost:3000/Booking/(dynamic_route) //Note, this should not be available to common users
bookingRoutes.route("/Booking/:id").put(async (req, res) => {
    let db = database.getDb();
    let mongoDbObj = {
        // Attributes for the updated object, so example:
        $set: {
            title: req.body.title,
            destination: req.body.destination,
            desc: req.body.desc,
            flight: req.body.flight,
            housing: req.body.housing,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            optImg: req.body.optImg,
            totPrice: req.body.totPrice
        }
    };
    let data = await db.collection("bookings").updateOne({_id: new ObjectId(req.params.id)}, mongoDbObj);
    res.json(data);
})

// Delete one. http://localhost:3000/Booking/(dynamic_route)
bookingRoutes.route("/Booking/:id").delete(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("bookings").deleteOne({_id: new ObjectId(req.params.id)});
    res.json(data);
})

module.exports = bookingRoutes;