var Lab = require("lab");
var Code = require("code");
var CONSTANTS = require("../constants.js");
var Joi = require("Joi");
var lab = exports.lab = Lab.script();

// shortcuts
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;


lab.experiment("Constants Tests", { timeout : 3000 }, function() {
    // TODO create in the before hook a test user in the DB and
    // use that user in the credential object for all DB operations

    describe("Cookie Schema", function() {
      it("Facebook session cookie should work", function(done) {
        var cookieObject = {
          _id: '54a154d2d779a50feaedde57',
          service: 'facebook'
        };

        Joi.validate(cookieObject, CONSTANTS.COOKIE_SCHEMA, function (err, value) {
          expect(err).to.equal(null);
          done();
        });

      });

      it("yammer session cookie not to validate", function(done) {
        var cookieObject = {
          _id: '54a154d2d779a50feaedde57',
          service: 'yammer'
        };

        Joi.validate(cookieObject, CONSTANTS.COOKIE_SCHEMA, function (err, value) {
          expect(err).to.be.an.object();
          expect(err instanceof Error).to.be.true();
          done();
        });
      });

      it("yammer session to validate", function(done) {
        var cookieObject = {
          _id: '54a154d2d779a50feaedde57',
          service: 'yammer',
          networkId: '1512512'
        };

        Joi.validate(cookieObject, CONSTANTS.COOKIE_SCHEMA, function (err, value) {
          expect(err).to.equal(null);
          done();
        });

      });
    });
});
