var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var xhr = require('xhr');


module.exports = {


  login: function(user) {
    console.log(user);
    console.log('UserAPIUtils');

    xhr({
        json: user,
        uri: Constants.Endpoints.LOGIN,
        method: "POST",
    }, function(err, resp, body) {
        console.log(arguments);
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
