require('dotenv').config();
var inquirer = require('inquirer');
const connection = require('./config/connection');
const mysql = require('mysql');
const table = require('console.table');


// Import model to sync table with database
// const Department = require('./models/Department');
// const Employee = require('./models/Employee');
// const Role = require('./models/Role');


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
  
  const roles = await connection.query('SELECT * FROM employee');
  var roleList = roles.map(({ id, title }) => {
    return {
      name: title,
      value: id
    }
  });

  const manager = await connection.query('SELECT * FROM employee');
  var managerList = manager.map(({ first_name, last_name, id }) => {
    return {
      name: `${first_name} ${last_name}`,
      value: id,
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
    },
    {
      name: "managerID",
      type: "list",
      message: "Who is this employees manager?",
      choices: managerList
    }
  ];

  var answers = await inquirer.prompt(employeeInput);
  console.log(answers);
      
  connection.query(
    'INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleID,
        manager_id: answer.managerID
      }  
  );
  console.table('success!');    
  begin();
};   
  




// Add Roles
async function addRole() {
  
  connection.query('SELECT * FROM department', async function (error, dptdata, fields) {
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
          departmentID: answer.dpt,
          title: answer.title,
          salary: answer.salary || 0
      });
      console.table('success!');
      begin();
  });   
  
}

// updateEmployee()


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
        'Update employees',
        'Finished!'
        ]
    })
    .then((answers) => {
    //   // Use user feedback for... whatever!!
    //   // switch on answers.start
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
          
    //     case 'Update employees':
    //       updateEmployee();
    //       break;
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

