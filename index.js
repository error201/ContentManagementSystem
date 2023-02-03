const inquirer = require('inquirer');
const db = require("./db/myDatabase")
const ctable = require("console.table");

function prompts() {
    let empOption = [];
    let roleOption = [];
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ["View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Quit"]
        },
    ]).then((response) => {
        if (response.choice === "View All Departments") {
            db.getAllDepartments().then(data => {
                console.table(data[0]);
            });
            prompts();
        } else if (response.choice === "View All Roles") {
            db.getAllRoles().then(data => {
                console.table(data[0])
            });
            prompts();
        } else if (response.choice === "View All Employees") {
            db.getAllEmployees().then(data => {
                console.table(data[0])
            });
            prompts();
        } else if (response.choice === "Add a Department") {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the new department?',
                    name: 'depName',
                },
            ]).then((response) => {
                db.addDepartment(response.depName);
                prompts();
            })
        } else if (response.choice === "Add a Role") {
            inquirer.prompt([
                {
                    type: 'input',
                    message: "What is the title of the new role?",
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: "What is this new role's salary?",
                    name: 'roleSalary',
                },
                {
                    type: 'input',
                    message: "What department does the new role belong to?",
                    name: 'roleDept',
                },
            ]).then((response) => {
                db.addRole(response.roleTitle, response.roleSalary, response.roleDept);
                prompts();
            })
        } else if (response.choice === "Add an Employee") {
            inquirer.prompt([
                {
                    type: 'input',
                    message: "What is the new employee's first name?",
                    name: 'empFirstName',
                },
                {
                    type: 'input',
                    message: "What is the new employee's last name?",
                    name: 'empLastname',
                },
                {
                    type: 'input',
                    message: "What is the new employee's role?",
                    name: 'empRole',
                    choices: "roleDept"
                },
                {
                    type: 'input',
                    message: "What is the id of the new employee's manager?",
                    name: 'empManager',
                },
            ]).then((response) => {
                db.addEmployee(response.empFirstName, response.empLastname, response.roleDept, response.empManager).then(() => {
                    prompts();
                })
            })
        } else if (response.choice === "Update an Employee Role") {
            db.getAllEmployees().then(data => {
                const employees = data[0];
                for (let i = 0; i < employees.length; i++) {
                    empOption.push(employees[i].last_name);
                }
            })
            db.getAllRoles().then(data => {
                const roles = data[0];
                for (let i = 0; i < roles.length; i++) {
                    roleOption.push(roles[i].title);
                }
            }).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which employee would you like to edit?',
                        name: 'empChoice',
                        choices: empOption
                    },
                    {
                        type: 'list',
                        message: "What would you like to change this employee's role to?",
                        name: 'roleChoice',
                        choices: roleOption
                    },
                ]).then((response) => {
                    console.log(response.empChoice, response.roleOption);
                    db.updateEmployeeRole(response.empChoice, response.roleOption);
                }).then(() => {
                    prompts();
                })

            })
        } else if (response.choice === "Quit") {
            process.exit();
        }
    }
    );
}

prompts();