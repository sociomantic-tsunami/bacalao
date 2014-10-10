var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserApiUtils = require('../utils/UserApiUtils');


module.exports = {

  loggedIn : function(user) {
    AppDispatcher.handleViewAction({
      type: "LOGGED_IN_FB",
      user : user
    });

    UserApiUtils.login(user);

  }

};

