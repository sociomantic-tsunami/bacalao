var Joi = require('joi');


var CONSTANTS = {
  COOKIE_SCHEMA: {
    _id: Joi.string().required(),
    service: Joi.string().required(),
    networkId: Joi.string().when('service', { is: 'yammer', then: Joi.required() })
  }
};




Object.freeze(CONSTANTS);

module.exports = CONSTANTS;
