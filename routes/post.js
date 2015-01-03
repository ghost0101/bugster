var app    	= require('express.io')();
var Rincon  = require('./../models/rincon');
var Post    = require('./../models/post');
var sanitizer = require('sanitizer');

//  Librerías
var async   = require('async');


app.get('/:post_id',function (req,res) {
  Post.findOne({_id:req.params.post_id},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al cargar el post :/");
    } else {
      res.json(data);
    }
  });
});

app.post('/',function (req,res) {



  async.waterfall([
    function (done) {
      console.log(req.body.rincon);
      Rincon.findOne({title:req.body.rincon},'_id',function (err,id) {
        if (err) {
          done(err);
        } else {
          if (id) {
            done(null,id);
          } else {
            done("Ops, no existe ese rincón :/");
          }
        }
      });
    },function (rincon,done) {

      var data = {
        title: sanitizer.sanitize(req.body.title),
        description:sanitizer.sanitize(req.body.description),
        rincon: rincon
      };

      if (req.user) {
        data.user = req.user._id;
      }

      //  Parámetros opcionales :)

      if (req.body.youtube)
        data.youtube = sanitizer.sanitize(req.body.youtube);
      if (req.body.image)
        data.image = sanitizer.sanitize(req.body.image);

      if (req.user)
        data._user = sanitizer.sanitize(req.user._id);

      var newPost = new Post(data);


      newPost.save(function (err,data) {
        if (err) {
          done(err);
        } else {
          done(null,data);
        }
      })
    }
    ],function (err,data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al agregar el post :/");
      } else {
        res.send("Post agregado correctamente!!");
      }
    });



});



module.exports = app;
