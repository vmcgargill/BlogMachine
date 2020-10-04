const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.post("/api/categories", isAuthenticated, function(req, res) {
        db.Category.findOne({where: {name: req.body.name}}).then(function(Category) {
            if (Category === null) {
                db.Category.create({name: req.body.name}).then(function(newcategory) {
                    console.log(newcategory.id)
                    res.json({name: newcategory.name, id: newcategory.id, message: "Category Created!"});
                });
            } else {
                res.json({error: "Category '" + req.body.name + "' already exists! Please select a different name."});
            }
        });
    });

    app.delete("/api/categories/:id", isAuthenticated, function(req, res) {
        db.Blog.findAll({where: {CategoryId: req.params.id}}).then(function(data) {
            if (data.length === 0) {
                db.Category.destroy({where: {id: req.params.id}}).then(function() {
                    res.json({message: "Category Deleted!"});
                });
            } else {
                res.json({error: "Sorry but this category cannot be removed because it already has some blogs posted on it."});
            }
        });
    });

}