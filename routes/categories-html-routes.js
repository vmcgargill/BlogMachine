const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/categories", isAuthenticated, function(req, res) {
      db.Category.findAll({
        }).then(function(category) {
          let categoryArray = new Array();
          category.forEach((category) => {
            categoryArray.push({
              id: category.id,
              name: category.name
            });
          });
          res.render("partials/viewcategory", { category: categoryArray, scripts: "/js/categories/viewCategories.js" });
        });
    });
};