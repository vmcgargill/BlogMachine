const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    // View All Blogs Page
  app.get("/blogs", function(req, res) {
    db.Blog.findAll({
      include: [db.User, db.Category]
    }).then(function(blogs) {

      // Create array for all the blog poststers
      let UserArray = new Array();
      blogs.forEach((blog) => {
        UserArray.push({
          id: blog.UserId,
          name: blog.User.name
        })
      });
      // Remove duplicates from the array
      UserArray = [...new Map(UserArray.map(user => [user.id, user])).values()];

      // Create array for all the blog poststers
      let Category = new Array();
      blogs.forEach((blog) => {
        Category.push({
          id: blog.CategoryId,
          name: blog.Category.name
        })
      });
      // Remove duplicates from the array
      Category = [...new Map(Category.map(category => [category.id, category])).values()];

      res.render("blogs/blogs", {
        scripts: '/js/blogs/blogs.js',
        user: UserArray,
        category: Category
      });
    });
  });

  // View Blog
  app.get("/blog/:id", function(req, res) {
    db.Blog.findOne({
      where: {id: req.params.id},
      include: [db.User, db.Category]
    }).then(function(blog) {
      let BlogObject = {
        UserName: blog.User.name,
        UserId: blog.UserId,
        title: blog.title,
        body: blog.body,
        mood: blog.mood,
        category: blog.Category.name
      };
      
      let handlebarTemp = "partials/viewblog";
      let handlbarScripts = "/js/blogs/blog.js";
      
      if (req.user && req.user.id === blog.UserId) {
        handlebarTemp = "blogs/userblog";
        handlbarScripts = "/js/blogs/userblog.js"
      }

      res.render(handlebarTemp, {
        blog: BlogObject,
        scripts: handlbarScripts
      });
    })
  })
  
  // Post New Blog Page
  app.get("/postBlog", isAuthenticated, function(req, res) {
    db.Category.findAll({}).then(function(catagories) {

      let CategoryArray = new Array();
      catagories.forEach((category) => {
        CategoryArray.push({
          id: category.id,
          name: category.name
        });
      });

      res.render("blogs/postblog", {
        scripts: '/js/blogs/postblog.js',
        category: CategoryArray
      });
    });
  });

  // Edit Blog
  app.get("/editBlog/", isAuthenticated, function(req, res) {
    // TODO: Add edit blog feature. 
    // - Make sure user making request is owner of the blog. This can be done by checking the req.url and seeing what blog_id it's on.
    // - Also make a DB query that gets the blog categories so we can display in the dropdown.
    console.log(req.url)
    res.render("blogs/postblog", {scripts: '/js/postblog.js'});
  });

};