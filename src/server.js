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
//Can also have it broken up separately
// This means the middleware works for all instances
app.use(first, second, third);

// app.post('/route', handlerCallback) 
app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

// person route
app.get('/person/:name', validator, (req, res, next) =>{
console.log(req.query);
res.status(200).send('Something Happened');
});

app.get('/success', (req, res, next) => {
  res.status(200).send('Success!!');
});

app.get('/bad', notFound);

app.use('*', notFound);
app.use(errorHandler);

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { start, app }
