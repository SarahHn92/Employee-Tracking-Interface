// // add functionality relating to Role
// const table = require('console.table');
// const inquirer = require('inquirer');

// const connection = require("../config/connection")

// // View Roles
// const roleView = () => {
//     connection.query('SELECT * FROM role', function (error, results, fields) {
//         if (error) throw error;
//         console.table(results);
//     });
//     begin();
// } 

// // Add Roles
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
//         {
//             departmentID: answer.dpt,
//             title: answer.title,
//             salary: answer.salary || 0
//         });
//     });   
//     console.table('success!');
//     begin();
// }

// module.exports = roleView;
// module.exports = addRole;
    


    
    




