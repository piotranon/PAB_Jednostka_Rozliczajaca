var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var incomingRouter = require('./routes/api.incoming');
var outgoingRouter = require('./routes/api.outgoing');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/transfers', incomingRouter);
app.use('/api/v1/transfers', outgoingRouter);

module.exports = app;
