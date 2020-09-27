// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  
  // Post Login API
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Post Signup API
  app.post("/api/signup", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      picture: null,
      title: null,
      bio: null,
      website: null,
      hobbies: null,
      intrests: null
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

  // Get User Data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json(null);
    } else {
      res.json({
        id: req.user.id
      });
    }
  });

  // Get User Data
  app.get("/api/blogs", function(req, res) {
    db.Blog.findAll({}).then(function(blogs) {
      res.json(blogs);
    })
  });

  // Post New Blog
  app.post("/api/blogs", isAuthenticated, function(req, res) {
    db.Blog.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user.id
    }).then(function(data) {
      res.json(data);
    })

  });

};
