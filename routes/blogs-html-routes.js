const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isBlogOwner = require("../config/middleware/isBlogOwner");
const Op = require("sequelize").Op;

module.exports = function(app) {

  // View All Blogs Page
  app.get("/blogs", function(req, res) {
    db.Blog.findAll({
      include: [db.User, db.Category]
    }).then(function(blogs) {

      // Create array for all the blog posters
      let UserArray = new Array();
      blogs.forEach((blog) => {
        UserArray.push({
          id: blog.UserId,
          name: blog.User.name
        });
      });
      // Remove duplicates from the array
      UserArray = [...new Map(UserArray.map(user => [user.id, user])).values()];

      // Create array for all the blog categories being used
      let Category = new Array();
      blogs.forEach((blog) => {
        Category.push({
          id: blog.CategoryId,
          name: blog.Category.name
        });
      });
      // Remove duplicates from the array
      Category = [...new Map(Category.map(category => [category.id, category])).values()];

      res.render("blogs/blogs", {
        scripts: "/js/blogs/blogs.js",
        user: UserArray,
        category: Category
      });
    });
  });

  // View Blog Detail Page
  app.get("/blog/:id", function(req, res) {
    db.Blog.findOne({
      where: {id: req.params.id},
      include: [db.User, db.Category]
    }).then(function(blog) {
      let BlogObject = {
        UserName: blog.User.name,
        id: blog.id,
        UserId: blog.UserId,
        title: blog.title,
        body: blog.body,
        mood: blog.mood,
        category: blog.Category.name,
        memberPicture: blog.User.picture
      };

      let handlebarTemp = "partials/viewblog";
      let handlbarScripts = "/js/blogs/blog.js";

      // If the user is blog owner, then it will render the userblog page instead which will display the edit and delete buttons along with the same info
      if (req.user && req.user.id === blog.UserId) {
        handlebarTemp = "blogs/userblog";
        handlbarScripts = "/js/blogs/userblog.js";
      }

      res.render(handlebarTemp, {
        blog: BlogObject,
        scripts: handlbarScripts
      });
    });
  });

  // Blog Search by title
  app.get("/blogSearch/:title", function(req, res) {
    let search = req.params.title;
    console.log(req.params.title);
    db.Blog.findAll({
      include: [db.User, db.Category],
      where: {
        [Op.or]: {
          title: search,
          mood: search
        }
      }
    }).then(function(blogs) {
      if (blogs === null || blogs.length === 0) {
        res.render("searchresults", {results: "There are no blogs by the name of '" + req.params.title + "' please try again."});
      } else {
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
        res.render("searchresults", {
          blog: BlogArray,
          results: "Showing search results for '" + req.params.title + "'"});
      }
    });
  });

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
        scripts: "/js/blogs/postblog.js",
        category: CategoryArray
      });
    });
  });

  // Edit Blog
  app.get("/editBlog/", isAuthenticated, isBlogOwner, function(req, res) {
    db.Category.findAll({}).then(function(data) {
      let CategoryArray = new Array();
      data.forEach((category) => {
        CategoryArray.push({
          id: category.id,
          name: category.name
        });
      });
      res.render("blogs/postblog", {scripts: "/js/blogs/postblog.js", category: CategoryArray});
    });
  });

};