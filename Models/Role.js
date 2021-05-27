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

// new Array(departments) => {
//     connection.query('SELECT * FROM department', function (error, results, fields) {
//         if (error) throw error;
//         var dptdata = Object.entries(obj);
//         var data = dptdata.map((item) => {return item.name});
        
// }







async function addRole() {
    
    connection.query('SELECT * FROM department', async function (error, dptdata, fields) {
        if (error) throw error;
        const dptList = dptdata.map(({ id, name }) => ({
            name: name,
            value: id
        }));
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
        // QUESTION: What does the || 0 do?
        {
            departmentID: answer.dpt,
            title: answer.title,
            salary: answer.salary || 0
        },
        (err) => {
          if (err) throw err;
          console.log('success!');
        }
      );
    });
}

connection.connect((err) => {
    console.log("it works");
    addRole();
    if (err) throw err;
  });
    


    
    
    // departments.forEach(name => {
    //     // return id ????
    // });




