require('dotenv').config();
const { Pool } = require('pg');
const inquirer = require('inquirer');
require('console.table');

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: 'lazy_worker_db'
});

const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'LAZY WORKER EMPLOYEE TRACKER - Choose an action:',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(({ action }) => {
    switch (action) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        pool.end();
        break;
    }
  });
};

function viewDepartments() {
  pool.query('SELECT * FROM departments', (err, { rows }) => {
    console.table(rows);
    mainMenu();
  });
}

function viewRoles() {
  pool.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department
              FROM roles JOIN departments ON roles.department_id = departments.id`,
  (err, { rows }) => {
    console.table(rows);
    mainMenu();
  });
}

function viewEmployees() {
  pool.query(`SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, roles.salary,
              CONCAT(m.first_name, ' ', m.last_name) AS manager
              FROM employees e
              LEFT JOIN roles ON e.role_id = roles.id
              LEFT JOIN departments ON roles.department_id = departments.id
              LEFT JOIN employees m ON e.manager_id = m.id`,
  (err, { rows }) => {
    console.table(rows);
    mainMenu();
  });
}

function addDepartment() {
  inquirer.prompt([{ name: 'name', message: 'Enter new department name:' }])
    .then(({ name }) => {
      pool.query('INSERT INTO departments (name) VALUES ($1)', [name], () => {
        console.log('✅ Department added.');
        mainMenu();
      });
    });
}

// Similar logic for addRole(), addEmployee(), updateEmployeeRole()
// (Follow same pattern for brevity)

mainMenu();
