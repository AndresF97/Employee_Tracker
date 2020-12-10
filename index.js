const inquirer = require("inquirer")
const cTable = require("console.table")
const logo = require('asciiart-logo');
const Call = require("./assets/connections/userRes")


function start(){
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
    promptUser()
}

const promptUser = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "what would you like to do?",
            choices: ["Add Employee", 
            "View All Employees", 
            "Update Employee role",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Remove Employee",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "Done"],
            name: "action"
        }
    ]).then(answer => {
        if (answer.action === "Add Employee") {
            ///Should add info to sq file
            //addName()

        } else if (answer.action === "View All Employees") {
            //view employes by department but with inquirer option to bring by department
            writeAll();
        } else if (answer.action === "View All Employees by Department") {
            //VIEW EMPLOYEES BY DEPARTMENT

        } else if (answer.action === "View All Roles") {
            //VIEW ALL ROLES
            rolesAll();

        } else if (answer.action === "Add Department") {
            //ADD A DEPARTMENT

        } else if (answer.action === "Remove Department") {
            //REMOVE DEPARTMENT

        }else if (answer.action === "View All Employess by Manager") {
            //VIEW ALL EMPLOYEES BY MANAGER
        }
         else if (answer.action === "Update Employee role") {
            //UPDATE EMPLOYEE ROLE
        }
         else if (answer.action === "Done") {
            console.log("Well Done!")
            process.exit()
        }
    })



}

function addName(data) {
    console.log(data)
    addEmployee(data)
    promptUser()
}

async function writeAll(){
    const employees = await Call.allEmployees();
    console.log("\n");
    console.table(employees)
    promptUser()
}

async function rolesAll(){
    const listRoles = await Call.findallRoles();
    console.log("\n")
    console.table(listRoles)
    promptUser()
}



start();