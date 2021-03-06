var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

/* LANDING PAGE */
router.get("/", function(req, res) {
   res.render("landing");
});

/* ============= USER ROUTE =============== */

router.get("/user/:user_id", middleware.isLoggedIn, function(req, res) {
   Campground.find({'author.id': req.params.user_id}, function(err, campgrounds) {
      if(err) {
          req.flash("error", "Error.");
          res.redirect("back");
      } else {
          Comment.find({'author.id': req.params.user_id}, function(err, comments) {
              if(err) {
                  req.flash("error", "Error.");
          res.redirect("back");
              } else {
                  res.render("user", {campgrounds: campgrounds, comments: comments});
              }
          });
      }
   });
});


/* ======================================== */
/*               AUTH ROUTES                */
/* ======================================== */

/* ----- REGISTER ----- */

/* show register form */
router.get("/register", function(req, res) {
   res.render("register"); 
});

/* handle sign up logic */
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message + ".");
            return res.redirect("/register");
        }
        /* log user in */
        passport.authenticate("local")(req, res, function() {
           req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
           res.redirect("/campgrounds"); 
        });
    });
});

/* ----- LOGIN ----- */

/* show login form */
router.get("/login", function(req, res) {
    res.render("login");
});

/* handle login logic */
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

/* ----- LOGOUT ----- */

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out.");
    res.redirect("/campgrounds");
});


module.exports = router;