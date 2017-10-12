var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

var middlewareObj = {};

/* isLoggedIn Middleware */
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login.");
    res.redirect("/login");
}

/* ownsCampground middleware */
middlewareObj.ownsCampground = function(req, res, next) {
    /* is logged in */
    if(req.isAuthenticated()) {
        
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err || !foundCampground) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                
                /* is author of post */
                if(foundCampground.author.id.equals(req.user._id)) {
                     next();  /* SUCCESS */
                /* is not author of post */
                } else {
                    req.flash("error", "Permission denied.");
                    res.redirect("back");
                }
                
            }
        });
    /* is not logged in */
    } else {
        req.flash("error", "Please login.");
        res.redirect("back");
    }
}

/* ownsComment middleware */
middlewareObj.ownsComment = function(req, res, next) {
    /* is logged in */
    if(req.isAuthenticated()) {
        /* find comment */
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            /* comment not found error */
            if(err || !foundComment) {
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                
                /* is author of comment */
                if(foundComment.author.id.equals(req.user._id)) {
                     next();  /* SUCCESS */
                /* is not author of comment error */
                } else {
                    req.flash("error", "Permission denied.");
                    res.redirect("back");
                }
                
            }
        });
    /* is not logged in error */
    } else {
        req.flash("error", "Please login.");
        res.redirect("back");
    }
}

module.exports = middlewareObj;