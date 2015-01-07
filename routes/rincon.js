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

app.get('/:rincon',function (req,res) {
  Rincon.findOne({title:req.params.rincon},function (err,data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al recuperar los detalles del rincón");
    } else {
      res.json(data);
    }
  });
});

app.post('/:rincon',function (req,res) {
  async.waterfall([
    function (done) {
      console.log(req.params.rincon);
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
        //console.log("Aún no hay after");
        after = new Date();
      }else {
        //console.log("Si hay after: "+after);
      }

      Post.find({rincon:new Object(id),"date": { $lt: after}})
        .sort({'date': -1})
        .limit(3)
        .exec(function(err,data) {
          if (err) {
            done(err);
          } else {
            console.log("Nuevos resultados "+data.length);
            done(null,data);
          }
      });


    }
    ],function (err,data) {
      if (err) {
        // console.log(err);
        res.status(500).send("Error al cargar el contenido de este rincón :/");
      } else {
        res.json(data);
      }
    });

});



module.exports = app;


//  Controllers
