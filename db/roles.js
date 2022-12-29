const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
        const role =
            await db.query("SELECT * FROM role")
        return role
    } catch (err) {
        console.log(err)
    }
}
//to add role with department name, need to get the department name from the department table,
// which is why i used const departmentName 
async function addRoles() {
    const departmentName = await viewAllDepartments();
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
                type: "list",
                name: "department_id",
                message: "What is the department name of this new role?",
                choices: departmentName.map((department) => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            }

        ])
    //values need to match the prompt in query
        await db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewAllRoles();
        return newRole;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRoles }