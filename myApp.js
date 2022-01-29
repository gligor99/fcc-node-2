var express = require("express");
var app = express();

// 1. Modify the myApp.js file to log "Hello World" to the console.
console.log("Hello World");

// 2. Use the app.get() method to serve the string "Hello Express" to GET requests matching the / (root) path.
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// 3. Send the /views/index.html file as a response to GET requests to the / path. If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.
const absolutePath = __dirname;
app.get("/", (req, res) => {
  res.sendFile(absolutePath + "/views/index.html");
});

module.exports = app;
