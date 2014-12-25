var express = require('express.io');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var busboy = require('connect-busboy');
// var logger = require('morgan');  // Logs con IP y datos del navegador
var methodOverride = require('method-override');
var session = require('express-session');
var auth = require('./auth');


var passport = auth.passport;




  var app = express();
  app.http().io()

// configure Express
  app.set('views', __dirname + './../views');
  app.set('view engine', 'ejs');
  // app.use(logger()); // Esta es la cosa que llena todo de logs ¬¬
  app.use(cookieParser());
  app.use(methodOverride());

  app.use(session({ secret: 'holabartola' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);
  //Para subir archivos
  app.use(bodyParser({
        keepExtensions: true,
        limit: 10000000, // 10M limit
        uploadDir: __dirname +'/temp' }));
  app.use(busboy());

  app.use(express.static(__dirname + './../public'));



  module.exports.app = app;
