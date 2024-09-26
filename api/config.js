//Reads the environment variables (PORT)

//Import the doenv package
const dotenv = require("dotenv");

//Read all the .env variables and place them on the global object, called process
//More specifically, it places them onto the process.env object
dotenv.config();

//export the port number for use in the server.js file
module.exports = process.env.PORT;