const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors')

const mongoose = require('./config/database');

const api = require('./routes/api');

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/api',api);

// Our first route


app.get('/', function (req, res) {
    res.send('Hello From Server!');
});

// Listen to port 5000
app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});