// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  
  // Post Login API
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Post Account API, Signup for Account
  app.post("/api/signup", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      picture: "/upload/default.png"
    }).then(function() {
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        res.status(401).json(err);
    });
  });

  // Get Logout API
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};
