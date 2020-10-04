const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  
  // Post Login API
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Post Account API, Signup for Account
  app.post("/api/signup", function(req, res) {
    db.User.findOne({where: {email: req.body.email}}).then(function(user) {
      if (user === null) {
        db.User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          picture: "/default/default.png"
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            res.status(401).json(err);
        });
      } else {
        res.json({error: "Error: Email '" + req.body.email + "' has already been taken. Please try again."})
      }
    });
  });

  // Get Logout API
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};
