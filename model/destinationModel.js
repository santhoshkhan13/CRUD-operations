const db = require('../database');

class Destination {
    
    static create(logsData,callback) {
        const sql = `INSERT INTO Destination (accountId, url, httpMethod, headers) 
                     VALUES (?, ?, ?, ?)`;
                     

        db.run(sql, [logsData.accountId, logsData.url, logsData.httpMethod, JSON.stringify(logsData.headers)], function(err) {
            if (err) {
                return callback(err);
            }
            return null;
        });
    }

    static getByAccountId(accountId, callback) {
        const sql = 'SELECT * FROM Destination WHERE accountId = ?';
        db.all(sql, [accountId], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }

    static update(id, url, httpMethod, headers, callback) {
        const sql = `UPDATE Destination 
                     SET url = ?, httpMethod = ?, headers = ? 
                     WHERE id = ?`;
        db.run(sql, [url, httpMethod, headers, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static deleteByAccountId(accountId, callback) {
        const sql = 'DELETE FROM Destination WHERE accountId = ?';
        db.run(sql, [accountId], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
}

module.exports = Destination;