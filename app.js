const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./router/accountRoutes');
const destinationRoutes = require('./router/destinationRoutes');

const app = express();
const port = 2000;


app.use(bodyParser.json());


app.use('/api/accounts', accountRoutes);
app.use('/api/destinations', destinationRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});