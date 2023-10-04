const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cloudinary = require('cloudinary').v2;
const mercadopago = require('mercadopago')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const app = express();
app.use(cors())

const indexRouter = require('./routes/index');
const usersApiRouter = require('./routes/usersApi');
const productsApiRouter = require('./routes/productsApi')
const adminRouter = require('./routes/adminApi');
const imageUploadRoutes = require("./routes/uploadsBanners");
const mercadopagoRouter = require('./routes/mercadopago')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productsApiRouter)
app.use('/api/admin', adminRouter)
app.use('/api/upload', imageUploadRoutes);
app.use('/mp', mercadopagoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
