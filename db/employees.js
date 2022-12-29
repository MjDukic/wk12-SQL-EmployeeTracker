const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
        const employee =
            await db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id")

        return employee

    } catch (err) {
        console.log(err)
    }
}
//enter the employee’s first name, last name, role, and manager, and that employee is added to the database
async function addEmployee() {
    const roleTitle = await viewAllRoles();
    const employee = await viewAllEmployees();
    try {
        const { first_name, last_name, role, manager } = await prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the new employee?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of the new employee?"
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the new employees manager?",
                choices: employee.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                    })
            },
            {
                type: "list",
                name: "role",
                message: "What is the new employees role?",
                choices: roleTitle.map((role) => {
                    return {
                        name: role.name,
                        value: role.name
                    }
                })
            }
        

        ])
        await db.query(`INSERT INTO role (first_name, last_name, role, manager) VALUES ("${first_name}", "${last_name}", "${role}", "${manager}")`)
        const newEmployee = await viewAllEmployees();
        return newEmployee;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployee }

