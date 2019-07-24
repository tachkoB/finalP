var spicedPg = require("spiced-pg");

let db = spicedPg("postgres:postgres:postgres@localhost:5432/socialusers");

exports.addUser = function addUser(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
        [first, last, email, password]
    );
};

exports.getEmail = function getEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = ($1)`, [email]);
};
