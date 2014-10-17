var ActionTypes = require('../constants/Constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher');


module.exports = {

  init: function() {
    var user = localStorage.getItem('user');
    if(!user) {
      return;
    }

    user = JSON.parse(user);
    // This should normally be in an ActionCreator
    // For simplicity it's dispached here.
    AppDispatcher.handleInitAction({
      type: ActionTypes.INIT_USER,
      user: user
    });
  },

  logout: function() {
    localStorage.removeItem('user');
  }
};

