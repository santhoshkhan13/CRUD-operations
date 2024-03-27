const express = require('express');
const router = express.Router();
const destinationController = require('../controller/destinationController');



router.get('/get', 
        destinationController.getDestinationsByAccountId
);
router.put('/update',
        destinationController.updateDestination
);
router.delete('/delete', 
        destinationController.deleteDestination
);

module.exports = router;