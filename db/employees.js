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
    const employees = await viewAllEmployees();
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
                name: "role",
                message: "What is the new employees role?",
                choices: roleTitle.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the new employees manager?",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                    })
            }
        

        ])
        //important to match the sql names to their proper values ex. role have to say role_id
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role}", "${manager}")`)
        const newEmployee = await viewAllEmployees();
        return newEmployee;
    } catch (err) {
        console.log(err)
    }
}

async function updatedEmployeeRole() {
    const updatedRole = await viewAllRoles();
    const updatedEmployee = await viewAllEmployees();
    try {
        const { employee, newRole } = await prompt([
            {
                type: "list",
                name: "employee",
                message: "Who's role would you like to update?",
                choices: updatedEmployee.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })
            },
            {
                type: "list",
                name: "newRole",
                message: "What is the new role?",
                choices: updatedRole.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            }

        ])
        await db.query(`UPDATE employee SET role_id = ("${newRole}") where id = ("${employee}")`)
        const employeeRoleNew = await viewAllEmployees();
        return employeeRoleNew;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployee, updatedEmployeeRole }

