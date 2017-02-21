var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/codepage");

// models
var UnitSchema = new mongoose.Schema ({
  name: String,
  url: String,
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link"
    }
  ]
});
var Unit = mongoose.model("Unit", UnitSchema);

var LinkSchema = new mongoose.Schema ({
  name: String,
  url: String
});
var Link = mongoose.model("Link", LinkSchema);


// routes
app.get("/", function(req, res){
  Unit.find({}, function(err, units){
    if(err){
      console.log(err);
    } else {
      Link.find({}, function(err, links){
        if(err){
          console.log("Error --> ");
        } else {
          res.render("index", {units: units, links:links});
        }
      })
    }
  })
});

//units

app.post("/new", function(req, res){
  Unit.create(req.body.unit, function(err, createdUnit){
    if(err){
      console.log(err);
    } else {
      console.log(createdUnit);
      return res.redirect("/");
    }
  })
});

app.listen(process.env.PORT, function(){
  console.log("CodePage server started.")
})
