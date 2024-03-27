const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const args = process.argv.slice(2);
const dbPath = args[0]; 
if (!dbPath) {
    console.error('Usage: node app.js <path_to_database>');
    process.exit(1);
}


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});


function query(sql, params, callback) {
    db.all(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
}


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        accountId TEXT UNIQUE,
        accountName TEXT,
        appSecretToken TEXT,
        website TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Destination (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        accountId INTEGER,
        url TEXT,
        httpMethod TEXT,
        headers STRING,
        FOREIGN KEY (accountId) REFERENCES Account(id)
    )`);
});


module.exports = {db};
