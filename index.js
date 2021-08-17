require('dotenv').config();
var inquirer = require('inquirer');
const connection = require('./config/connection');
const mysql = require('mysql');
const table = require('console.table');

// dptsView()

const dptsView = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
  
}

// View Roles
const roleView = () => {
  connection.query('SELECT * FROM role', function (err, res) {
      if (err) throw err;
      console.table(res);
      begin();
  });
  
} 


// View employees
const employeeView = () => {
  connection.query('SELECT * FROM employee', function (err, res) {
      if (err) throw err;
      console.table(res);
      begin();
  });
  
} 

// addDpts()

async function addDpts() {
  const newDptPrompt = [
    {
      name: 'newDpt',
      type: 'input',
      message: 'Please enter department name:'
    }
  ]

  inquirer.prompt(newDptPrompt).then(function (answer) {
    connection.query('INSERT INTO department SET ?',
    {
      name: answer.newDpt
    });
    connection.query('SELECT * FROM department', function (err, res){
      console.table(res);
      begin();
    });
  })
  
}


// add employees

async function addEmployee() {
  
  connection.query('SELECT * FROM role', async function (err, roleData) {
    if (err) throw err;
    const roleList = roleData.map(({ id, title }) => {
      return {
        name: title,
        value: id
      }
    });
    const employeeInput = [
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the new employee?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the new employee?',
      },
      {
        name: "roleID",
        type: "list",
        choices: roleList,
        message: "What is the employee's role?"
      }
    ];

  var answers = await inquirer.prompt(employeeInput);
  console.table(answers);
        
  connection.query(
      'INSERT INTO employee SET ?',
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          roleID: answers.roleID
        }
  );
        
  console.table('success!');
  begin();
  })
}

  
// Add Roles
async function addRole() {
  
  connection.query('SELECT * FROM department', async function (error, dptdata) {
      if (error) throw error;
      const dptList = dptdata.map(({ id, name }) => {
        return {
          name: name,
          value: id
        }  
      });
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
          choices: dptList
          }
      ];
      var answers = await inquirer.prompt(roleInput);
      console.log(answers);
      
      connection.query(
      'INSERT INTO role SET ?',
      {
          departmentID: answers.dpt,
          title: answers.title,
          salary: answers.salary || 0
      });
      console.table('success!');
      begin();
  });   
}

function finished() {
  console.table('Goodbye!')
  connection.end();
}


const begin = () => {
  console.log("Hi there.");
  inquirer
    .prompt({
      /* Pass your questions in here */
      type: 'list',
      name : 'start',
      message: 'What would you like to do?',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add Department', 
        'Add Role', 
        'Add Employee', 
        'Finished!'
        ]
    })
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
          
        case 'Finished!':
          finished();
          break;
    } 
    
    })
    .catch((error) => {
        console.log('Error!!!')
    });
};

connection.connect((err) => {
  begin();
  if (err) throw err;
});

