const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isBlogOwner = require("../config/middleware/isBlogOwner");

module.exports = function(app) {

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
          body: blog.body,
          UserId: blog.UserId,
          UserName: blog.User.name,
          mood: blog.mood,
          category: blog.Category.name,
          memberPicture: blog.User.picture
        });
      });

      res.render("partials/filterblogs", { layout: false, blog: BlogArray });
    });
  });

  // Get Blog Search Suggestions
  app.get("/api/blogSearchSuggestions", function(req, res) {
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
    if (mood === "None") {
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

  // Edit Blogs API
  app.put("/api/blogs/:id", isAuthenticated, isBlogOwner, function(req, res) {
    db.Blog.update({
        title: req.body.title,
        CategoryId: req.body.category,
        body: req.body.body,
        mood: req.body.mood
      }, {
        where: {id: req.params.id}
    }).then(function(data) {
      res.json(data)
    })

  })

  // Delete Blogs API
  app.delete("/api/blogs/:id", isAuthenticated, isBlogOwner, function(req, res) {
    db.Blog.destroy({
      where: {id: req.params.id}
    }).then(function(data) {
      res.json(data)
    })
    // TODO: Add delete blog feature
  });
  
  // Get blog information by id
  app.get("/api/blogs/:id", isAuthenticated, function(req, res) {
    db.Blog.findOne({
      where: {Id: req.params.id}
    }).then(function(data) {
      let blog = {
        id: data.id,
        CategoryId: data.CategoryId,
        body: data.body,
        title: data.title,
        mood: data.mood
      }
      res.json(blog)
    });
  });
};