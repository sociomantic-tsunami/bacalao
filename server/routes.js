exports.getEvents = function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.send("You will see all the products in the colection with this end point");
    return next();
}
