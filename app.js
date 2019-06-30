var express = require('express');
var app = express();
var bodrParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStratergy = require('passport-local');
var SeedDb = require('./seeds');
var User = require("./models/user");
var methodOverride = require('method-override');
var flash = require("connect-flash");

var campgroundsRoute = require("./routes/campgrounds"),
    commentsRoute = require("./routes/comments"),
    authRoutes = require("./routes/auth");
    

// Mongoose Config
mongoose.connect("mongodb+srv://chandan:98516181@cluster0-bcwul.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useCreateIndex:true
}).then(()=>{
    console.log("Connected to MongoDB Atlas");
}).catch(err => {
    console.log("ERROR:", err.message);
});

// App Config
app.set("view engine", "ejs");

app.use(bodrParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// DEFINING NEW MIDDLEWARE TO  GET currentUser IN EVERY ROUTE
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});
app.use(methodOverride("_method"));
// Routes config
app.use(authRoutes);
app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:id/comments", commentsRoute);

passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SeedDb();


// Root Route
app.get("/", (req,res) =>{
    res.render("landing");
});


app.listen(3000, ()=>{
    console.log("YelpCamp Server has started");
});