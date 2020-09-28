// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

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

  // Get All Blogs & Render Handlebar Templates
  app.get("/api/blogs", function(req, res) {
    let query = {};
    let limit;
    let order;
    
    if (req.query.order) {
      order = [[ "createdAt", req.query.order ]]
    }
    
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.category) {
      query.CategoryId = req.query.category;
    }

    db.Blog.findAll({
      where: query,
      limit: limit,
      order: order,
      include: [db.User, db.Category]
    }).then(function(blogs) {

      // Create array for all the blog objects
      let BlogArray = new Array();
      blogs.forEach((blog) => {
        BlogArray.push({
          id: blog.id,
          title: blog.title,
          body: blog.body.substring(0, 50),
          UserId: blog.UserId,
          UserName: blog.User.name,
          mood: blog.mood,
          category: blog.Category.name
        });
      });

      res.render("partials/filterblogs", { layout: false, blog: BlogArray });
    });
  });

  app.get("/api/blogSearch", function(req, res) {
    db.Blog.findAll({}).then(function(blogs) {
      let BlogArray = new Array();
      blogs.forEach((blog) => {
        BlogArray.push(blog.title)
      });
      res.json(BlogArray)
    })
  })

  // Post New Blog
  app.post("/api/blogs", isAuthenticated, function(req, res) {

    let mood = req.body.mood;
    if (mood === "none") {
      mood = null;
    }
    
    db.Blog.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user.id,
      CategoryId: req.body.category,
      mood: mood
    }).then(function(data) {
      res.json(data);
    })
  });

};
