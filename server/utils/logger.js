var config = require('../../config.json'),
    Logger = require('bunyan');


module.exports = new Logger.createLogger({
    name: config.name,
    serializers: Logger.stdSerializers
});
