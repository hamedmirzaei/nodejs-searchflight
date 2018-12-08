# nodejs-searchflight
This is a simple example to show how to connect *Node.js*, *Express*, *MongoDB*, *JQuery*, *FontAwesome*, CSS, HTML and JavaScript together.

## Requirements
You should have *Node.js* installed on your system.
You should have *MongoDB* installed on your system and listen on port **27017**.

##  Make it work
To make it work, first execute *"npm install"* to install all the required dependencies and then execute *"npm start"* in the root directory.

## Result
The application will be started on port **3001** and you can access it via *http://localhost:3001*. A database with name *"flight_database"* will be created on *MongoDB* which contains two collections city and flightsearch.

## Notice
This project has simple functionality. It accepts inputs, validate them on some simple criteria and then post and save them on MongoDB. *CSRF* Token has been used to increase security.
