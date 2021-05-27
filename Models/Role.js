// add functionality relating to Role
const table = require('console.table');
const inquirer = require('inquirer');

const connection = require("../config/connection")

const roleView = () => {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
} 

const departments = new Array() => {
    connection.query('SELECT * FROM department', function (error, results, fields) {
        if (error) throw error;
        // var dptdata = Object.entries  NOT COMPLETED YET!
    }
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
    var answers = await inquirer.prompt(roleInput);


    // departments.forEach(name => {
    //     // return id ????
    // });

}
