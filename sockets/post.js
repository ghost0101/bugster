var app  = require('./../config/express');

var Post = require('./../models/post');

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
    create: function(req) {
      count += 1
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
    }
  }

module.exports = ImageSocket;
