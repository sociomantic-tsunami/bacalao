var AppDispatcher = require('../dispatcher/AppDispatcher');
var SocialLoginUtils = require('../utils/SocialLoginUtils');
var Constants = require('../constants/Constants');
var UserApiUtils = require('../utils/UserApiUtils');
var ActionTypes = Constants.ActionTypes;

module.exports = {

  loginFB : function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_FB
    });
    SocialLoginUtils.loginFB();
  },

  logoutFB : function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_FB
    });
    SocialLoginUtils.logoutFB();
    UserApiUtils.logout();
  }

};

