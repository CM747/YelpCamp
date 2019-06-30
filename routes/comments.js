var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require("../middleware/index");



// Create New Comment
router.post("/", middleware.isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground)=>{
        if(err){
            console.log(err);
            req.flash("info", "Some error occured. Please try again")
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                    req.flash("info", "Some error occured. Please try again")
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save(function(err,camp){
                        if(err){
                            console.log(err)
                            req.flash("info", "Some error occured. Please try again")
                        }else{
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    })
                }
            })
        }
    })
});

// Edit
// Update

// DESTROY Comment
router.delete("/:id1", middleware.isAuthorizedforComment, (req,res)=>{
    Comment.findByIdAndRemove(req.params.id1, (err)=>{
        if(err){
            console.log(err)
            req.flash("info", "Some error occured. Please try again")
        }else{
            Campground.findById(req.params.id, (err,foundCampground)=>{
                if(err){
                    console.log(err)
                    req.flash("info", "Some error occured. Please try again")
                }else{
                    for(var i=0; i<foundCampground.comments.length; i++){
                        if(foundCampground.comments[i].equals(req.params.id1)){
                            foundCampground.comments.splice(i,1);
                            break;
                        }
                    }
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
})



module.exports = router;