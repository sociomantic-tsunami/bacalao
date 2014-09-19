var _ = require('underscore')
var employeeJSON = fs.readFileSync('../employees.json');
var employees = [];


try {
    employees = JSON.parse(employeeJSON);
} catch(e) {
    console.error('employees.json is either corrupt or doesn\'t exist');
}


module.exports = {

  getFullName: function(shortName) {
    employee = _.where(employees, { short : shortName });

    if(!employee) {
        return shortName
    } else {
        return employee.name;
    }
  }

};

