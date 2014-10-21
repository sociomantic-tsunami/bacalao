module.exports = {
  getSessionId : function() {
    return sessionStorage.getItem('sessionId') || 'debugSession';
  }
}