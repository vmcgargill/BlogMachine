const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Create and Delete Category Page
  app.get("/categories", isAuthenticated, function(req, res) {
    db.Category.findAll({}).then(function(category) {
      let categoryArray = new Array();
      category.forEach((category) => {
        categoryArray.push({
          id: category.id,
          name: category.name
        });
      });
      res.render("viewcategory", { category: categoryArray, scripts: "/js/categories/viewCategories.js" });
    });
  });
};