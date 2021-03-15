//Dependencies//
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Tuesday12",
    port: 3306,
    database: "employee_trackerDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err
    //listOptions();
});