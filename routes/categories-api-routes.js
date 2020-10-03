const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require("passport");

module.exports = function(app) {
    app.post("/api/categories", isAuthenticated, function(req, res) {
        db.Category.findOne({where: {name: req.body.name}}).then(function(Category) {
            if (Category === null) {
                db.Category.create({name: req.body.name}).then(function(data) {
                    res.json(data)
                })
            } else {
                res.json({})
            }
        })
    })
    app.delete("/api/categories/:id", isAuthenticated, function(req, res) {
        db.Category.destroy({where: {id: req.params.id}}).then(function() {
            res.json({})
        })
    }) 
}