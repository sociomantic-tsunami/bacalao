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
    place_id: { type: String, required: true },
    name: { type: String, required: true },
    formatted_address: { type: String, required: true },
    url: { type: String, required: true },
    international_phone_number: { type: String },
    geometry: {
      location: {
        k: Number,
        B: Number
      }
    },
    rating: { type: Number},
    website: { type: String }
  }
}, {
    autoIndex: false,
    id: false
});



module.exports = mongoose.model('Event', eventSchema);
