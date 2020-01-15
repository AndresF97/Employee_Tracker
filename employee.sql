DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE departments(
    id INTEGER  NOT NULL AUTO_INCREMENT,
    name VARCHAR(30), 
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(18,4),
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
);