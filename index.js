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
            writeEmployee();
            // writeRoles();
            // writeDepartments()

        }else if (answer.action === "Update Employee role"){
        //viewing employees by manager but wth an inquirer prompt depending on the manager
        }else if (answer.action === "Done"){
            console.log("Well Done!")
            connection.end()
            }
    })



}

function addEmployee(){
    connection.query("SELECT * FROM  roles",function(err,res){
        if(err) throw err
        var choices = []
        res.forEach(item => {
            choices.push[{tilte : item.title}]
            
        });
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
            name:"role",
            type:"list",
            choices: choices,
            message:"whats role will your employee hold?"
        }

    ]).then(answer =>{
        addName(answer)
        


        })
    })
}

function addName(data){
    connection.query('INSERT INTO employee SET ?',{first_name:data.first_name,last_name:data.last_name},function(err){
        if(err) throw err
        console.log("Your Employee was added")
        addRole(data.role)
    })
}
function addRole(data){
    connection.query("INSERT INTO roles Set?",{title: data},function(err){
        if(err) throw err;
        console.log("and the role was set")
        promptUser()
    })
}
function selectJob(){
    connection.query
}