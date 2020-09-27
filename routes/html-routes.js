var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {

  // Home Page
  app.get("/", function(req, res) {
    db.Blog.findAll({
      include: [db.User]
    }).then(function(blogs) {

      const BlogArray = new Array();
      blogs.forEach((blog) => {
        BlogArray.push({
          id: blog.id,
          title: blog.title,
          body: blog.body.substring(0, 20),
          UserId: blog.UserId,
          UserName: blog.User.name});
      });

      res.render("home", {
        scripts: "/js/home.js",
        blog: BlogArray});
    });
  });

  // View All Members
  app.get("/members", function(req, res) {
    db.User.findAll({}).then(function(users) {

      const UserArray = new Array();
      users.forEach((user) => {
        UserArray.push({
          id: user.id,
          name: user.name,
          email: user.email});
      });

      res.render("members", {
        scripts: "/js/members.js",
        user: UserArray});
    });
  });

  // View All Blogs
  app.get("/blogs", function(req, res) {
    db.Blog.findAll({
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
          UserName: blog.User.name});
      });

      // Create array for all the blog poststers
      let UserArray = new Array();
      blogs.forEach((blog) => {
        UserArray.push({
          id: blog.UserId,
          name: blog.User.name});
      });
      // Remove duplicates from the array
      UserArray = [...new Map(UserArray.map(user => [user.id, user])).values()];

      res.render("blogs", {
        scripts: "/js/blogs.js",
        blog: BlogArray,
        user: UserArray
      });
    });
  });

  // Post New Blog
  app.get("/postBlog", isAuthenticated, function(req, res) {
    res.render("postblog", {scripts: "/js/postblog.js"});
  });

  // Edit Blog
  app.get("/editBlog/", isAuthenticated, function(req, res) {
    res.render("postblog", {scripts: "/js/postblog.js"});
  });

  // View User Profile
  app.get("/member/:id", function(req, res) {
    res.render("member", {scripts: "/js/member.js"});
  });

  // Edit User Profile
  app.get("/editProfile", isAuthenticated, function(req, res) {
    res.render("editprofile", {scripts: "/js/editprofile.js"});
  });

  // Login to Site
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/", {scripts: "/js/home.js"});
    }
    res.render("login", {scripts: "/js/login.js"});
  });

  // Sign Up Account
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/", {scripts: "/js/home.js"});
    }
    res.render("signup", {scripts: "/js/signup.js"});
  });
};
