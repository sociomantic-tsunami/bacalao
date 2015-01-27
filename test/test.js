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
var randomId = '54a154d2d79af507aeedde57';
var testEventId;

lab.experiment("Basic HTTP Tests", { timeout : 3000 }, function() {
    // TODO create in the before hook a test user in the DB and
    // use that user in the credential object for all DB operations

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
                cid: 'TESTCID',
                details: 'TESTEVENT',
                maxAttendees: 10,
                time: new Date(2020, 0),
                venue: {
                    name: 'TEST VENUE',
                    url: 'TESTURL',
                    formatted_address: 'TEST ADDRESS',
                    place_id: 'TESTID'
                }
            }
        };


        server.inject(options, function(response) {
            testEventId = response.result._id;
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.an.object();
            expect(response.result).to.only.include([
                '_id', 'cid', 'time', 'venue', 'maxAttendees', 'creator', 'attendees', 'details'
            ]);
            expect(response.result.attendees).to.have.length(1);
            expect(response.result.creator).to.be.an.object();

            expect(response.result.cid).to.equal('TESTCID');
            expect(response.result.details).to.equal('TESTEVENT');
            expect(response.result.maxAttendees).to.equal(10);
            expect(response.result.venue).to.be.an.object();
            expect(response.result.venue.name).to.equal('TEST VENUE');
            expect(response.result.venue.url).to.equal('TESTURL');
            expect(response.result.venue.formatted_address).to.equal('TEST ADDRESS');
            expect(response.result.venue.place_id).to.equal('TESTID');

            done();
        });
    });



    it("GET /api/me/upcoming returns an array containing upcoming events", function(done) {
        var options = {
            method: "GET",
            url: '/api/me/upcoming',
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.an.array();
            expect(response.result).to.include(testEventId);

            done();
        });
    });

    it("POST /api/event returns forbidden 403 with random attendee", function(done) {
        var options = {
            method: "POST",
            url: "/api/event",
            credentials: {
                _id: testUserId
            },
            payload: {
                attendees: [randomId],
                creator: testUserId,
                cid: 'TESTCID',
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
            expect(response.statusCode).to.equal(403);
            done();
        });
    });

    it("POST /api/event returns forbidden 403 with different creator", function(done) {
        var options = {
            method: "POST",
            url: "/api/event",
            credentials: {
                _id: testUserId
            },
            payload: {
                attendees: [testUserId],
                creator: randomId,
                cid: 'TESTCID',
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
            expect(response.statusCode).to.equal(403);
            done();
        });
    });


    it("DELETE /api/event/{eventId}/attendees/{userId} returns 403 with different user", function(done) {
        var options = {
            method: "DELETE",
            url: '/api/event/' + testEventId + '/attendees/' + randomId,
            credentials: {
                _id: testUserId
            }
        };

        server.inject(options, function(response) {

            expect(response.statusCode).to.equal(403);
            done();
        });
    });


    it("DELETE /api/event/{eventId}/attendees/{userId} leaves an event", function(done) {
        var options = {
            method: "DELETE",
            url: '/api/event/' + testEventId + '/attendees/' + testUserId,
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result.eventId).to.equal(testEventId);
            expect(response.result.userId).to.equal(testUserId);

            done();
        });
    });

    it("PUT /api/event/{eventId}/attendees/{userId} returns 403 with different user", function(done) {
        var options = {
            method: "PUT",
            url: '/api/event/' + testEventId + '/attendees/' + randomId,
            credentials: {
                _id: testUserId
            }
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });


    it("PUT /api/event/{eventId}/attendees/{userId} joins an event", function(done) {
        var options = {
            method: "PUT",
            url: '/api/event/' + testEventId + '/attendees/' + testUserId,
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result.eventId).to.equal(testEventId);
            expect(response.result.user).to.be.an.object();

            done();
        });
    });


    it("POST /api/event with other attendees or creator from the credential fails");



    it("DEL /api/event/eventId with a different creator fails", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/event/" + testEventId,
            credentials: {
                _id: randomId
            }
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });


    it("DEL /api/event/eventId removes an event", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/event/" + testEventId,
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.an.object();
            expect(response.result.removed).to.be.true();
            expect(response.result.eventId).to.equal(testEventId);
            done();
        });
    });

    it("DEL /api/event/eventId returns 404", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/event/" + testEventId,
            credentials: {
                _id: testUserId
            }
        };


        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});
