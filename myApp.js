var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// 11. Body Parses
app.use(bodyParser.urlencoded({ extended: false }));

// 7. Implement the Root-Level Request Logger Middelware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// 1. Modify the myApp.js file to log "Hello World" to the console.
console.log("Hello World");

// 2. Use the app.get() method to serve the string "Hello Express" to GET requests matching the / (root) path.
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

// 3. Send the /views/index.html file as a response to GET requests to the / path. If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.
const absolutePath = __dirname;
app.get("/", (req, res) => {
  res.sendFile(absolutePath + "/views/index.html");
});

// 4. Serve Static Assets
app.use("/public", express.static(absolutePath + "/public")); // express.static(path) => middlware -> path = absolute path of the folder containtg the assets

// 5. Serve JSON on Specific Route
// 6. Use the .env File
app.get("/json", (req, res) => {
  let message = "Hello json";
  process.env["MESSAGE_STYLE"] === "uppercase"
    ? (message = message.toUpperCase())
    : "";
  res.json({
    message: message,
  });
});

// 8. Chain Middleware to create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// 9. Get Route Parameter
app.get("/:word/echo", (req, res, next) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

// 10. Get Query Parameter Input From Client
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// 12. Get Data From Post Request
app.post("/name", function (req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;
