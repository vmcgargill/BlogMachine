const db = require("../../models");

// This is a middleware function that determines if the signed in user is the blog owner and if they are allowed to edit/delete a blog.
// Only blog owners are allowed to edit and delete their own blogs.
// A potential added feature would be to make certain users site admins.
// Then we could also allow site admins here for viewing the blogs.
module.exports = function (req, res, next) {
  let blogId;

  // Determines ing blog ID is query or parameter
  if (req.query.blog_id) {
    blogId = req.query.blog_id;
  } else if (req.params.id) {
    blogId = req.params.id;
  }

  // If user is blog owner, return next callback. Else if user is not blog owner, redirect them to the index page because they are not allowed to be there
  db.Blog.findOne({
    where: { id: blogId }
  }).then(function (blog) {
    if (blog.UserId === req.user.id) {
      return next();
    } else {
      res.redirect("/");
    }
  });
};