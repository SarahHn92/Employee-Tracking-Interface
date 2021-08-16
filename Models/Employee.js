const table = require('console.table');
const inquirer = require('inquirer');

// add functionality relating to Employee

const employeeView = () => {
    connection.query('SELECT * FROM employee', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
    begin();
} 



async function addEmployee() {
    
    connection.query('SELECT * FROM employee', async function (error, roledata, fields) {
        if (error) throw error;
        const roleList = roledata.map(({ id, title }) => {
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
        });
    });   
    console.table('success!');
    begin();
}



// Update employee roles

// }

updateEmployee
// query: get list of employees
// using inquirer ask what info needs updating
// update query
