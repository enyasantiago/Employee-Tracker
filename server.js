//Dependencies//
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');
const Choices = require("inquirer/lib/objects/choices");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Tuesday12",
    port: 3306,
    database: "employee_trackerDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err
    listOptions();
});

function listOptions(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [ 
        // * Add departments, roles, employees
        // * View departments, roles, employee
        // * Update employee roles
        "Add Department",
        "Add Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Add Employees=",
        "Update Employee Role"
        
        // * Update employee managers
        // * View employees by manager
        // * * Delete departments, roles, and employees
        // * * View the total utilized budget of a department -- 
        // * ie the combined salaries of all employees in that department

        // "Update Employee Manager",
        // "View Employees By Manager",
        // "Delete Department",
        // "Delete Role",
        // "Delete Employee",
        // "View Total Utilized Budget For Sales",
        // "View Total Utilized Budget For Engineering",
        // "View Total Utilized Budget For Finance",
        // "View Total Utilized Budget For Legal"

      ]
    }
  ]).then(function(v){
    switch (v.choice){
      case "Add Department":
        addDepartment()

      case  "Add Role":
        addRole()

      case  "Add Employee":
        addEmployee()

      case  "Add Department":
        addDepartment()

      case  "Add Role":
        addRole()

      case  "Add Employees=":
        addEmployees()

      case  "Update Employee Role":
        updateEmployeeRole()

    }
  })
}