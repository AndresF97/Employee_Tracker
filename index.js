const inquirer = require("inquirer")
const cTable = require("console.table")
const logo = require('asciiart-logo');
const Call = require("./assets/connections/userRes");
const { connect } = require("./assets/connections/connection");


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
            return deleteDepartment();
        }else if(answer.action === "Remove Employee"){
            //REMOVE EMPLOYEE
            return deleteEmployee();
        }
        else if (answer.action === "View All Employees by Manager") {
            //VIEW ALL EMPLOYEES BY MANAGER
            return viewAllByManager();
        }
         else if (answer.action === "Update Employee role") {
            //UPDATE EMPLOYEE ROLE
            return updateRole()
        }
        else if(answer.action === "Add Role"){
            //ADD ROLE
            return addsRole();
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
    const roleChoices = roles.map(({id, title})=>({
        name: title,
        value: id
    }));
    const {roleId} = await inquirer.prompt({
        type:"list",
        name:"roleId",
        message:"Whast the employee position?",
        choices: roleChoices
    });
    console.log(roleChoices)
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
async function addsRole(){
    const allDepartments = await Call.findAllDepeartmets()
    const departmentChoice = allDepartments.map(({id, name}) =>({
        name: name,
        value:id
    }));
    const promptNewRoles = await inquirer.prompt([
        {
            message:"Whats the new Role called?",
            name:"title",
        },
        {
            message:"How much would the employee make while wokring on that role?",
            name:"salary"
        },{
            type:"list",
            message:"What department will the role belong to?",
            name:"department_id",
            choices:departmentChoice
        }
    ])
    await Call.createRole(promptNewRoles)
    console.log("\n")
    console.log(`You have added '${promptNewRoles.title}' as a new Role!`)
    promptUser()
}

async function deleteEmployee(){
    const allEmployees = Call.allEmployees();
    const choosedeleteEmployee = await inquirer.prompt([
        {
            type:"list",
            message:"Chooose a employee to delete:",
            name:"selectedEmployee",
            choosen:EmplpoyeeList
        }
    ])
    console.log(`${choosedeleteEmployee.selectedEmployee}, has been deleted.`)
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

async function viewAllByManager(){
    console.log("Manager")
    const managers = await Call.allEmployees();
    const managerChoices = managers.map(({id,first_name,last_name})=>({
        name:`${first_name} ${last_name}`,
        value:id
    }));
    const { choosen } =  await inquirer.prompt([
        {
            type:"list",
            name:"choosen",
            message:"Which department manager do you want to see?",
            choices: managerChoices
        }
    ])
    const employee = await Call.findAllEmployeesByManager(choosen)
    console.log('\n')
    if(employee.length === 0 ){
        console.log("Sorry this person is not a manager.")
        promptUser()
    }else{
        console.table(employee)
        promptUser();
    }
}
async function updateRole(){
    const employeeList= await Call.allEmployees()
    const role = await Call.findallRoles();
    const choices = employeeList.map(({id, first_name,last_name})=>({
        name:`${first_name} ${last_name}`,
        id:id
        })
    )
    const {updateId} = await inquirer.prompt([
        {
            type:"list",
            name:"updatedId",
            message:"Which employees' Role do ypou want to update?",
            choices:choices
        }
    ])
    const rolesChoices = role.map(({id, title})=>({
        name:title,
        value:id
    }))
    const {roleId} = await inquirer.prompt([
        {
            type:"list",
            name:"roleId",
            message:"Which new role would you like to choose?",
            choices:rolesChoices
        }
    ])
    await Call.updateEmployee(updateId,roleId)
    console.log("Role was updated!")
    promptUser();
}

start();