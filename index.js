const mysql = require('./config/connection');

// Import model to sync table with database
const Department = require('./models/Department');
const Employee = require('./models/Employee');
const Role = require('./models/Role');

var inquirer = require('inquirer');

const begin
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'list',
        name : 'start',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by department', 'Update employees']
    }
    
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // switch on answers.start
    //case
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });