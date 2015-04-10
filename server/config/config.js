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

config.yammerAuth = {
  provider: {
    name: 'yammer',
    protocol: 'oauth2',
    auth:  'https://www.yammer.com/oauth2/authorize',
    token: 'https://www.yammer.com/oauth2/access_token.json',
    scope: [],
    profile: function (credentials, params, get, callback) {
      credentials.profile = {
          id: params.user.id,
          username: params.user.email,
          displayName: params.user.full_name,
          name: {
              first: params.user.first_name,
              last: params.user.last_name
          },
          email: params.user.email,
          raw: params.user
      };

      return callback();
    }
  },
  password: config.cookieSecret,
  clientId: config.yammerAppId,
  clientSecret: config.yammerAppSecret,
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
