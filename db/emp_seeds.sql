USE company_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("Dallas", "Swearingen", 1, NULL),
           ("Quasheery", "Ahmed", 2, 1),
           ("Michael", "Titus", 3, 2),
           ("Timothy", "Baker", 3, 2);

        