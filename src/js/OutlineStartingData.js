var events = require('./StartingData');

module.exports = {

  init: function() {
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));
  }
};

