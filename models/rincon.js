var mongoose  = require('./../config/config.js').mongoose;

var Schema = mongoose.Schema;

var RinconSchema = new Schema({
  title: 	String,
  description: String,
  priority: Number,
  date: {
    type:Date,
    default:Date.now()
    },
  column: Number,
  moderators: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  user: {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
});



// RinconSchema.aggregate(
//   { $group:{ _id: '$product_manufacturer', total_products: { $sum: 1 } }
//   },
//   function (err, res) {
//     if (err) return handleError(err);
//       console.log(res);
//   }
// );

// Model.find({}, [fields], {'group': 'FIELD'}, function(err, logs) {
//         ...
// });

RinconSchema.methods.latest = function latest(params, callback) {
  console.log("nouuu"+params);
}


var Rincon = mongoose.model('Rincon',RinconSchema);


// var rin = new Rincon(
//   {title:'musica',
//   description:'Si estás en busca de inspiración este Rincón es ideal para tí, aquí podrás encontrar todo de frases... desde inspiradoras hasta cómicas.',
//   column:2
//   });
//
// rin.save(function (err,data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });



module.exports = Rincon;
