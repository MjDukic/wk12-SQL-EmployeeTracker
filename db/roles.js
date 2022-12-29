const db = require("./connection");
const { prompt } = require("inquirer");

async function viewAllRoles() {
    try {
        const role =
            await db.query("SELECT * FROM role")
        return role
    } catch (err) {
        console.log(err)
    }
}

async function addRoles() {
    try {
        const { title, salary, department_id } = await prompt([
            {
                type: "input",
                name: "title",
                message: "What is title of this new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of this new role?"
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department name of this new role?"
            }

        ])
        await db.query(`INSERT INTO role (name, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewAllRoles();
        return newRole;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRoles }