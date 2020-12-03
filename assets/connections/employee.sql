DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;
USE employee_db;



CREATE TABLE departments(
    id INTEGER  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL, 
);
INSERT INTO departments(name)
VALUES("Sales"),("Engineering"),("Finanacial"),("Legal");

CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE

);
INSERT INTO roles(title,salary,department_id)
VALUES("Sales Lead",25000.00,1),("Sales Person",10000.00,1),("Lead Engineer",1000000.00,2),("Software engineer",100000.00,2),("Accountant Manager",100000,3),("Accountant",5000.00,3),("Legal Team lead",100000.00,4),("Lawyer",10000.00,4);

CREATE TABLE employee(
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER UNSIGNED NOT NULL,
    IDNEX role_ind(role_id),
    CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX man_ind(manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);
INSERT INTO employee(first_name,last_name,role_id)
VALUES("Jackie","kackier", 1)


