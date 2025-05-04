INSERT INTO departments (name) VALUES ('Engineering'), ('Marketing'), ('Sales');

INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 120000, 1),
('Marketing Manager', 90000, 2),
('Sales Associate', 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Jim', 'Beam', 3, NULL);
