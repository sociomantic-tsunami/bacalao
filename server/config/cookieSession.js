var config = require('../../config.json');

module.exports = {
  cookieName: config.cookieKey,
  path: '/api',
  secret: config.cookieSecret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
};
