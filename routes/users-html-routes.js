// Requiring our models and passport as we've configured it
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    // View All Members Page
  app.get("/members", function(req, res) {
    db.User.findAll({}).then(function(users) {
      const UserArray = new Array();
      users.forEach((user) => {
        UserArray.push({
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          bio: user.bio,
          hobbies: user.hobbies,
          interests: user.interests,
          title: user.title
        })
      });
      res.render("users/members", {
        scripts: '/js/users/members.js',
        user: UserArray
      });
    })
  });

  // Get Sign In User Profile
  app.get("/UserProfile", isAuthenticated, function(req, res) {
    if (req.user) {
      res.redirect("/member/" + req.user.id);
    }
  });

  // View User Profile
  app.get("/member/:id", function(req, res) {
    db.User.findOne({ 
        where: { id: req.params.id
      },
      include: {
        model: db.Blog,
        include: {
          model: db.Category
        }
      },
      order: [[ db.Blog, "createdAt", "DESC" ]],
    }).then(function(member) {

      let UserBlogs = new Array();
      member.Blogs.forEach((blog) => {
        UserBlogs.push({
          id: blog.id,
          UserId: blog.UserId,
          UserName: member.name,
          title: blog.title,
          body: blog.body,
          mood: blog.mood,
          category: blog.Category.name,
          memberPicture: member.picture
        });
      });

      let UserObject = {
        id: member.id,
        name: member.name,
        email: member.email,
        picture: member.picture,
        title: member.title,
        bio: member.bio,
        website: member.website,
        hobbies: member.hobbies,
        interests: member.interests
      };

      let handlebarTemp = "partials/viewmember";
      let handlebarScripts = "/js/users/viewmember.js";

      if (req.user && req.user.id === member.id) {
        handlebarTemp = "users/userprofile";
        handlebarScripts = "/js/users/userprofile.js"
      };

      res.render(handlebarTemp, {
        member: UserObject,
        blog: UserBlogs,
        scripts: handlebarScripts
      });
    });
  });

  // Edit User Profile
  app.get("/editProfile", isAuthenticated, function(req, res) {
    db.User.findOne({ where: {id: req.user.id}}).then(function(user) {
      let UserObject = {
        name: user.name,
        email: user.email,
        title: user.title,
        bio: user.bio,
        hobbies: user.hobbies,
        interests: user.interests,
        website: user.website
      }
      res.render("users/editprofile", {
        scripts: '/js/users/editprofile.js',
        user: UserObject
      });
    })
  });

  // Edit User Profile
  app.get("/deleteProfile", isAuthenticated, function(req, res) {
    db.User.findOne({where: {id: req.user.id}}).then(function(user) {
      let email = user.email;
      res.render("users/deleteprofile", {scripts: '/js/users/deleteprofile.js', email: email});
    })
  });

};