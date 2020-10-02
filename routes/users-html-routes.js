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
          email: user.email
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

      let MemberBlogs = new Array();
      member.Blogs.forEach((blog) => {
        MemberBlogs.push({
          id: blog.id,
          UserId: blog.UserId,
          UserName: member.name,
          title: blog.title,
          body: blog.body,
          mood: blog.mood,
          category: blog.Category.name
        });
      });

      let MemberObject = {
        id: member.id,
        name: member.name,
        email: member.email,
        picture: member.picture,
        title: member.title,
        bio: member.bio,
        website: member.website,
        hobbies: member.hobbies,
        intrests: member.intrests
      };

      let handlebarTemp = "partials/viewmember";
      let handlebarScripts = "/js/users/viewmember.js";

      if (req.user && req.user.id === member.id) {
        handlebarTemp = "users/userprofile";
        handlebarScripts = "/js/users/userprofile.js"
      };

      res.render(handlebarTemp, {
        member: MemberObject,
        blog: MemberBlogs,
        scripts: handlebarScripts
      });
    });
  });

  // Edit User Profile
  app.get("/editProfile", isAuthenticated, function(req, res) {
    // TODO: Add edit profile feature.
    // - Make sure user making request is owner of the account. This can be done by checking the req.url and seeing what user_id it's on.
    // - Also make a DB query that gets the user so we can display in the dropdown.
    console.log(req.url)
    res.render("users/editprofile", {scripts: '/js/users/editprofile.js'});
  });

  // Edit User Profile
  app.get("/deleteProfile", isAuthenticated, function(req, res) {
    // TODO: Add delete profile feature.
    // - Make sure user making request is owner of the account. This can be done by checking the req.url and seeing what user_id it's on.
    // - Make it so that the user has to enter their own password
    console.log(req.url)
    res.render("users/editprofile", {scripts: '/js/users/editprofile.js'});
  });

};