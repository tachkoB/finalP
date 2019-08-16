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

exports.addDeckName = function addDeckName(name, id){
    return db.query(`INSERT INTO decks (name, user_id) VALUES ($1, $2) RETURNING id`, [name, id]);
};

exports.addMainboard = function addMainboard(name, cardnr, id){
    return db.query(`INSERT INTO mainboard_cards (cardname, number, deck_id) VALUES ($1, $2, $3) RETURNING deck_id`, [name, cardnr, id]);
};
exports.addSideboard = function addSideboard(name, cardnr, id){
    return db.query(`INSERT INTO sideboard_cards (cardname, number, deck_id) VALUES ($1, $2, $3)`, [name, cardnr, id]);
};
exports.getDecks = function getDecks(id) {
    return db.query(`SELECT name, id, wincount, losscount FROM decks WHERE user_id = ($1)`, [id]);
};

exports.addWin = function addWin(id){
    return db.query(`UPDATE decks SET wincount = wincount + 1
 WHERE id = ($1) RETURNING wincount`, [id]);
};

exports.addLoss = function addLoss(id){
    return db.query(`UPDATE decks SET losscount = losscount + 1
 WHERE id = ($1) RETURNING losscount`, [id]);
};

exports.getDeck = function getDeck(id){
    return db.query(`SELECTxd decks.name, mainboard_cards.cardname AS mainboard, sideboard_cards AS sideboard FROM deck INNER JOIN mainboard_cards ON mainboard_cards.deck_id = decks.id INNERJOIN sideboard_cards ON sideboard_cards.deck_id = decks.id  WHERE id = ($1)`, [id]);
};
