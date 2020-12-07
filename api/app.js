// require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
// });

mongoose.connect('mongodb://localhost/bank', {
    useNewUrlParser: true,
});

exports.test = function(req,res) {
  console.log(res)
};

var incomingRouter = require('./routes/api.incoming');
var outgoingRouter = require('./routes/api.outgoing');
var bankRouter = require('./routes/api.bank');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Udało się');
})

app.use('/api/v1/transfers/incoming', incomingRouter);
// app.use('/api/v1/transfers/outgoing', outgoingRouter);
app.use('/api/v1/banks', bankRouter);

module.exports = app;
