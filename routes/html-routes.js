var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {

  // Home Page
  app.get("/", function(req, res) {
    res.render("home", { scripts: '/js/home.js' });
  });

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
      res.render("members", {
        scripts: '/js/members.js',
        user: UserArray
      });
    })
  });

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

      res.render("blogs", {
        scripts: '/js/blogs.js',
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
        title: blog.title,
        body: blog.body,
        mood: blog.mood,
        category: blog.Category.name
      };
      
      let handlebarTemp = "blog";
      let handlbarScripts = "/js/blog.js";
      
      if (req.user) {
        if (req.user.id === blog.UserId) {
          handlebarTemp = "userblog";
          handlbarScripts = "/js/userblog.js"
        }
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

      res.render("postblog", {
        scripts: '/js/postblog.js',
        category: CategoryArray
      });
    });
  });

  // Edit Blog
  app.get("/editBlog/", isAuthenticated, function(req, res) {
    res.render("postblog", {scripts: '/js/postblog.js'});
  });

  // Get Sign In User Profile
  app.get("/UserProfile", function(req, res) {
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
      }
    }).then(function(member) {

      let MemberBlogs = new Array();
      member.Blogs.forEach((blog) => {
        MemberBlogs.push({
          UserName: member.name,
          title: blog.title,
          body: blog.body,
          mood: blog.mood,
          category: blog.Category.name
        })
      })

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

      res.render("member", {
        member: MemberObject,
        blog: MemberBlogs,
        scripts: '/js/member.js'
      });
    })
  });

  // Edit User Profile
  app.get("/editProfile", isAuthenticated, function(req, res) {
    res.render("editprofile", {scripts: '/js/editprofile.js'});
  });

  // Login to Site
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/", {scripts: '/js/home.js'});
    }
    res.render("login", {scripts: '/js/login.js'});
  });

  // Sign Up Account
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/", {scripts: '/js/home.js'});
    }
    res.render("signup", {scripts: '/js/signup.js'});
  });
};
