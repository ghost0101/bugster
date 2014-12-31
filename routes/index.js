var app    	= require('express.io')();
var config  = require('./../config/config');
seo         = config.seo;

var async   = require('async');


//  Models
var Rincon   = require('./../models/rincon');
var Post   = require('./../models/post');



app.get('/', function(req, res) {
  // res.sendfile(__dirname + '/public/index.html');
  Rincon.find({},'title description priority',{sort:{priority: -1},limit:5},function (err,data) {
    if (err) {
      res.status(500).send("");
    } else {
      res.render('app',{seo:seo,topRincones:data});
    }
  })

});

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
      if (data) {
        seo.title       = data.title;
        seo.description = data.description;
        res.render('rincon',{seo:seo,rincon:data});
      }else{
        res.send("Ops, eso no existe ¬¬");
      }
    }
  });
});

app.get('/post/:post',function (req,res) {
  console.log("deberia ser aqui!!");
  Post.findOne({_id:req.params.post},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      console.log(data);
      seo.title       = data.title;
      seo.description = data.description;
      res.render('post',{seo:seo,post:data});
    }
  });
});



module.exports = app;
