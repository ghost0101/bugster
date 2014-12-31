var app    	= require('express.io')();
var Rincon  = require('./../models/rincon');
var Post    = require('./../models/post');


//  Librerías
var async   = require('async');


app.get('/',function (req,res) {
  Rincon.find({},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al recuperar los rincones");
    } else {
      res.json(data);
    }
  });
});

app.post('/:rincon',function (req,res) {  
  async.waterfall([
    function (done) {
      Rincon.findOne({title:req.params.rincon},function (err,data) {
        if (err) {
          done(err);
        } else {
          if (data) {
            done(null,data._id);
          }else{
            done(404)
          }

        }
      });
    },function (id,done) {
      // console.log(id);
      var after = req.query.after;

      if(!after){
        after = new Date();
        // console.log("Aún no");
      }

      if (typeof after != 'undefined') {
        Post.find({rincon:new Object(id),"date": { $lt: after}})
          .sort({'date': -1})
          .limit(4)
          .exec(function(err,data) {
            if (err) {
              done(err);
            } else {
              done(null,data);
            }
        });
      }else{
        done(null,null);
      }


    }
    ],function (err,data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al cargar el contenido de este rincón :/");
      } else {
        res.json(data);
      }
    });

});



module.exports = app;


//  Controllers
