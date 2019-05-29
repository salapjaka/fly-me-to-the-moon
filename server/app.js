require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

//Firebase
const firebase = require('firebase')
const keys = require('./config/keys')

firebase.initializeApp(keys);
console.log(process.env.MONGODB_URI, 343)
mongoose
  .connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

//app.set('view engine', 'hbs');

// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../client/build')))

// For any routes that starts with "/api", catch 404 and forward to error handler
// app.use('/*', (req, res, next) => {
//   let err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  console.log('__dirname',__dirname)
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})



// default value for title local
app.locals.title = 'Airly';



const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);


module.exports = app;
