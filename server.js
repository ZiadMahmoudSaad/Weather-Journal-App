// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000;
app.get('/all' , (request , response) =>{
        response.send(projectData);
});
 //Post Data
app.post('/postData',(request, response) =>{
 //Post Data Now
    projectData={
        temp: request.body.temp,
        content: request.body.content,
        data: request.body.data,
     
    };
    response.send(projectData);
})