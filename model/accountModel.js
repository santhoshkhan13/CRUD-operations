const db = require('../database');

class Account {
    static async create(email, accountId, accountName, appSecretToken, website, callback)  {
        const sql = `INSERT INTO Account (email, accountId, accountName, appSecretToken, website) 
                     VALUES (?, ?, ?, ?, ?)`;
       const data= await  db.run(sql, [email, accountId, accountName, appSecretToken, website], function(err) 
       {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
        console.log(data);
    }

    static getByAccountId(accountId, callback) {
        const sql = 'SELECT * FROM Account WHERE accountId = ?';
        db.get(sql, [accountId], function(err, row) {
            if (err) {
                console.error('Error fetching account by id:', err);
                return callback(err);
            } 
            if (!row) {
                console.log('Account not found');
                return callback(null, {}); // Return an empty object if account is not found
            }
            console.log(row);
            callback(null, row);
        });
    }

    static getAllAccounts(callback) {
        const sql = 'SELECT * FROM Account'; // Assuming 'Account' is the name of your table
        db.all(sql, [], function(err, rows) {
            if (err) {
                console.error('Error fetching accounts:', err);
                return callback(err);
            }
            callback(null, rows);
        });
    }

       static  update (accountId, email, accountName, appSecretToken, website, callback) {
        const sql = 'UPDATE Account SET email = ?, accountName = ?,  website = ? WHERE accountId = ?';
        db.run(sql, [email, accountName, appSecretToken, website, accountId], function(err) {
            if (err) {
                console.error('Error updating account:', err.message);
                return callback(err);
            }
            console.log('Account updated successfully');
            callback(null);
        });
    }

    static deleteById(accountId, callback) {
        const sql = 'DELETE FROM Account WHERE accountId = ?';
        db.run(sql, [accountId], function(err) {
            if (err) {
                console.error('Error deleting account:', err.message);
                return callback(err);
            }
            console.log('Account deleted successfully');
            callback(null);
        });
    }
}

module.exports = Account;