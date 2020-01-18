# Employee_Tracker
- This app can keep track of your employees'  name,salary and department.
# What you'll need to make th eapp work
1. start the terminal and type on your command line "npm i". It should be able to download all packages needed to work.
2. copy the text from "employee.sql" file and paste it to you MYSQLWorkbench.
3. and now you should be to run the app by typing "index.js" in the command line.

![ Team Auto Port](https://media-exp1.licdn.com/dms/image/C4E22AQGkhNXCSPPmFw/feedshare-shrink_800/0?e=1581552000&v=beta&t=3mxZzDyOpISasWvBFWlsCHopemH3N48Tz_rQB-e50t0)


## Technologies Used
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Bootstrap - Used to create cosmitics of the website and Media inquries
- FontAwesome - used to add nice looking icons 
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Inquirer - An npm extension to get information from user
- Axios -An npm to fetch data about the user from Github 

## Summary 
- This App will allow you to render a list for a team you've gather by getting the info from user in CLI.
## Code Snippet
```html
<html>
<body>
 <script>
    const promptEngineer = function(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What's you Engineer's name?",
            name:"name"
        },{
            type:"input",
            message:"What's your Engineer's ID?",
            name:"id"
        },{
            type:"input",
            message:"What's your Engineer's email?",
            name:"email"
        },{
            type:"input",
            message:"What's you Engineer's github username?",
            name:"github"
        },{
            type:"list",
            message:"Which type of memeber would you like to add?",
            choices:["Engineer","Intern","I dont want to add anymore team members"],
            name:"choice"
        }
    ]).then( async function({name,id,email,github,choice}){
        const engineer = new Engineer(name,id,email,github)
        cardEngineer = `<div class="card m-3" style="width: 18rem;">
        <div class="card-header bg-primary text-white">
          <h1>${engineer.name}</h1>
          <h2><i class="fas fa-laptop-code"></i> &nbsp;Engineer</h2>
        </div>
        <div class="container bg-light">
              <ul class="list-group p-3">
                  <li class="list-group-item">ID : ${engineer.id}</li>
                  <li class="list-group-item">Email : <a href="https://mail.google.com/"class="card-link">${engineer.email}</a> </li>
                  <li class="list-group-item">Github account: <a href="https://github.com/"class="card-link">${engineer.github}</a> </li>
              </ul>
              </div>
              </div>
              `

        employees.push(engineer)
        console.log(("-").repeat())
            if(choice === "Engineer"){
                return promptEngineer()
            }
            if(choice ==="Intern"){
               return promptIntern()
            }
         })
}
     </script>
</body>
</html>
```
- This code get the infromaition from the user and makes a card according to the user's info it will keep on asking the user for there input until they want to quit.
[LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
[GitHub](https://github.com/AndresF97)
