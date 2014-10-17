var nodes = require('./StartingData');

module.exports = {

  init: function() {
    localStorage.removeItem('nodes');
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }
};

