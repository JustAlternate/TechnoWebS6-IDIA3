'use strict';

const express = require('express');
const api = require('./api/api');

const app = express();
const port = 8080;
app.listen(port);

app.use(express.static('public'));

app.use('/api', api);


