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
    // Make query object
    let query = {
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      bio: req.body.bio,
      hobbies: req.body.hobbies,
      intrests: req.body.intrests
    }

    // Function that DOBLE checks if string is URL so query does not crash
    function isUrl(str) {
      try { new URL(str); } catch (_) { return false; }
      return true;
    }

    // If the string is a url then add it to the db query
    if (isUrl(req.body.website) === true) {
      query.website = req.body.website;
    }

    
    // Check if user uploaded a file. If user did upload a file, then save the file path in the query object to be used for later.
    if (req.file) {
      query.picture = "/upload/" + req.file.filename;
      // Then check the database to see what is the current file path of the old user's profile picture.
      db.User.findOne({ where: {id: req.user.id}}).then(function(user) {
        // This must be checked by using a database query because req.user.picture will not give us latest version of profile picture.
        let oldPicture = user.picture;
        // If the old profile picture is not the default profile picture then delete it, to avoit having a bunch of unuses profile pics. Saves space.
        if (oldPicture !== "/default/default.png") {
          fs.unlinkSync(path.join(__dirname, "../public" + user.picture));
        }
      })
    }
    
    // Make DB Query
    db.User.update(query, { where: {id: req.user.id} }).then(function() {
      res.json({});
    });

  });

  // Delete Account API
  app.delete("/api/deleteProfile", isAuthenticated, function(req, res) {
    // TODO: Add delete account feature
  })

};