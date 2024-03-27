const Destination = require('../model/destinationModel');

const destinationController = {
    createDestination: (req, res) => {
        const { accountId, url, httpMethod, headers } = req.body;
        Destination.create(accountId, url, httpMethod, headers, (err, destinationId) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Destination created successfully', destinationId });
        });
    },

    getDestinationsByAccountId: (req, res) => {
        const accountId = req.body.accountId;
        Destination.getByAccountId(accountId, (err, destinations) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(destinations);
        });
    },

    updateDestination: (req, res) => {
        const AccountId = req.body.accountId;
        const { url, httpMethod, headers } = req.body;
        Destination.update(id, url, httpMethod, headers, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Destination updated successfully' });
        });
    },

    deleteDestination: (req, res) => {
        const accountId = req.body.accountId;
        Destination.deleteByAccountId(accountId, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Destination deleted successfully' });
        });
    }
};

module.exports = destinationController;