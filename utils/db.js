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

exports.getUser = function getUser(id) {
    return db.query(
        `SELECT id, first FROM users WHERE id=($1)`,
        [id]
    );
};

exports.addCard = function addCard(name) {
    return db.query(`INSERT INTO cards (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, [name]);
};

exports.findCard = function findCard(str) {
    return db.query(
        `SELECT * FROM cards WHERE name ILIKE $1 LIMIT 1`,
        [str + "%"]
    );
};