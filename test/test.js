var Lab = require("lab");
var Code = require("code");
var server = require("../server/server.js");
var lab = exports.lab = Lab.script();

// shortcuts
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;



lab.experiment("Basic HTTP Tests", function() {

    it("entry endpoint / returns 200 ", function(done) {
        var options = {
            method: "GET",
            url: "/"
        };
        // server.inject lets you similate an http request
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.a.string();
            expect(response.result).to.be.include('Bacalao');
            done();
        });
    });

});
