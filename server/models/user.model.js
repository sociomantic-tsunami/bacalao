var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');


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
  location: {
    latitude:   Number,
    longitude:  Number
  },
  created: { type: Date, default: Date.now },
  updated: Date
}, {
  autoIndex: false,
  toObject: { virtuals: false },
  toJSON: { virtuals: false },
  id: true
});


userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});


module.exports = mongoose.model('User', userSchema);


