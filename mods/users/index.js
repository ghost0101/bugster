var User = require('./model.js');

var usr = new User({name:"Cedric",nick:"Ced",date:new Date()});

// usr.save(function (err) {
//   if (err) {
//     console.log(err);
//   }else{
//     console.log("Usuario guardado");
//   }
// });
//


// User.find({},function (err,data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
