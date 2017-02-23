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
        res.render("index", {units: units});
    }})
})

//units
//add
app.post("/new", function(req, res){
  Unit.create(req.body.unit, function(err, createdUnit){
    if(err){
      console.log(err);
    } else {
      console.log(createdUnit);
      res.redirect("/");
    };
  });
});
//show units
app.get("/units", function(req, res){
  Unit.find({}, function(err, units){
    if(err){
      console.log("Something went wrong..." + err)
    } else {
      res.render("partials/units", {units:units})
    };
  })
})
//delete unit
app.delete("/units/:id", function(req, res){
  Unit.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  })
})

//show specific unit

app.get("/units/:id", function(req, res){
  Unit.findById(req.params.id).populate("links").exec(function(err, foundUnit){
    if(err){
      console.log(err)
    } else {
      res.render("partials/links", {unit: foundUnit});
    };
  });
});

//links add
app.post("/units/:id/links/new", function(req, res){
  Unit.findById(req.params.id, function(err, found){
    if(err){
      console.log(err);
    } else {
      Link.create(req.body.link, function(err, created){
        if(err){
          console.log(err)
        } else {
        found.links.push(created);
        found.save();
        console.log(created);
        res.redirect("/");
        }
      })
    }
  })
});

//link delete
app.delete("/units/:id/links/:link_id", function(req, res){
  Link.findByIdAndRemove(req.params.link_id, function(err){
    if(err){
      res.redirect("/");
      console.log(err);
    } else {
      res.redirect("/");
    };
  });
});


app.listen(process.env.PORT, function(){
  console.log("CodePage server started.")
})
