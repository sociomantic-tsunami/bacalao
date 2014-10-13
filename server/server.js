var config = require('../config.json'),
    restify = require('restify'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectID;


restify.defaultResponseHeaders = function(data) {
  this.header('Content-Type', 'application/json; charset=utf-8');
};

var server = restify.createServer();


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());



server.get("/api/events", routes.getEvents);
server.post("/api/event", routes.createEvent);
server.post("/api/user", routes.createUser);

server.get(/\/.*/, restify.serveStatic({
  directory: '../dist/',
  default: 'index.html'
}));


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
    console.log("Connceted to db: ", mongoose.connection.host);
    if(!config.port) {
      console.log("no server port defined in the config");
    	process.exit(1);
    }
    server.listen(config.port, function () {
        console.log("Server started @ " + config.port);
    });
});



mongoose.connect(config.dburi);
