const Account = require('../model/accountModel');
const db = require("../database");
const {createToken} = require('../utils/tokenGenerator')
const destination = require("../model/destinationModel");
const { json } = require('body-parser');
const accountController = {
    createAccount: async (req, res) => {
       
        const { email, accountId, accountName, website } = req.body;
        const appSecretToken = await createToken({email});
        const logsData = {
            accountId: accountId,
            url: req.originalUrl,
            httpMethod: req.method,
            headers: req.headers
        }
       const data = await Account.create(email, accountId, accountName, appSecretToken, website, (err, accountId) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            destination.create(logsData);
            res.json({ message: 'Account created successfully',data });
        });
        
    },

    getAccountById: (req, res) => {
        const accountId = parseInt(req.body.accountId);
        const logsData = {
            accountId: accountId,
            url: req.originalUrl,
            httpMethod: req.method,
            headers: req.headers
        }
        Account.getByAccountId(accountId, (err, account) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } 
            destination.create(logsData);
            res.json(account);
        });
    },

    getAllAccounts: (req, res) => {
        const logsData = {
            accountId: accountId,
            url: req.originalUrl,
            httpMethod: req.method,
            headers: req.headers
        }
        Account.getAllAccounts((err, accounts) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            destination.create(logsData);
            res.json(accounts); 
        });
    },


    updateAccount: (req, res) => {
        
        const { accountId,email, accountName,  website } = req.body;
        const logsData = {
            accountId: accountId,
            url: req.originalUrl,
            httpMethod: req.method,
            headers: req.headers
        }
        Account.update(accountId, email,accountName,  website, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            destination.create(logsData);
            res.json({ message: 'Account updated successfully' });
        });
    },

    deleteAccount: (req, res) => {
        const accountId = req.body.accountId;
        const logsData = {
            accountId: accountId,
            url: req.originalUrl,
            httpMethod: req.method,
            headers: req.headers
        }
        Account.deleteById(accountId, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            destination.create(logsData);
            res.json({ message: 'Account deleted successfully' });
        });
    }
};

module.exports = accountController;