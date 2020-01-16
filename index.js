const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"password",
    database: "employee_db"
});

connection.connect((err)=>{
    if(err) throw err
    console.log("connected as id "+connection.threadId)
    // writeDepartments()
    // writeRoles()
    // writeEmployee()
    promptUser()
});
const promptUser = ()=>{
    inquirer.prompt([
        {
            type:"list",
            message:"what would you like to do?",
            choices:["Add Employee","View All Employess","Update Employee role","Done"],
            name:"action"
        }
    ]).then(answer =>{
        if(answer.action === "Add Employee"){
            ///Should add info to sq file
            addEmployee()

        }else if( answer.action === "View All Employes" ){
            //view employes by department but with inquirer option to bring by department

        }else if (answer.action === "Update Employee role"){
        //viewing employees by manager but wth an inquirer prompt depending on the manager
        }else if (answer.action === "Done"){
            console.log("Well Done!")
            connection.end()
            }
    })



}

function addEmployee(){
    inquirer.prompt([
        {
            type:"input",
            message:"whats the employees' first name?",
            name:"first_name"
        },{
            type:"input",
            message:"whats the employees' last name?",
            name:"last_name" 
        },{
            type:"list",
            message:"whats role will your employee hold?",
            choices:["Sales Lead","Sales Person","Lead Edngineer","Software Engineer","Account Manager","Account","Legal Team lead","Lawyer"],
            name:"role" 
        }
    ])
}


// function writeDepartments(){
//     connection.query("SELECT * FROM departments",(err,res) =>{
//         if(err) throw err
//         console.table(res)
//     })
// }

// function writeRoles(){
//     connection.query("SELECT * FROM roles",(err,res) =>{
//         if(err) throw err;
//         console.table(res)
//     })

// }
// function writeEmployee(){
//     connection.query("SELECT* FROM roles",(err,res)=>{
//         if(err) throw err;
//         console.table(res)
//     })
// }
