'use strict';

const express = require('express');
const logger = require('./middleware/logger')
const validator = require('./middleware/validator');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

// create express singleton
const app = express();

// middleware
app.use(logger);
app.use(express.json());

// app.post('/route', handlerCallback) 
app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

// person route
app.get('/person', validator, (req, res, next) =>{
console.log(req.query);
res.status(200).send(req.query);
});

app.get('/success', (req, res, next) => {
  res.status(200).send('Success!!');
});

app.use('*', notFound);
app.use(errorHandler);

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { start, app }
