var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  login : function(username) {
    AppDispatcher.handleViewAction({
      type: "LOGIN",
      username : username
    });
  }

};

