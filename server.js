const express = require('express');/*Here I require all the resources I need for the server*/
const fileHandler = require('fs');
const fetch = require('node-fetch');
const helmet = require("helmet");
const app = express();

const bodyParser = require('body-parser');/*I installed body parser to allow the server to be able to interact with the front-end*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(helmet());/*I required and used helmet to secure the app*/

app.get('/get/:name', function(req, res){/*This code is for fetching data from the api and sending it to the front end's matching fetch request. This required me to install node fetch.*/
    const searchRequest = req.params.name;/*Here I define searchrequest to be the name params that was declared on the front end*/

    fetch(`https://itunes.apple.com/search?term=${searchRequest}&limit=50`)/*searchRequest is then used to fetch the data related to the name given by the user and sends it to the front end.*/
    .then(res => res.json())
    .then((result) => {
       res.send(result.results);
    },
    (error) => {
        return error;
    });
})

const PORT = process.env.PORT || 3004;/*Here I declare the port that should be used for the server. Its important for the 
server and front end to open on different porst, however the proxy in the front-end package.json should match the server 
port inorder for it to act as the server for the front end.*/

app.listen(PORT, () => { 
    console.log("Listening for port " + PORT + ". Open: http://localhost:3004");
})/*This code is for the server to listen on the port specified and also to give the user a message, that tells them what
 port is being used and to provide a link to that port*/

