var ActionTypes = require('../constants/Constants').ActionTypes;


module.exports = {

  getUser: function() {
    var user = localStorage.getItem('user');
    if(!user) {
      return;
    }

    user = JSON.parse(user);

    // This should normally be in an ActionCreator
    // For simplicity it's dispached here.
    AppDispatcher.handleInitAction({
      type: Constants.ActionTypes.LOAD_USER,
      user: user
    });
  }
};

