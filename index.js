const mysql = require("mysql")

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    database: "employee_db"
})

connection.connect((err)=>{
    if(err) throw err
    
})