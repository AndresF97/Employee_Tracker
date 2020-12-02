const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")
const logo = require('asciiart-logo');

console.log(logo({
    name:"Employee tracker",
    font:"Big Money-ne",
    lineChars:10,
    padding:2,
    margin:2,
    borderColor: 'grey',
    logoColor: 'bold-green',
    textColor: 'green',
}).render());

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});


connection.connect((err) => {
    if (err) throw err
    console.log("connected as id " + connection.threadId)
    promptUser()
});
const promptUser = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "what would you like to do?",
            choices: ["Add Employee", "View All Employees", "Update Employee role", "Done"],
            name: "action"
        }
    ]).then(answer => {
        if (answer.action === "Add Employee") {
            ///Should add info to sq file
            addEmployee()

        } else if (answer.action === "View All Employees") {
            //view employes by department but with inquirer option to bring by department
            writeAll();
            

        } else if (answer.action === "Update Employee role") {
            //viewing employees by manager but wth an inquirer prompt depending on the manager
        } else if (answer.action === "Done") {
            console.log("Well Done!")
            connection.end()
        }
    })



}

function addEmployee() {
    connection.query("SELECT * FROM  roles", function (err, res) {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                message: "whats the employees' first name?",
                name: "first_name"
            }, {
                type: "input",
                message: "whats the employees' last name?",
                name: "last_name"
            }, {
                name: "role",
                type: "list",
                choices: function () {
                    var choiceArray = [];

                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].id+"."+res[i].title)
                    }
                    return choiceArray
                },
                message: "whats role will your employee hold?"
            }

        ]).then(answer => {
             addName(answer)
        })
    })
}
function addName(data) {
    console.log(data)
    connection.query('INSERT INTO employee SET ?', { first_name: data.first_name, last_name: data.last_name,role_id:data.role.split("")[0]}, function (err) {
        if (err) throw err
        console.log("Your Employee was added")
    })
    promptUser()
}

function writeAll(){
    connection.query('SELECT * FROM employee LEFT JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id',(err,res) =>{
        if(err) throw err
        console.log("\n")
        console.table(res)
        console.log("\n")
    })
    promptUser()
}