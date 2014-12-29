var app    	= require('express.io')();
var Rincon  = require('./../models/rincon');


//  Models
var Rincon   = require('./../models/rincon');

app.get('/home', function(req, res) {
  // res.sendfile(__dirname + '/public/index.html');
  res.render('app');
});

app.get('/rincon/:title',function (req,res) {
  Rincon.findOne({title:req.params.title},function (err,data) {
    if (err) {
      cl
    } else {
      res.render('rincon',{title:data.title,description:data.description});
    }
  });
});


app.get('/i/:image_id',function (req,res) {
  var data ='1';
  res.render('app',{image:data});
});

app.get('/v/:video_id',function (req,res) {
  var data ='1';
  res.render('app',{video:data});
});


module.exports = app;
