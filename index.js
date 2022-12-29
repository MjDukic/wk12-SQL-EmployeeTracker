
const { prompt } = require("inquirer");
const db = require("./db/connection");

//since using async, we dont have to use then
//avoid using then keyword
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
    }
}

start();
