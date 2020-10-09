// Requiring our models and passport as we've configured it
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const fs = require("fs");
const path = require("path");
const upload = require("../config/multer");
const passport = require("passport");

module.exports = function(app) {

  // Get User Data - used for desplay login/signup buttons on navbar
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
      interests: req.body.interests
    };

    // Function that DOBLE checks if string is URL so query does not crash
    function isUrl(str) {
      try {
        new URL(str);
      } catch (_) {
        return false;
      }
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
        // If the old profile picture is not the default profile picture then delete it, to avoid having a bunch of old and unused profile pics. Saves disk space.
        if (oldPicture !== "/default/default.png") {
          fs.unlinkSync(path.join(__dirname, "../public" + user.picture));
        }
      });
    }

    // Make DB Query
    // There is no need for middleware that checks if user is account owner because req.user.id tells us which user is signed in and taking these actions
    db.User.update(query, { where: {id: req.user.id} }).then(function() {
      res.json({});
    });

  });

  // Delete Account API, this API is very similar to the login API.
  // It uses passport authentication to authinticate user to make them enter password to delete account.
  app.delete("/api/deleteProfile", passport.authenticate("local"), function(req, res) {
    // If user succesfully entered password
    if (req.user) {
      // It takes the signed in/authenticated user id and destroys the account
      db.User.destroy({where: {id: req.user.id}}).then(function() {
        res.json({success: "Account Deleted"});
      });
    } else {
      // If authentication fails it will return this message.
      // This method makes user authenticate account with password before deleting their account as a precaution without ever signing them out.
      res.json({error: "Username or password is incorrect. Pleas try again."});
    }
  });

};