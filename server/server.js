var config = require('../config.json'),
    restify = require('restify'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectID;



var server = restify.createServer();


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
    console.log("Connceted to db: ", mongoose.connection.host);
    server.listen(3000, function () {
        console.log("Server started @ 3000");
    });
});


server.get("/events", routes.getEvents);


mongoose.connect(config.dburi);
