module.exports = function(app) {

  // Home Page
  app.get("/", function(req, res) {
    res.render("home", { scripts: '/js/home.js' });
  });

  // Login to Site
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.render("login", {scripts: '/js/login.js'});
  });

  // Sign Up Account
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.render("signup", {scripts: '/js/signup.js'});
  });
};
