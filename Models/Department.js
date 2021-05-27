const table = require('console.table');
const inquirer = require('inquirer');

// create functions relating to department
const dptsView = () => {
    connection.query('SELECT * FROM department', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
} 

addDpts()