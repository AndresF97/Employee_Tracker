const connection = require("./connection");


class Call {
    constructor(connection){
        this.connection = connection
    }
    allEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
    }
    findallExistingManagers(employeeId){
        return this.connection.query(
            "SELECT id, first_name, last_name  FROM employee WHERE id != ?", employeeId
        )
    }
    addEmployees(data){
        return this.connection.query('INSERT INTO employee SET ?',data);
    }
    removeEmployee(id){
        return this.connection.query("DELETE FROM employee WHERE id = ?",id);

    }
    updateEmployee(id,roleId){
        return this.connection.query("UPDATE emplyee SET roles_id= ? WHERE id = ?",[roleId, id]);
    }
    updateEmployeeByManager(employeeId,managerId){
        return this.connection.query("UPDATE employee SET manager_id = ? WHERE id = ?",[managerId,employeeId])
    }
    findallRoles(){
        return this.connection.query(
            "SELECT roles.id, roles.title, departments.name AS departments, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id")
    }
    createRole(role){
        return this.connection.query("INSERT INTO roles SET ?",role)
    }
    removeRole(roleId){
        return this.connection.query("DELETE FROM roles WHERE id = ?",roleId)
    }
    findAllDepeartmets(){
        return this.connection.query("SELECT departments.id, departments.name, SUM(roles.salary) AS utilized_budget FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN departments on roles.department_id = departments.id GROUP BY departments.id, departments.name;")
    };
    createDepartment(department){
        return this.connection.query("INSERT INTO departments SET ?",department)
    };
    removeDepartment(departmentId){
        return this.connection.query("DELETE FROM departments WHERE id = ?", departmentId)
    }
    findAllEmployeesByDepartments(departmentsId){
        return this.connection.query("SELECT employee.id, employee.first_name,employee.last_name, departments.name AS departments, roles.title FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN departments on roles.department_id = departments.id WHERE departments.id  = ?;",departmentsId)
    }
    findAllEmployeesByManager(managerId){
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, departments.name AS departments, roles.title FROM employee LEFT JOIN roles on roles.id = employee.role_id LEFT JOIN departments ON departments.id = roles.department_id WHERE manager_id = ?;",managerId)
    }
};

module.exports = new Call(connection);