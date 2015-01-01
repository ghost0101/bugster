var app    	= require('express.io')();
var config  = require('./../config/config');
seo         = config.seo;

var async   = require('async');


//  Models
var Rincon   = require('./../models/rincon');
var Post   = require('./../models/post');


app.http().io()
// Broadcast the new visitor event on ready route.
app.io.route('ready', function(req) {
  req.io.broadcast('new visitor')
});

app.get('/', function(req, res) {
  // res.sendfile(__dirname + '/public/index.html');

  async.waterfall([
    function (done) {
      //  Top 5 Rincones
      Rincon.find({},'title description priority',{sort:{priority: -1},limit:5},function (err,data) {
        if (err) {
          done(err);
        } else {
          var top = {};
          top.rincones = data
          done(null,top);
        }
      });
    },function (top,done) {
      Post.find({},'title description priority',{sort:{views: -1},limit:5},function (err,data) {
        if (err) {
          done(err);
        } else {
          top.posts = data;
          done(null,top);
        }
      });
    }
    ],function (err,top) {
      res.render('app',{seo:seo,top:top});
    });

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
  Post.findOne({_id:req.params.post},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      seo.title       = data.title;
      seo.description = data.description;
      res.render('post',{seo:seo,post:data});

      Post.update({_id:req.params.post},{$inc:{views:1}},function (err,data) {
        if (err) console.log(err);
      });
    }
  });
});



module.exports = app;
