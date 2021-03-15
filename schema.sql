CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Engineering");
INSERT INTO department (name) VALUE ("Finance");
INSERT INTO department (name) VALUE ("Legal");

INSERT INTO role (title, salary, department_id) VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id) VALUE ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("John", "Doe", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Ashley", "Rodriguez", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Malia", "Brown", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Tom", "Allen", 7, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Sarah", "Lourd", null, 7);

