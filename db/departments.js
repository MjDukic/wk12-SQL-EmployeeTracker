const db = require("./connection");
const { prompt } = require("inquirer");

async function viewAllDepartments() {
    try {
        const departments =
            await db.query("SELECT * FROM department")
        return departments
    } catch (err) {
        console.log(err)
    }
}

async function addDepartment() {
    try {
        const { name } = await prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department you would like to add?"
            }

        ])
        await db.query(`INSERT INTO department (name) VALUES ("${name}")`)
        const addDepartment = await viewAllDepartments();
        return addDepartment;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments, addDepartment };