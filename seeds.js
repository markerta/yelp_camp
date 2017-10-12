var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=11Jc3bMf",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed nisl quis odio suscipit consequat. In hac habitasse platea dictumst. Nulla metus justo, fermentum a turpis nec, dignissim suscipit mauris. Nulla eu arcu molestie, lobortis velit nec, maximus lorem. Nullam quis tempor libero, sed ullamcorper diam. Cras a condimentum arcu. Sed imperdiet, sapien eget interdum sodales, enim diam mattis orci, ut dignissim eros nisl id mauris. Mauris lobortis lacinia mi id consectetur. Vivamus feugiat diam erat, maximus aliquet velit fringilla vitae. Donec tempus urna lectus, quis dictum mauris lacinia sit amet. Nunc nec consectetur risus. Vestibulum id est sit amet massa vehicula dignissim ac vitae risus. Pellentesque vitae nisi eu mauris aliquam venenatis. Mauris ornare, elit nec aliquam ultricies, enim tellus pharetra ipsum, vel porttitor lectus eros id odio. Nulla eleifend enim in lectus hendrerit, vel condimentum ex tempor."
    },
    {
        name: "Desert Mesa",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=11Jc3bMf",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed nisl quis odio suscipit consequat. In hac habitasse platea dictumst. Nulla metus justo, fermentum a turpis nec, dignissim suscipit mauris. Nulla eu arcu molestie, lobortis velit nec, maximus lorem. Nullam quis tempor libero, sed ullamcorper diam. Cras a condimentum arcu. Sed imperdiet, sapien eget interdum sodales, enim diam mattis orci, ut dignissim eros nisl id mauris. Mauris lobortis lacinia mi id consectetur. Vivamus feugiat diam erat, maximus aliquet velit fringilla vitae. Donec tempus urna lectus, quis dictum mauris lacinia sit amet. Nunc nec consectetur risus. Vestibulum id est sit amet massa vehicula dignissim ac vitae risus. Pellentesque vitae nisi eu mauris aliquam venenatis. Mauris ornare, elit nec aliquam ultricies, enim tellus pharetra ipsum, vel porttitor lectus eros id odio. Nulla eleifend enim in lectus hendrerit, vel condimentum ex tempor."
    },
    {
        name: "Canyon Floor",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=11Jc3bMf",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed nisl quis odio suscipit consequat. In hac habitasse platea dictumst. Nulla metus justo, fermentum a turpis nec, dignissim suscipit mauris. Nulla eu arcu molestie, lobortis velit nec, maximus lorem. Nullam quis tempor libero, sed ullamcorper diam. Cras a condimentum arcu. Sed imperdiet, sapien eget interdum sodales, enim diam mattis orci, ut dignissim eros nisl id mauris. Mauris lobortis lacinia mi id consectetur. Vivamus feugiat diam erat, maximus aliquet velit fringilla vitae. Donec tempus urna lectus, quis dictum mauris lacinia sit amet. Nunc nec consectetur risus. Vestibulum id est sit amet massa vehicula dignissim ac vitae risus. Pellentesque vitae nisi eu mauris aliquam venenatis. Mauris ornare, elit nec aliquam ultricies, enim tellus pharetra ipsum, vel porttitor lectus eros id odio. Nulla eleifend enim in lectus hendrerit, vel condimentum ex tempor."
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds...");
        
        /*// Add campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added campground...");
                    
                    // Create a comment
                    Comment.create(
                    {
                        text: "This place is great, but I wish there was internet...",
                        author: "Homer"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created comment...");
                        }
                    });
                }
            });
        });*/
    });
}

module.exports = seedDB;