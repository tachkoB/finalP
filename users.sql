DROP TABLE IF EXISTS decks CASCADE;
DROP TABLE IF EXISTS mainboard_cards CASCADE;
DROP TABLE IF EXISTS sideboard_cards CASCADE;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE decks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    user_id INT REFERENCES users(id)
);

CREATE TABLE mainboard_cards (
    id SERIAL PRIMARY KEY,
    deck_id INT REFERENCES decks(id),
    cardname VARCHAR(200),
    number INT NOT NULL
);

CREATE TABLE sideboard_cards (
    id SERIAL PRIMARY KEY,
    deck_id INT REFERENCES decks(id),
    cardname VARCHAR(200),
    number INT NOT NULL
);

