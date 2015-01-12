var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  time: { type: Date, required: true },
  details: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: { type: Number, required: false, default: 0 },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // comments: [{ body: String, date: Date }],
  venue: {
    name: { type: String, required: true },
    place_id: { type: String },
    formatted_address: { type: String},
    url: { type: String },
    international_phone_number: { type: String },
    geometry: {
      location: {
        long: Number,
        lat: Number
      }
    },
    rating: { type: Number},
    website: { type: String }
  }
}, {
    autoIndex: false,
    id: true
});



module.exports = mongoose.model('Event', eventSchema);
