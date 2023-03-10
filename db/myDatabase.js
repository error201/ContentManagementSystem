const mysql = require("mysql2");

class myDatabase {
    constructor(host, user, password, database) {
        this.host = host,
            this.user = user,
            this.password = password,
            this.database = database,
            this.conn = mysql.createConnection(
                {
                    host: 'localhost',
                    user: 'root',
                    password: '@LovatCopper5!',
                    database: 'company_db'
                },
                console.log(`Connected to the company database.`))
    }
    getAllDepartments() {
        return this.conn.promise().query('SELECT * FROM department')
    }
    getAllEmployees() {
        return this.conn.promise().query("SELECT * FROM employee")
    }
    getAllRoles() {
        return this.conn.promise().query('SELECT * FROM role')
    }
    addDepartment(deptName) {
        return this.conn.promise().query('INSERT INTO department (name) VALUES (?)', [deptName]);
    }
    addRole(roleTitle, roleSalary, roleDept) {
        return this.conn.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, roleDept]);
    }
    addEmployee(firstName, lastName, roleId, managerId) {
        return this.conn.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    }
    getEmployeeByLastName(empLastName){
        return this.conn.promise().query('SELECT * FROM employee where last_name=?', [empLastName]);
    }
    updateEmployeeRole(roleTitle, empLastName){
        return this.conn.promise().query('UPDATE employee SET role_id=(SELECT id FROM role WHERE title=?) WHERE last_name=?', [roleTitle, empLastName]);
    }
};

module.exports = new myDatabase("localhost", "root", "@LovatCopper5!", "company_db");