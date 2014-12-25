app = require('express.io')();
app.http().io()
count = 0

var ImageCtrl = require('./mods/images/index.js');
var UserCtrl  = require('./mods/users/index.js');

app.use('/',ImageCtrl);

app.io.route('posts', {
  create: function(req) {
    count += 1
    req.data.id = count
    app.io.broadcast('posts:create', req.data)
  },
  remove: function(req) {
    app.io.broadcast('posts:remove', req.data)
  },
  saludar: function (req) {
    console.log("LLegó un saludo");
    req.io.broadcast('posts:saludar',req.data)
  }
});
// Send the client html.
app.get('/', function(req, res) {
res.sendfile(__dirname + '/public/app.html')
})
app.listen(3000);
console.log("Listo!");
