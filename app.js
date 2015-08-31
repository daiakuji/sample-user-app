// Dependencies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf')
var express = require('express');
var favicon = require('serve-favicon');
var helmet = require('helmet');
var logger = require('morgan');
var methodOverride = require('method-override')
var path = require('path');
var session = require('express-session');

// Routing Logic
var users = require('./routes/users');
var routes = require('./routes/index');

// Create instance of express
var app = express();

// Create csurf instance
var csrfProtection = csrf({ cookie: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Handle hidden input method
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it 
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Load Helmet
app.use(helmet());  

app.use(function(req, res, next) {
  res.locals.ua = req.get('User-Agent');
  next();
});

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
  
// Use routes 
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
	res.redirect("/");
    /*
	res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.redirect("/");
  /*res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });*/
});

// Export app
module.exports = app;
