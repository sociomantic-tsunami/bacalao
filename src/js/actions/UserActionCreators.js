var AppDispatcher = require('../dispatcher/AppDispatcher'),
    SocialLoginUtils = require('../utils/SocialLoginUtils'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;

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
  }

};

