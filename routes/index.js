var app    	= require('express.io')();
var Rincon  = require('./../models/rincon');
var config  = require('./../config/config');


//  Models
var Rincon   = require('./../models/rincon');
var Rincon   = require('./../models/post');

app.get('/home', function(req, res) {
  // res.sendfile(__dirname + '/public/index.html');
  res.render('app',{base:config.domain});
});

app.get('/rincon/:title',function (req,res) {
  Rincon.findOne({title:req.params.title},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.render('rincon',{base:config.domain,title:data.title,description:data.description});
    }
  });
});

app.get('/post/:post',function (req,res) {
  Post.findOne({_id:req.params.post},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.render('post',{base:config.domain,title:data.title,description:data.description});
    }
  });
});



module.exports = app;
