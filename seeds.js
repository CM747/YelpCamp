var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Tricky Treats",
        image: "https://images.unsplash.com/photo-1556726307-09a5d69f2cd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        name: "Starry Caves",
        image: "https://images.unsplash.com/photo-1504632348771-974e356b80af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        name: "Sporting Rivers",
        image: "https://images.unsplash.com/photo-1542067519-6cd1e217df2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
]


function seedDb(){

    Campground.remove(function(err){
        // if(err){
        //     console.log(err)
        // }else{
        //     console.log("Campgrounds removed");
        //     Comment.remove(function(err){
        //         if(err){
        //             console.log(err)
        //         }else{
        //             console.log("Comments removed")
        //             data.forEach(function(seed){
        //                 Campground.create(seed, function(err,campground){
        //                     if(err){
        //                         console.log(err)
        //                     }else{
        //                         console.log("Campground created")
        //                         Comment.create({
        //                             content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //                             author: "Commenter"
        //                             }, function(err,comment){
        //                                 if(err){
        //                                     console.log(err)
        //                                 }else{
        //                                     campground.comments.push(comment);
        //                                     campground.save();
        //                                     console.log("comment added");
        //                                 }
        //                         })
        //                     }
        //                 })
        //             })
        //         }
        //     })
        // }
    })
}

module.exports = seedDb;