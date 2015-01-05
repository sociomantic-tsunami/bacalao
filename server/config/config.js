var config = require('../../config.json');

config.sessionAuth = {
  password: config.cookieSecret,
  cookie: config.cookieKey,
  isSecure: false
};

config.facebookAuth = {
  provider: 'facebook',
  password: config.cookieSecret,
  clientId: config.facebookAppId,
  clientSecret: config.facebookAppSecret,
  isSecure: false
};

config.statehood = {
  encoding: 'iron',
  password: config.cookieSecret,
  isSecure: false
};


Object.freeze(config);
Object.freeze(config.sessionAuth);
Object.freeze(config.facebookAuth);
Object.freeze(config.statehood);


module.exports = config;
