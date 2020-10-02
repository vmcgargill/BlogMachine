// Requiring our models and passport as we've configured it
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const fs = require('fs');
const path = require("path");
const upload = require("../config/multer")

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
  app.put("/api/editProfile", isAuthenticated, upload.single("picture"), function(req, res) {
    let oldPicture = req.user.picture;
    
    let query = {
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      bio: req.body.bio,
      hobbies: req.body.hobbies,
      intrests: req.body.intrests,
      website: req.body.website
    }
    
    if (req.file) {
      query.picture = "/upload/" + req.file.filename;
    }
    
    // if (oldPicture !== "/default/default.png") {
      // fs.unlinkSync(path.join(__dirname, "../public" + oldPicture));
    //   // db.User.findOne({ where: {id: req.user.id}}).then(function(user) {
    //   // })
    // }
    
    db.User.update(query, { where: {id: req.user.id} }).then(function() {
      res.json({});
    });

  });

  // Delete Account API
  app.delete("/api/deleteProfile", isAuthenticated, function(req, res) {
    // TODO: Add delete account feature
  })

};