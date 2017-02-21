var express = require("express"),
    mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://localhost:27017/codepage");



app.listen(process.env.PORT, function(){
  console.log("CodePage server started.")
})
