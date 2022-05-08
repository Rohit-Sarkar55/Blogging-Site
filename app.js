//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { lowerFirst } = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];
const posttitle = ""  , postContent = "";
var _ = require('lodash');

app.get("/" , function(req ,res){
  res.render("home" , { content:homeStartingContent , Blogs : posts } );
});

app.get("/about", function(req ,res){
  res.render("about" , {content : aboutContent});

});

app.get("/contact", function(req ,res){
  res.render("contact" , { content : contactContent});
  
});

app.get("/compose" , function(req , res ){
  
  res.render("compose" );
});

app.post("/compose" , function(req , res){
  
  var post ={
    title : req.body.posttitle,
    body: req.body.postbody
  }
  posts.push(post);
  res.redirect("/");
});

// app.get("/posts/:topic" , function(req , res ){
//   const userUrl = req.params.topic;
//   posts.forEach(function(it){
//     const store = it.title;
//     if(store === userUrl ){
//       console.log("Matched ");
//     }
//   })
  
// });

app.get("/post" , function(req ,res){
  res.render("post", { x:posttitle, y:postContent } );
});
app.get("/posts/:postName" , function(req , res ){
  const userUrl = _.lowerCase(req.params.postName);

  posts.forEach(function(it){
    const store = _.lowerCase(it.title);
    if(store === userUrl ){
      // posttitle = it.title;
      // postContent = it.content;
      res.render("post" , { x: it.title , y:it.body});
    }
    
  })
  
});
// $(document).ready(function(){
// 	var maxLength = 30;
// 	$(".show-read-more").each(function(){
// 		var myStr = $(this).text();
// 		if($.trim(myStr).length > maxLength){
// 			var newStr = myStr.substring(0, maxLength);
// 			var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
// 			$(this).empty().html(newStr);
// 			$(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
// 			$(this).append('<span class="more-text">' + removedStr + '</span>');
// 		}
// 	});
// 	$(".read-more").click(function(){
// 		$(this).siblings(".more-text").contents().unwrap();
// 		$(this).remove();
// 	});
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
