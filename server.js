//Imports
const express = require("express");
const heroRouter = require("./herosRouter");
const PORT = require("./config");

//Creates the express server that will listen for incoming request
const server = express();

//MIDDLEWARE processes the request and response objects, often modifying them to help the future express stuff
//express.json() looks at incoming requests with JSON data, and parses it for us
server.use(express.json());
server.use("/api", heroRouter);

//ROUTING
//Catches any incoming requests that are a GET method, and that have a URL matching "/"
server.get("/", (req, res) => {
    //Respond with JSON data saying "test"
    res.json("test");
});

server.get("/echo", (req, res) => {
    const echoInfo = {
        body: req.body,
        method: req.method,
        url: req.url,
    }
    console.log(echoInfo);
    res.json(echoInfo);
});

server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});