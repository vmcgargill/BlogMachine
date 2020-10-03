const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require("passport");

module.exports = function(app) {
    app.get("/api/categories", function(req, res) {
        db.Category.findAll({
          }).then(function(category) {
            let categoryArray = new Array();
            category.forEach((category) => {
              categoryArray.push({
                
                category: category.Category.name
              });
            });
      
            res.render("partials/filtercategories", { layout: false, blog: categoryArray });
          });
        });
    }