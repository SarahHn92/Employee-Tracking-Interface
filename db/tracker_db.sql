DROP DATABASE if exists tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
 id INT AUTO_INCREMENT,
 PRIMARY KEY(id),
 name VARCHAR(30) 
);

CREATE TABLE role (
 id INT AUTO_INCREMENT,
 PRIMARY KEY(id),
 departmentID INT,
 title VARCHAR(30),
 salary DECIMAL,
 FOREIGN KEY (departmentID) REFERENCES department(id)
 );
 
 CREATE TABLE employee (
 id INT AUTO_INCREMENT NOT NULL,
 PRIMARY KEY(id),
 roleID INT,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 managerID INT,
 FOREIGN KEY (roleID) REFERENCES role(id),
 FOREIGN KEY (managerID) REFERENCES employee(id)
 ); 
 
 
