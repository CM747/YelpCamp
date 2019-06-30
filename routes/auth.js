var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");


// Register
router.get("/register", (req,res)=>{
    res.render("register");
});
router.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err,user)=>{
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Succesfully Registered "+ user.username +" and Loggged You in");
            res.redirect("/campgrounds");
        });
    })
});


// LogIn
router.get("/login", (req,res)=>{
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req,res)=>{});


// LogOut
router.get("/logout", (req,res)=>{
    req.logOut();
    req.flash("success", "Successfully Logged Out")
    res.redirect("/campgrounds");
});

module.exports = router;