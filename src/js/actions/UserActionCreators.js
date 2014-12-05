var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var UserApiUtils = require('../utils/UserApiUtils');

module.exports = {

  logout : function() {
    UserApiUtils.logout();
  }

};

