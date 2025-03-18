const express = require("express");
const database = require("../Config/connectDB.js");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "./Config.env"});
let userRoutes = express.Router();
const SALT_ROUNDS = 6;

//CRUD operations (warning, repeating code): 
// Read all. http://localhost:3000/users
userRoutes.route("/users").get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("users").find({}).toArray();

    if(data.length >0) {
        res.json(data);
    } else {
        throw new Error("Empty :D");
    }
})

// Read one. http://localhost:3000/users/(dynamic_route)
userRoutes.route("/users/:id").get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("users").findOne({_id: new ObjectId(req.params.id)});

    if(Object.keys(data).length >0) {
        res.json(data);
    } else {
        throw new Error("Nothing :/");
    }
})

// Create one. http://localhost:3000/users 
userRoutes.route("/users").post(async (req, res) => {
    let db = database.getDb();
    //find an email that matches the request from frontend (req.body)
    const takenEmail = await db.collection("users").findOne({email: req.body.email});

    //Ensure that if there is already an email in use for a user, don't let user still create another account
    if(takenEmail){
        response.json({message: "Email already taken!"})
    } else {
        const hashed = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        let mongoDbObj = {
            // Attributes for the new object, so example:
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            joinDate: new Date()
        };
        let data = await db.collection("users").insertOne(mongoDbObj);
        res.json(data);
    }
})

// Update one. http://localhost:3000/users/(dynamic_route)
userRoutes.route("/users/:id").put(async (req, res) => {
    let db = database.getDb();
    let mongoDbObj = {
        // Attributes for the updated object, so example:
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            joinDate: req.body.joinDate
        }
    };
    let data = await db.collection("users").updateOne({_id: new ObjectId(req.params.id)}, mongoDbObj);
    res.json(data);
})

// Delete one. http://localhost:3000/users/(dynamic_route)
//for now not really in use
userRoutes.route("/users/:id").delete(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection("users").deleteOne({_id: new ObjectId(req.params.id)});
    res.json(data);
})

// Login.
userRoutes.route("/users/login").post(async (req, res) => {
    let db = database.getDb();
    //find an email that matches the request from frontend (req.body)
    const user = await db.collection("users").findOne({email: req.body.email});

    if (user) {
        let confirm  = await bcrypt.compare(req.body.password, user.password);
        //if bcrypt finds a match
        if (confirm) {
            const token = jwt.sign(user, process.env.SECRET_KEY);
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Credentials incorrect - try again!"})
        }

    } else {
        res.json({success: false, message: "User not found - Create an account?"})
    }
})

module.exports = userRoutes;