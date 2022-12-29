const db = require("./connection");

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
        const addDepartment = await db.query("INSERT INTO department SET ?", department)
        return addDepartment
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments, addDepartment }