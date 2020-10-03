const db = require("../../models");

module.exports = function(req, res, next) {
    let blogId;

    if (req.query.blog_id) {
        blogId = req.query.blog_id
    } else if (req.params.id) {
        blogId = req.params.id
    }

    db.Blog.findOne({
        where: {id: blogId}
    }).then(function (blog) {
      if (blog.UserId === req.user.id) {
          return next();
      } else {
        res.redirect("/")
      }
    })
};