"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    UserApiUtils = require('../utils/UserApiUtils'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes,
    UserStore = require('../stores/UserStore');


module.exports = {

  loggedInFB : function(user) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGGED_IN_FB,
      user : user
    });
    // read from the store the full user object
    // including the _id isn't in the response from the FB API
    UserApiUtils.login(UserStore.getUser());
  },


  /**
   * Once the user successfully logged out of FB
   */
  loggedOutFB : function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGGED_OUT_FB
    });

  }

};

