var app    	= require('express.io')();
var async   = require('async');
var auth    = require('./../config/auth.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
validateAuthenticated = auth.validateAuthenticated;

//  Modelos
var User     = require('./../models/user.js');


var sanitizer = require('sanitizer');

app.get('/profile', validateAuthenticated, function(req, res){
    User.findOne(req.user._id,function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("");
        }else{
          res.json(data);
        };
    })
});



module.exports = app;
