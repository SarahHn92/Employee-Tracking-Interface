const table = require('console.table');
const inquirer = require('inquirer');

// add functionality relating to Employee

employeeView = () => {
    connection.query('SELECT * FROM employee', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
} 

addEmployee

updateEmployee