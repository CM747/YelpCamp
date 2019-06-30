var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware/index");


// Index
router.get("/", (req,res)=>{
    Campground.find({},(err,campgrounds)=>{
        if(err){
            console.log("Error getting campgrounds");
            req.flash("info", "Some error occured. Please try again.")
        }
        else{
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

// New
router.get("/new", middleware.isLoggedIn, (req,res)=>{
    res.render("campgrounds/new");
});

// Create
router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.img;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcampground = {name:name, image:image, description:desc, price:price ,author:author};4

    Campground.create(newcampground, (err,camp)=>{
        if(err){
            console.log(err);
            req.flash("info", "Some error occured. Please try again");
        }
        else{
            req.flash("success", "Campground successfully added")
        }
    })
    res.redirect("/campgrounds");
});

// Show
router.get("/:id", (req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err);
            req.flash("info", "Some error occured. Please try again")
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// Edit
router.get("/:id/edit", middleware.isAuthorizedforCampground, (req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground)=>{
        if(err){
            console.log(err);
            req.flash("info", "Some error occured. Please try again")
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

// Update
router.put("/:id", middleware.isAuthorizedforCampground, (req,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err,campground)=>{
        if(err){
            console.log(err)
            req.flash("info", "Some error occured. Please try again")
        }else{
            req.flash("success", "Updated Successfully")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

// Destroy
router.delete("/:id", middleware.isAuthorizedforCampground, (req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground)=>{
        if(err){
            console.log(err)
            req.flash("info", "Some error occured. Please try again")
        }else{
            foundCampground.remove((err)=>{
                if(err){
                    console.log(err)
                    req.flash("info", "Some error occured. Please try again")
                }else{
                    req.flash("success", "Successfully Deleted Campground")
                    res.redirect("/campgrounds");
                }
            })
        }
    })
})




module.exports = router;