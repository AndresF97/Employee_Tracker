# Employee_Tracker
- This app can keep track of your employees'  name,salary and department.
# What you'll need to make the app work
1. start the terminal and type on your command line "npm i". It should be able to download all packages needed to work.
2. copy the text from "employee.sql" file and paste it to you MYSQLWorkbench.
3. and now you should be to run the app by typing "index.js" in the command line.

![employee_list](/assets/project.gif)


## Technologies Used
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Mysql - An npm extension to save informtion from the user.
- Inquirer -An npm extension to gather information from the user using the command line.

## Summary 
- This App will organize your employees'. 
## Code Snippet
```javascript
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
    connection.query('INSERT INTO employee SET ?', { first_name: data.first_name, last_name: data.last_name,role_id:data.role.split("")[0]}, function (err) {
        if (err) throw err
        console.log("Your Employee was added")
    })
    promptUser()
```
- This code will prompt the user for there first name, last name and there role then it will render all the information from user.
[LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
[GitHub](https://github.com/AndresF97)
