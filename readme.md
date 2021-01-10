# Capstone Project 2 for level 2

## What is this project about?

This is a simple search engine for iTunes and Apple Books. It was created using both Express and React and is a full stack web app, with Express (Backend) acting as the server that is used to fetch the data.

## How does it work?

It's basically like every other search engine, you type something in the input bar and click search. The results will show up *almost* immediately and you can scroll right to view all of the results for the topic you searched. You can also preview the results and save them to favourites as well. Your favourites bar can be found left of the results when you search them. There is also no need to reload the page to search something new, you can just search something else and the new results will show up in the previous results place.

## How can you install this app?

If you are interested in viewing this app for yourself, you can download it by clicking the green code button on [my GitHub](https://github.com/Tasneem-Davids) or you can dounload it from [my Dropbox Task 21 folder](https://www.dropbox.com/home/Tasneem%20Davids-68468/Web%20Development%20with%20React%20and%20Express/Task%2021) it will be labelled TASK 21.
Once you have downloaded it make sure you have node installed. You can check by opening your terminal and typing node -v, if a version shows up in the terminal you have it installesd, if not, you can download it here [here](https://nodejs.org/en/download/). Once again type node -v and after you get a version, type npx -v as well. If node is installed correctly, go to the app folder and open your terminal in the backend and type npm install. This will install all dependencies needed to run the app. Once the node-modules is completeley installed, you can then run npm start, this will start the server and you should get a message in your terminal say the server is listening. Next go to the front-end directory and do the same for the front end as you did for the backend (run npm install, then npm start). It's important to remember the server must be listening or you won't get the results when searching.

## How to test the app?

Testing is really easy, when you run npm start on the backend, go to the port specified in your terminal you will initially get a message like *Cannot GET /*, add  the following to test what kind of data you will recieve for a search you would make: after the url add /get/whatever you would like to search it should look like this for example: http://localhost:3004/get/Ariana Grande positions (also make sure spelling is correct).You will get a json object as a result with lots of key/value pairs.

## Safety measrures?

As well as testing, I installed helmet and added it to the server side of the app by firstly requiring it 
(const helmet = require("helmet");) then added the app.use (app.use(helmet());).

## Link to Heroku deployed app.

You can also visit the app (here)[] if you'd like. I deployed it using Heroku and GitHub.

