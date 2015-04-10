var Bell = require('bell');
var config = require('./config.js');
var AuthCookie = require('hapi-auth-cookie');
var userCtrl = require('../controllers/user.ctrl');


module.exports = function(server) {
  // inspired by https://github.com/jaw187/hapi-auth/blob/master/bell.js
  server.register([AuthCookie, Bell], function(err) {
    server.auth.strategy('yammer', 'bell', config.yammerAuth);
    server.auth.strategy('facebook', 'bell', config.facebookAuth);
    server.auth.strategy('session', 'cookie', config.sessionAuth);
  });


  server.route({
    method: ['GET'],
    path: '/auth/facebook',
    config: {
      auth: 'facebook',
      handler: userCtrl.oauthHandler
    }
  });

  server.route({
    method: ['GET'],
    path: '/auth/yammer',
    config: {
      auth: 'yammer',
      handler: userCtrl.oauthHandler
    }
  });
};
