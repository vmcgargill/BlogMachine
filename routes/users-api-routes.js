// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

// Get User Data - used for desplayin login/signup buttons on navbar
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json(null);
    } else {
      res.json({
        id: req.user.id
      });
    }
  });

    // Edit Account API
  app.put("/api/editProfile", isAuthenticated, function(req, res) {
    // TODO: Add edit account feature
  });

  // Delete Account API
  app.delete("/api/deleteProfile", isAuthenticated, function(req, res) {
    // TODO: Add delete account feature
  })

};