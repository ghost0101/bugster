var app  = require('./../config/express');

var Post = require('./../models/post');
var User = require('./../models/user');

var count;
var ImageSocket =
  {
    list:function (req) {
      // img = new Image();
      Post.find({},function (err,data) {
        if (err) {
          console.log(err);
        } else {
          app.io.broadcast('posts:list',{images:data,total:data.length});
        }
      });

    },
    views:function (req) {
      var post_id = req.data;
      // console.log("Nueva visita al post "+post_id);
      req.io.join(post_id);
      Post.findOne({post_id:post_id},function (err,data) {
        if (err) {
          console.log(err);
        } else {
          if (data) {
              console.log(data.views);
              app.io.room(post_id).broadcast('posts:views',{views:data.views});
          }
        }
      });
    },
    bug:function (req) {
      var to = req.data;  //  User to whom we are giving bugs

      //  We give one bug to the author
      User.update({_id:req.params.post},{$inc:{bugs:1}},function (err,data) {
        if (err) console.log(err);
      });
      //  We remove one bug from the visitor
      User.update({_id:req.user._id},{$inc:{bugs:1}},function (err,data) {
        if (err) console.log(err);
      });
    },
    create: function(req) {
      count += 1;
      req.data.id = count;
      app.io.broadcast('posts:create', req.data);
    },
    remove: function(req) {
      app.io.broadcast('posts:remove', req.data);
    },
    saludar: function (req) {
      console.log("LLegó un saludo");
      req.io.broadcast('posts:saludar',req.data);
    },
    quantity: function (req) {
      //  Código para contar los posts :)
      console.log(req.data);
      console.log("Recibiendo ... "+req);
      app.io.broadcast('post:quantity',20);
    }
  };

module.exports = ImageSocket;
