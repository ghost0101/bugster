var mongoose  = require('./../config/config.js').mongoose;

var Schema = mongoose.Schema;

var RinconSchema = new Schema({
  title: 	String,
  description: String,
  date: {
    type:Date,
    default:Date.now()
    },
  moderators: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  _user: {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
});


var Rincon = mongoose.model('Rincon',RinconSchema);


// var rin = new Rincon({title:'memes',description:'Memes: todas esas payasadas que nos encontramos en el camino van aqui'});
//
// rin.save(function (err,data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });



module.exports = Rincon;
