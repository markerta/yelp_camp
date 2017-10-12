var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

/* ======================================== */
/*              COMMENT ROUTES              */
/* ======================================== */

/* NEW: show form to create new comment */
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash("error", "Error.");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

/* CREATE: add new comment to database */
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash("error", "Error.");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   req.flash("error", "Error.");
               } else {
                   /* connect comment to user */
                   comment.author.id        = req.user._id;
                   comment.author.username  = req.user.username;
                   
                   /* save comment to campground & save campground */
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Comment added.");
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
    });
});

/* EDIT: show form to edit comment */
router.get("/:comment_id/edit", middleware.ownsComment, function(req, res) {
    /* check that campground exists */
    Campground.findById(req.params.id, function(err, foundCampground) {
        /* campground doesn't exist error */
        if(err || !foundCampground) {
            req.flash("error", "Campground not found.");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            /* comment doesn't exist error */
            if(err || !foundComment) {
                req.flash("error", "Comment not found.");
                res.redirect("back");
            /* comment exists */
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
    
});

/* UPDATE: edit comment in the database */
router.put("/:comment_id", middleware.ownsComment, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            req.flash("error", "Error.");
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/* DESTROY: delete comment from the database */
router.delete("/:comment_id", middleware.ownsComment, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           req.flash("error", "Error.");
           res.redirect("back");
       }
       req.flash("success", "Comment deleted.");
       res.redirect("/campgrounds/" + req.params.id);
   }); 
});


module.exports = router;