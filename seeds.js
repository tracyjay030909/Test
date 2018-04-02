var mongoose    =  require("mongoose"),
    Campground  =  require("./models/campgrounds"),
    Comment     =  require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image:"https://farm8.staticflickr.com/7447/10718439695_38b5638dc0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Trees Pass",
        image:"https://farm7.staticflickr.com/6035/6852296122_9638697cb9.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Grassy Knoll",
        image:"https://farm3.staticflickr.com/2506/3844050234_e9e4f98678.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){  
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed campgrounds");
        }
    });
    
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err)
          }else {
              console.log("added a campground");
              //create a comment
              Comment.create(
                  {
                      text:"Its soooo boring, but really pretty",
                      author: "Homer"
                  }, function(err, comment){
                      if(err){
                          console.log(err)
                      } else{
                         campground.comments.push(comment);
                         campground.save(); 
                         console.log("Created new comment")
                      }
                  });
          }
      });
    });
    
}


module.exports = seedDB;