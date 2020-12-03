const connection = require("./connection");


class Call {
    constructor(connection){
        this.connection = connection
    }
    allEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
    }
};

module.exports = new Call(connection);