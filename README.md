# Employee_Tracker
- This app can keep track of your employees' name,salary and department.
# What you'll need to make the app work
1. start the terminal and type on your command line "npm i". It should be able to download all packages needed to work.
2. copy the text from "employee.sql" file and paste it to you MYSQLWorkbench.
3. and now you should be to run the app by typing "index.js" in the command line.

![employee_list](/assets/img/project.gif)


## Technologies Used
- Git - version control system to track changes to source code
- Javascript - To handle functionality. 
- GitHub - hosts repository that can be deployed to GitHub Pages
- Mysql - An npm extension to save informtion from the user.
- Inquirer -An npm extension to gather information from the user using the command line.

## Summary 
- This App will organize your employees'. 
## Code Snippet
```javascript
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
        }else if (answer.action === "View All Employees by Manager") {
            //VIEW ALL EMPLOYEES BY MANAGER
            return viewAllByManager();
        }
         else if (answer.action === "Update Employee role") {
            //UPDATE EMPLOYEE ROLE
            return updateRole()
        }
         else if (answer.action === "Done") {
            console.log("Well Done!")
            process.exit()
        }
    })
}
```
- This code will prompt the user for what informaiton they would like to get,delete and update.
## Author 
- [LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
- [GitHub](https://github.com/AndresF97)
