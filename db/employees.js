const db = require("./connection");

async function viewAllEmployees() {
    try {
        const employee =
            await db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id")

        return employee

    } catch (err) {
        console.log(err)
    }
}

// async function addEmployee(employee) {
//     try {
//         const addEmployee = await db.query("INSERT INTO employee SET ?", employee)
//         return addEmployee
//     } catch (err) {
//         console.log(err)
//     }
// }

module.exports = { viewAllEmployees }

