// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const { query } = require("express");

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

  // Get All Blogs
  app.get("/api/blogs", function(req, res) {
    let query = {}

    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Blog.findAll({
      where: query,
      include: [db.User] 
    }).then(function(blogs) {

      // Create array for all the blog objects
      let BlogArray = new Array();
      blogs.forEach((blog) => {
        BlogArray.push({
          id: blog.id,
          title: blog.title,
          body: blog.body.substring(0, 20),
          UserId: blog.UserId,
          UserName: blog.User.name
        })
      });

      res.render("partials/filterblogs", { layout: false, blog: BlogArray });
    })
  });

  // Get blogs posted by user
  // app.get("/api/blogs/:UserId", function(req, res) {
  //   db.Blog.findAll({
  //     where: { UserId: req.params.UserId },
  //     include: [db.User]
  //   }).then(function(blogs) {
  //     console.log(blogs)

  //     // Create array for all the blog objects
  //     let BlogArray = new Array();
  //     blogs.forEach((blog) => {
  //       BlogArray.push({
  //         id: blog.id,
  //         title: blog.title,
  //         body: blog.body.substring(0, 20),
  //         UserId: blog.UserId,
  //         UserName: blog.User.name
  //       })
  //     });

  //     res.render("partials/filterblogs", { layout: false, blog: BlogArray });
  //   })
  // });


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
