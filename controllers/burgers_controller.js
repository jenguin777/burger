var express = require("express");

var router = express.Router();

// Import the model (burgerModel.js) to use its database functions.
var burger = require("../models/burgerModel.js");

// Create all our routes and set up logic within those routes where required.
  router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burger.selectAll(function(data) {
      burger.insertOne([
        "burger_name", "devoured"
      ], [
        req.body.name, req.body.devoured
      ], function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
      });
    });
  });
  
  router.post("/api/update/burgers", function(req, res) {
    var condition = 'id = ' + req.body.id;
    console.log(req.body.devoured, "this is whatt we are sending")
  
    burger.updateOne({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});
// Export routes for server.js to use.
module.exports = router;