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


// var rin = new Rincon({title:'musica',description:'Comparte aqui esas canciones que has encontrado en youtube que merecen ser escuchadas por todo el mundo :)'});
//
// rin.save(function (err,data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });



module.exports = Rincon;
