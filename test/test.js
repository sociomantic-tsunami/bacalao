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


var testUserId = '54a154d2d779a50feaedde57';

lab.experiment("Basic HTTP Tests", function() {

    it("endpoint / returns 200 ", function(done) {
        var options = {
            method: "GET",
            url: "/"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.a.string();
            expect(response.result).to.include('Bacalao');
            done();
        });
    });


    it("endpoint / redirects to app if logged in ", function(done) {
        var options = {
            method: "GET",
            url: "/",
            credentials: {
              _id: testUserId
            }
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal('/app');
            done();
        });
    });

    it("endpoint /app redirects to / when logged-out ", function(done) {
        var options = {
            method: "GET",
            url: "/app"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal('/');
            done();
        });
    });


    it("endpoint /app return 200 when logged-in", function(done) {
        var options = {
            method: "GET",
            url: "/app",
            credentials: {
              _id: testUserId
            }
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.include('bundle.js');
            done();
        });
    });


    it("entry endpoint /me redirects to / ", function(done) {
        var options = {
            method: "GET",
            url: "/api/me"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(401);
            done();
        });
    });

    it("endpoint /me returns 200 with user info", function(done) {
        var options = {
            method: "GET",
            url: "/api/me",
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            var expectedKeys = ['_id', 'firstName', 'lastName', 'email', 'service', 'serviceUserId', 'picture'];
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.only.include(expectedKeys);
            done();
        });
    });

    it("/auth/logout deletes the session cookie and redirects to the root", function(done) {
        var options = {
            method: "GET",
            url: "/auth/logout",
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal('/');
            expect(response.headers['set-cookie'][0]).to.be.a.string();
            expect(response.headers['set-cookie'][0]).to.include('session=;');

            done();
        });
    });


    it("/api/events requires session cookie", function(done) {
        var options = {
            method: "GET",
            url: "/api/events",
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(401);
            done();
        });
    });

    it("/api/events returns an array", function(done) {
        var options = {
            method: "GET",
            url: "/api/events",
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.an.array();
            done();
        });
    });


    it("POST /api/event creates an event", function(done) {
        var options = {
            method: "POST",
            url: "/api/event",
            credentials: {
                _id: testUserId
            },
            payload: {
                attendees: [testUserId],
                creator: testUserId,
                details: 'TEST EVENT',
                maxAttendees: 10,
                time: new Date(1420070400000),
                venue: {
                    name: 'TEST VENUE',
                    url: 'TESTURL',
                    formatted_address: 'TEST ADDRESS',
                    place_id: 'TESTID'
                }
            }
        };


        server.inject(options, function(response) {
            console.log(response);
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.an.object();
            done();
        });
    });

    it("POST /api/event with other attendees or creator from the credential fails", function(done) {

        // server.inject(options, function(response) {
        //     done();
        // });
    });

    it("DEL /api/event/eventIds removes an event", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/event/54818efa6709ea9ed0cc511b",
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            expect(response.result).to.be.an.object();
            expect(response.result).to.be.an.object();
            done();
        });
    });

});
