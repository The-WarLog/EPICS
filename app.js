var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 
var indexRouter = require('./routes/index');


var app = express();


app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mausam', indexRouter);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) { // Fixed: removed asterisks
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // Fixed: removed asterisks
  // set locals, only providing error in development
  res.locals.message = err.message; // Fixed: removed asterisks
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Fixed: removed asterisks

  // render the error page
  res.status(err.status || 500); // Fixed: removed asterisks
  res.render('error'); // Fixed: removed asterisks
});

module.exports = app; // Fixed: removed asterisks