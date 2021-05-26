const mysql = require('./config/connection');

// Import model to sync table with database
const Department = require('./models/Department');
const Employee = require('./models/Employee');
const Role = require('./models/Role');

var inquirer = require('inquirer');
const connection = require('./config/connection');



const begin = () => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
          type: 'list',
          name : 'start',
          message: 'What would you like to do?',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add Department', 'Add Role', 'Add Employee', 'Update employees']
      }
      
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      // switch on answers.start
      switch (answers.start) {
        case 'View all departments':
          dptsView();
          break;

        case 'View all roles':
          roleView();
          break;

        case 'View all employees':
          employeeView();
          break;

        case 'Add Department':
          addDpts();  
          break;

        case 'Add Role':
          addRole();
          break;
          
        case 'Add Employee':
          addEmployee();
          break;
          
        case 'Update employees':
          updateEmployee();
          break;
      } 
      //case
    })
    .catch((error) => {
        console.log('Error!!!')
    });
};

connection.connect((err) => {
  begin();
  if (err) throw err;
});