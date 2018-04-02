var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

//========================
//     CAMPGROUND ROUTES
//========================
//Index Route- show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else {
            res.render("campground/index.ejs", {campgrounds:allCampgrounds, page: 'campgrounds'});
        }
    });
      
});

//CREATE ROUTE- add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array.
    var name    = req.body.name;
    var image   = req.body.image;
    var price   = req.body.price;
    var desc    = req.body.description;
  //saving username to new campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
  // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreate){
        if(err){
            console.log(err);
        } else {
  //redirects back to campground page.
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to add to DB
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campground/new"); 
});

//SHOW- shows info about 1 campground
router.get("/:id", function(req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
                //need to pass in a variable to call the id of the campground
                res.render("campground/edit", {campground: foundCampground})
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campground");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
            //redirect somewhere
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;