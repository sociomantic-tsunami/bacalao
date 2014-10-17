var _ = require('underscore')
var employees = require('../employees.json');

module.exports = {

  getFullName: function(shortName) {
    var employee = _.where(employees, { short : shortName });

    if(employee.length === 0) {
        return shortName
    } else {
        return employee[0].name;
    }
  }

};

