DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;
USE employee_db;



CREATE TABLE departments(
    id INTEGER  NOT NULL AUTO_INCREMENT,
    name VARCHAR(30), 
    PRIMARY KEY(id)
);
INSERT INTO departments(name)
VALUES("Sales"),("Engineering"),("Finanacial"),("Legal");

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(18,2),
    department_id INTEGER REFERENCES departments(id),
    PRIMARY KEY(id)
);
INSERT INTO roles(title,salary,department_id)
VALUES("Sales Lead",25000.00,1),("Sales Person",10000.00,1),("Lead Engineer",1000000.00,2),("Software engineer",100000.00,2),("Accountant Manager",100000,3),("Accountant",5000.00,3),("Legal Team lead",100000.00,4),("Lawyer",10000.00,4);

CREATE TABLE employee(
    num INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER REFERENCES roles(id),
    PRIMARY KEY(num)

);
INSERT INTO employee(first_name,last_name,role_id)
VALUES("Jackie","kackier", 1)


