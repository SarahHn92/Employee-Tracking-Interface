const table = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');

// create functions relating to department

// View Departments
const dptsView = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
    });
} 


// Add department
addDpts()

// async function addRole() {
    
//     connection.query('SELECT * FROM department', async function (error, dptdata, fields) {
//         if (error) throw error;
//         const dptList = dptdata.map(({ id, name }) => ({
//             name: name,
//             value: id
//         }));
//         const roleInput = [
//             {
//             name: "title",
//             type: "input",
//             message: "What is the role title?"
//             },
//             {
//             name: "salary",
//             type: "input",
//             message: "What is the salary for this role?"
//             },
//             {
//             name: "dpt",
//             type: "list",
//             message: "What department does this role belong to?",
//             choices: dptList
//             }
//         ];
//         var answers = await inquirer.prompt(roleInput);
//         console.log(answers);
        
//         connection.query(
//         'INSERT INTO role SET ?',
//         // QUESTION: What does the || 0 do?
//         {
//             departmentID: answer.dpt,
//             title: answer.title,
//             salary: answer.salary || 0
//         },
//         (err) => {
//           if (err) throw err;
//           console.log('success!');
//         }
//       );
//     });
// }