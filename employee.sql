DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);

CREATE TABLE departments(
    id INTEGER  NOT NULL AUTO_INCREMENT,
    name VARCHAR(30), 
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
    FOREIGN KEY (manager_id) REFERENCES ()
);
INSERT INTO departments(name)
VALUES("Andres");

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT,
    role_id
    title VARCHAR(30),
    salary DECIMAL(18,2),
    department_id INTEGER(11),
    PRIMARY KEY(id)
);
INSERT INTO roles(title,salary,department_id)
VALUES("Manager",100.00,1);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11),
    PRIMARY KEY(id)

);
INSERT INTO employee(first_name,last_name)
VALUES("Jackie","kackier")