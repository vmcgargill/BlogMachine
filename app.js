// Establish Dependancies
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models");
const expressHndlBrs = require("express-handlebars");

// Establish public directory as static directory
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Passport Middleware and Express Session
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Handlebar Middleware
app.engine("handlebars", expressHndlBrs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Include routes layer
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncronize Sequelize and initialize the server listener
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});