var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var services = 'facebook window google'.split(' ');
var gender = 'male female'.split(' ');


var userSchema = new Schema({
  firstName:  String,
  middleName:  String,
  lastName:  String,
  gender:  { type: String, enum: gender },
  email:  String,
  picture: String,
  service: { type: String, enum: services },
  serviceUserId: { type: String, index: true },
  accessToken:  String,
  tokenExpiration:  Date,
  created: { type: Date, default: Date.now },
  updated: Date
}, { autoIndex: false });


module.exports = mongoose.model('User', userSchema);


