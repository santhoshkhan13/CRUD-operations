const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');
const dataHashController = require('../controller/dataHashController');
 
// Account routes
router.post('/',
            dataHashController.checkToken,
            accountController.createAccount,
            
            );
router.get('/accountId',
            dataHashController.checkToken,
            accountController.getAccountById
            );
router.put('/update',
            dataHashController.checkToken,
            accountController.updateAccount
            );
router.delete('/delete',
            dataHashController.checkToken,
            accountController.deleteAccount
            );
router.get('/',
            dataHashController.checkToken,
            accountController.getAllAccounts
            );
 
 
module.exports = router;
 