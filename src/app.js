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
const mercadopagoRouter = require('./routes/mercadopago')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productsApiRouter)
app.use('/api/admin', adminRouter)
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

// MERCADOPAGO

/* mercadopago.configure({
  access_token: "TEST-6965001100510479-082921-e79ae45c7c5622f585256d9ece237c1b-262734139",
});

app.post("http://localhost:3000/create_preference", (req, res) => {
  const { description, price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: description,
        unit_price: Number(price),
        quantity: Number(quantity),
      }
    ],
    back_urls: {
      "success": "http://localhost:3000/feedback",
      "failure": "http://localhost:3000/feedback",
      "pending": "http://localhost:3000/feedback"
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id
      });
    }).catch(function (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
}); */

module.exports = app;
