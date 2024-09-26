const express = require("express");
const { createNewHero, getAllHeros, getSingleHero, updateHero } = require("./herosController");
//Creating a router just for the heros
const server = express.Router();

//Responds with all the heros
server.get("/heros/:id?", (req, res) => {
    const id = req.params.id;

    let results;
    if (id >= 0) {
        results = getSingleHero(id);
    } else {
        results = getAllHeros();
    }

    res.json(results);
});

//Receives an incoming hero and adds it to our exampleData
server.post("/heros", (req, res) => {
    //Object destructuring
    const { body } = req;

    //Ask the controller to handle the creation of a new hero
    const results = createNewHero(body);

    if (!results.success) {
        res.status(400);
    }
    res.json(results);
});

//Receive an incoming (existing) hero, and update that hero's information
server.put("/heros/", (req, res) => {
    const incomingHero = req.body;

    //Asks the controller to handle the given request
    const result = updateHero(incomingHero);

    //Checks that the incomingHero data is valid, and that it matches an existing hero in our exampleData
    if (result.success) {
        res.status(200);
    } else {
        res.status(400);
    }
    res.json(result);
});

//Exporting this router
module.exports = server;