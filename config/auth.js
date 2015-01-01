var config = require('./config.js');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./../models/user');
var async = require('async');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: config.facebook.callback
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      var userData = {
        surname  : profile.name.familyName,
        name    : profile.name.givenName,
        facebook  : profile.id,
        gender    : profile.gender
      }

      User.findOne({facebook:profile.id},function(err,data){
        if (err) {
          done(err);
        } else {
            if (data) {
              //  If it exist we return its data
              done(null,data);
            }else{
              //  If it doesn't exist we create it
              newUser = new User(userData);
              newUser.save(function (err,data) {
                if (err) {
                  done(err);
                } else {
                  done(null,data);
                }
              });

            }
          }
        });
    });
  }
));




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.session.return) {
      res.redirect(req.session.return);
      req.session.return= null;
    }else{
      return next();
    }
  }else{
      req.session.returnTo = req.path;
      res.redirect('/');
  }
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.user_type_id==9) {
      return next();
    }else{
      res.send(403);
    }
  }else{
      req.session.returnTo = req.path;
      res.redirect('/');
  }
}

function validateAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }else{
      res.send(401);
  }
}

   module.exports.ensureAuthenticated = ensureAuthenticated;
   module.exports.validateAuthenticated = validateAuthenticated;
   module.exports.ensureAdmin = ensureAdmin;
   module.exports.passport = passport;
   module.exports.FacebookStrategy = FacebookStrategy;
