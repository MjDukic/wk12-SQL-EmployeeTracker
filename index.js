
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require("./db/departments");
const { viewAllRoles } = require("./db/roles");
const { viewAllEmployees, addEmployee } = require("./db/employees");

//asking the question and awaiting the response with the switch statement
const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]

        }
    ])

    switch (choice) {
        case 'View all departments':
           const departments = await viewAllDepartments();
              console.table(departments);
              break;
        case 'View all roles':
            const roles = await viewAllRoles();
            console.table(roles);
            break;
        case 'View all employees':
            const employees = await viewAllEmployees();
            console.table(employees);
            break;
        case 'Add a department':
            const newDepartment = await addDepartment();
            console.table(newDepartment);
            break;
    }
}

start();
