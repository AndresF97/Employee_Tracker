# Employee Tracker
## Summary 
- This is an application that allows to keep track of your employees' name,salary and department; by usng a database. Employee Tracker was created using MySQL, NodeJS, Javascript, Inquirer, asciiart-logo and console.table.
# What you'll need to make the app work
1. start the terminal and type on your command line "npm i". It should be able to download all packages needed to work.
2. copy the text from "employee.sql" file and paste it to you MYSQLWorkbench.
3. and now you should be to run the app by typing "index.js" in the command line.

![employee_list](/assets/img/project.gif)


## Technologies Used
- Git - version control system to track changes to source code.
- GitHub - hosts repository.
- Javascript - To handle functionality. 
- NodeJS - solves async fuction issues.
- Mysql - An npm extension to save informtion from the user.
- Inquirer - An npm extension to gather information from the user using the command line.
- asciiart-logo - Npm extension to display the applicaiton name.
- Console-table - Npm packagae that can control the mysql data is displayed. 

## Code Snippet
- This code deals with the async issue that happen once you need to get/send one piece of information from/to the database and gather information form the user.

```javascript
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
```
## Author 
- [LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
- [GitHub](https://github.com/AndresF97)
