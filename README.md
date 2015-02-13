bacalao
===========

Lunch scheduler

Setup
-----

1. Run `npm install`
2. Run `cp config.json.example config.json`
3. Enter the configuration to the `config.json`
4. Point `bacalao.io` to 127.0.0.1 in your hosts file
5. Run `npm run-script dev` to watch and compile static assets and run the server


* For easy logging install bunyan globally `npm install -g bunyan`

* Make you have `nodemon` and [webpack](https://github.com/webpack/docs/wiki/cli#installation) installed globally.

* Watching files is something that is sometimes limited in number by the OS. This can cause some weirdness with all of these dev tools. [Refer to this](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) if you get a `watch ENOSPC` error.


Conventions
-----------
- Indentation - 2 spaces
- Colon directly after the property name.
```javascript
var polishFood = {
  pierogi: true,
  bacalhau: false
};
```
- Curly braces the opening one on the same line
- White space - no need to add spaces where not needed
```javascript
var logout = function() {
  user.logout();
  return false;
}
```
