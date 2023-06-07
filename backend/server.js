const express = require('express');
const databaseRoutes = require('./src/routes/book');
const app = express();
const port=3100;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/api/v1/tbdprojectdatabase', databaseRoutes);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
