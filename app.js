var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var toyRouter = require('./routes/toy');
var brandRouter = require('./routes/brand');
var categoryRouter = require('./routes/category');
var countryRouter = require('./routes/country');
var app = express();

var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))


var mongoose = require('mongoose');
var uri_cloud = "mongodb+srv://nguyenminhdat21022003:C6jybNZKKJCGfeci@createcluster.rnsazyp.mongodb.net/assignment";
mongoose.connect(uri_cloud)
 .then(()=> console.log('Connect to database successfully'))
 .catch((err) =>  console.log('Connect to database failed. '+ err));

 var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/toy', toyRouter);
app.use('/brand', brandRouter);
app.use('/category', categoryRouter);
app.use('/country', countryRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//4. config port (for cloud deployment)
app.listen(process.env.PORT || 3001);
module.exports = app;
