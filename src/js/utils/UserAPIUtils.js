var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


module.exports = {


  login: function(user) {

    request
      .post(Constants.Endpoints.LOGIN)
      .type('json')
      .set('Accept', 'application/json')
      .send(user)
      .on('error', function(err) {
        console.error('API Login Error', err);
      })
      .end(function(res) {
        console.log(res.body);
        UserServerActionCreators.loggedInAPI(res.body)
      });


    // var rawMessages = JSON.parse(localStorage.getItem('messages'));
    // var timestamp = Date.now();
    // var id = 'm_' + timestamp;
    // var threadID = message.threadID || ('t_' + Date.now());
    // var createdMessage = {
    //   id: id,
    //   threadID: threadID,
    //   threadName: threadName,
    //   authorName: message.authorName,
    //   text: message.text,
    //   timestamp: timestamp
    // };
    // rawMessages.push(createdMessage);
    // localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    // setTimeout(function() {
    //   ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    // }, 0);
  }

};
