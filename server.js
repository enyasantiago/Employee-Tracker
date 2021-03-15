//Dependencies===================//
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "@Tuesday12",
    database: "employee_trackerDB"
  });