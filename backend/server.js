const express = require('express');
const databaseRoutesBook = require('./src/routes/book');
const databaseRoutesAuthor = require('./src/routes/author');
const databaseRoutesPublisher = require('./src/routes/publisher');
const databaseRoutesCategory = require('./src/routes/category');
const app = express();
const port=3100;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/api/v1/tbdprojectdatabase', databaseRoutesBook);

app.use('/api/v1/tbdprojectdatabase', databaseRoutesAuthor);

app.use('/api/v1/tbdprojectdatabase', databaseRoutesPublisher);

app.use('/api/v1/tbdprojectdatabase', databaseRoutesCategory);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
