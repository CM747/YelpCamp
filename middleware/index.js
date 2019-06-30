var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in");
    res.redirect("/login");
}

middlewareObj.isAuthorizedforCampground = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err,foundCampground)=>{
            if(err){
                req.flash("info","Some error occured. Please try again")
                res.redirect("back");
            }else{
                if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                if(foundCampground.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You must log in first");
        res.redirect("back");
    }
}


middlewareObj.isAuthorizedforComment = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.id1, (err,foundComment)=>{
            if(err){
                req.flash("info","Some error occured. Please try again")
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You must log in first");
        res.redirect("back");
    }
}

module.exports = middlewareObj;