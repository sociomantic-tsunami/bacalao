var config = require('../config.json'),
    restify = require('restify'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectID;

mongoose.connect(config.dburi);

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.listen(3000, function () {
    console.log("Server started @ 3000");
});

server.get("/events", function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.send("You will see all the products in the colection with this end point");
    return next();
});
