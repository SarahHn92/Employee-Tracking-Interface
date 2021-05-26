// add functionality relating to Role
const table = require('console.table');
const inquirer = require('inquirer');

const connection = require("../config/connection")

const roleView = () => {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
    });
} 



const roleInput = [
    {
    name: "title",
    type: "input",
    message: "What is the role title?"
    },
    {
    name: "salary",
    type: "input",
    message: "What is the salary for this role?"
    },
    {
    name: "dpt",
    type: "list",
    message: "What department does this role belong to?",
    choices: departments
    }
];

async function addRole() {
    inquirer.prompt()
}
