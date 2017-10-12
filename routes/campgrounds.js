var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

/* ======================================== */
/*           CAMPGROUND ROUTES              */
/* ======================================== */

/* INDEX: show all campgrounds */
router.get("/", function(req, res) {
    /* Get Campgrounds from Database */
    Campground.find({}, function(err, campgrounds) {
       if(err) {
           req.flash("error", "Error.");
       } else {
           res.render("campgrounds/index", {campgrounds: campgrounds});
       }
    });
});

/* CREATE: add new campground to database (if you're logged in) */
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name    = req.body.name;
    var image   = req.body.image;
    var price   = req.body.price;
    var desc    = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};

    // Create New Campground & Save to Database
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            req.flash("error", "Error.");
        } else {
            req.flash("success", "Campground added.");
            res.redirect("/campgrounds"); 
        }
    });
});

/* NEW: show form to create new campground (if you're logged in) */
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

/* SHOW: shows more info about one campground (including comments) */
router.get("/:id", function(req, res) {
    // Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

/* EDIT: show form to edit campground post */
router.get("/:id/edit", middleware.ownsCampground, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

/* UPDATE: updates campground in the database */
router.put("/:id", middleware.ownsCampground, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash("error", "Error");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground updated.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/* DESTROY: delete campground from database */
router.delete("/:id", middleware.ownsCampground, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", "Error.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted.");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;