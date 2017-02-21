var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/codepage");

app.get("/", funtion(req, res){
  res.render("index");
});

app.listen(process.env.PORT, function(){
  console.log("CodePage server started.")
})
