var AppDispatcher = require('../dispatcher/AppDispatcher');
var SocialLoginUtils = require('../utils/SocialLoginUtils');


module.exports = {

  loginFB : function(username) {
    AppDispatcher.handleViewAction({
      type: "LOGIN_FB"
    });
    SocialLoginUtils.loginFB();
  }

};

