const db = require("./connection");

async function viewAllEmployees() {
    try {
    const employee = 
        await db.query("SELECT * FROM employee")

    return employee

    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees }

