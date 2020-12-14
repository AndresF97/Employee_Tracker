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
             return addName();
        } else if (answer.action === "View All Employees") {
            //view employes by department but with inquirer option to bring by department
            return writeAll();
        } else if (answer.action === "View All Employees by Department") {
            //VIEW EMPLOYEES BY DEPARTMENT
            return departmentsByEmployees();
        } else if (answer.action === "View All Roles") {
            //VIEW ALL ROLES
            return rolesAll();
        } else if (answer.action === "Add Department") {
            //ADD A DEPARTMENT
            return AddNewDepartment();
        } else if (answer.action === "Remove Department") {
            //REMOVE DEPARTMENT
            return deleteDepartment()
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

async function addName() {
    const roles  = await Call.findallRoles();
    const employees = await Call.allEmployees();
    const promptName = await inquirer.prompt([
        {
            name:"first_name",
            message:"Employee first name?",
        },
        {
            name:"last_name",
            message:"Employee last name?"
        }
    ]);
    const roleChoices = roles.map(({id, position})=>({
        name: position,
        value: id
    }));
    const {roleId} = await inquirer.prompt({
        type:"list",
        name:"roleId",
        message:"Whast the employee position?",
        choices: roleChoices
    });
    promptName.roles_id = roleId;

    const managerChoice = employees.map(({id, first_name, last_name})=>({
        name:`${first_name} ${last_name}`,
        value: id 
    }));
    managerChoice.unshift({name:"N/A",value:null});
    const {managerId} = await inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Whos the employee manager?",
        choices: managerChoice
    })
    promptName.manager_id = managerId;
    await Call.addEmployees(promptName)
    console.log(`"${promptName.first_name} ${promptName.last_name}" was added to your employee list.`)
    promptUser();
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
async function departmentsByEmployees(){
    const allDepartments = await Call.findAllDepeartmets();
    const choices = allDepartments.map(({id,name})=>({
        name:name,
        value:id
    }));
    const {departmentChoice} = await inquirer.prompt([
        {
            type:"list",
            name:"departmentChoice",
            message:"Which departments employee's will you like to see?",
            choices:choices
        }
    ])
    const listOfEmployees = await Call.findAllEmployeesByDepartments(departmentChoice);
    console.log("\n");
    console.table(listOfEmployees);
    promptUser();
}

async function AddNewDepartment(){
    const newDepartment = await inquirer.prompt([
        {
            name:"name",
            message:"What's the name of the department you've created?"
        }
    ])
    await Call.createDepartment(newDepartment);
    
    console.log(`Added a new department: ${newDepartment.name}`)
    promptUser()
}
async function deleteDepartment(){
    const department = await Call.findAllDepeartmets()
    const departmentChoices = department.map(({id,name})=>({
        name:name,
        value:id
    }))
    const departmentChoosen = await inquirer.prompt([
        {
            type:"list",
            name:"choice",
            message:"Which department will you like to delete?",
            choices:departmentChoices
        }
    ])
    await Call.removeDepartment(departmentChoosen)
    console.log(`${departmentChoosen.choice} was removed from your Department list.`)

    promptUser();
}

start();