const express = require('express');/*Here I require all the resources I need for the server*/
const fileHandler = require('fs');
const fetch = require('node-fetch');
const helmet = require("helmet");
const app = express();

/*I installed body parser to allow the server to be able to interact with the front-end*/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/*app.use(helmet());*/
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "https://itunes.apple.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );


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

const path = require("path");
if (process.env.NODE_ENV === "production") {
app.use(express.static("front-end/build"));
app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
});
}

const PORT = process.env.PORT || 3004;/*Here I declare the port that should be used for the server. Its important for the 
server and front end to open on different porst, however the proxy in the front-end package.json should match the server 
port inorder for it to act as the server for the front end.*/

app.listen(PORT, () => { 
    console.log("Listening for port " + PORT + ". Open: http://localhost:3004");
})/*This code is for the server to listen on the port specified and also to give the user a message, that tells them what
 port is being used and to provide a link to that port*/

