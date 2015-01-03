var app    	= require('express.io')();
var config  = require('./../config/config');
seo         = config.seo;
var auth    = require('./../config/auth.js');
var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
connection          = config.connection;

var async   = require('async');


//  Models
var Rincon   = require('./../models/rincon');
var Post   = require('./../models/post');
var User   = require('./../models/user');




function expressIO(req,res) {
  if (req.user) {
    req.session._id = req.user._id;
    console.log(req.session._id);
  }
}

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
      //  Top 5 posts
      Post.find({},'title description',{sort:{views: -1},limit:5},function (err,data) {
        if (err) {
          done(err);
        } else {
          top.posts = data;
          done(null,top);
        }
      });
    },function (top,done) {
      //  Latest 5 posts
      Post.find({},'title description',{sort:{date: -1},limit:5},function (err,data) {
        if (err) {
          done(err);
        } else {
          top.latest = data;
          done(null,top);
        }
      });
    },function (top,done) {
      Post.random({},function (err,data) {
        if (err) {
          done(err)
        } else {
          top.randomPost = data;
          done(null,top);
        }
      });
    }
    ],function (err,top) {
      // console.log(seo);
      res.render('app',{seo:config.seo,top:top});
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
  var seotags = {};
  Post.findOne({_id:req.params.post},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      if (data) {
          seotags.title       = data.title;
          seotags.description = data.description;
          seotags.base        = seo.base;

          if(data.image)
            seotags.image = data.image;
          if(data.youtube)
            seotags.image = 'http://img.youtube.com/vi/'+data.youtube+'/mqdefault.jpg';

          res.render('post',{seo:seotags,post:data});

          Post.update({_id:req.params.post},{$inc:{views:1}},function (err,data) {
            if (err) console.log(err);
          });
      }else{
        res.render('404',{seo:seo});
      }
    }
  });
});

app.get('/user/:user_id',function (req,res) {

  async.parallel({
    user:function (done) {
      //  Traemos la información del usuario
      User.findOne({_id:req.params.user_id},function (err,data) {
        if (err) {
          done(err);
        } else {
          done(null,data);
        }
      });
    },
    posts:function (done) {
      Post.find({user:req.params.user_id},function (err,data) {
        if (err) {
          done(err);
        } else {
          done(null,data);
        }
      });
    }
  },function (err,result) {
    if (err) {
      res.render('error');
    } else {
      result.seo = config.seo;
      console.log(result.posts);
      res.render('user',result);
    }
  });

});

app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = app;
