//Dependencies//
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const Choices = require("inquirer/lib/objects/choices");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Tuesday12",
  port: 3306,
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  listOptions();
});

function listOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          // * Add departments, roles, employees
          // * View departments, roles, employee
          // * Update employee roles
          "View Departments",
          "Add Department",
          "View Role",
          "Add Role",
          "DELETE Role",
          "View Employees",
          "Add Employee",
          "Update Employee Role",

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
        ],
      },
    ])
    .then(function (v) {
      switch (v.choice) {
        case "Add Department":
          addDepartment();
          break;
        case "View Departments":
          viewDepartments();
          break;   
        case "Add Role":
          addRole();
          break;
        case "View Role":
          viewRoles();
          break;
        case "DELETE Role":
          deleteRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Departments":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Add department",
      },
    ])
    .then(function (response) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: response.name,
        },
        function (err) {
          if (err) throw err;
          console.table(response);
          listOptions();
        }
      );
    });
}


function listDepartmentChoices(callback) {
  connection.query(
    "SELECT name, id AS value FROM department",
    function (err, res) {
      if (err) throw err;
      callback(res);
    }
  );
}

function listRoleChoices(callback) {
  connection.query(
    "SELECT title AS name, id AS value FROM role",
    function (err, res) {
      if (err) throw err;
      callback(res);
    }
  );
}
function listEmployeeAndRoleChoices(callback) {
  let employees = []; 

  connection.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee",
    function (err, res) {
      if (err) throw err;
      employees = res; 
      listRoleChoices(function(roleData){
      callback(roleData, employees);
      });
    }
  );
}
function addRole() {
  listDepartmentChoices(function (departments) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Add title",
        },
        {
          name: "salary",
          type: "input",
          message: "Add salary",
          validate: (val) => !isNaN(parseInt(val)),
        },
        {
          name: "department_id",
          type: "list",
          message: "Select department",
          choices: departments,
        },
      ])
      .then(insertRole);
  });
}
function deleteRole() {
  orphanRoles(function (roles) {
    if(!roles.length) return listOptions();

    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Select role to DELETE",
        choices: roles,
      })
      .then(removeRole);
  });
}
function insertRole(role) {
  connection.query("INSERT INTO role SET ? ", role, function (err) {
    if (err) throw err;
    listOptions();
  });
}
function removeRole(role) {
  connection.query("DELETE FROM role WHERE id = ? ", role.id, function (err) {
    if (err) throw err;
    listOptions();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, response) {
    if (err) throw err;
    console.table(response);
    listOptions();
  });
}
function orphanRoles(callback) {
  let sql = "SELECT id AS value, title AS name FROM role ";
  sql += "WHERE id NOT IN ";
  sql += "(SELECT role_id FROM employee)";

  connection.query(sql, function (err, orphans) {
    if (err) throw err;
    callback(orphans);
  });
}

function addEmployee() {
  listEmployeeAndRoleChoices(function (roles,employees) {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Add First Name",
      },
      {
        name: "last_name",
        type: "input",
        message: "Add Last Name",
      },
      {
        name: "manager_id",
        type: "list",
        message: "Select Manager",
        choices: employees,
      },
      {
        name: "role_id",
        type: "list",
        message: "Select Role",
        choices: roles,
      },
    ])
    .then(insertEmployee);
  });
}
function insertEmployee(employee) {
  connection.query("INSERT INTO employee SET ? ", employee, function (err) {
    if (err) throw err;
    listOptions();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, response) {
    if (err) throw err;
    console.table(response);
    listOptions();
  });
}
function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, response) {
    if (err) throw err;
    console.table(response);
    listOptions();
  });
}

function updateEmployeeRole(){
listEmployeeAndRoleChoices(function (roles,employees) {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Select Employee",
        choices: employees,
      },
      {
        name: "role_id",
        type: "list",
        message: "Select Role",
        choices: roles,
      },
    ])
    .then(updateEmployee);
  });

}

function updateEmployee(employee, role) {
  connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [employee.role_id,employee.employee_id], function (err) {
    if (err) throw err;
    listOptions();
  });
}
