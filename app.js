// Load environment variables
require("dotenv").config();

const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./api/services/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://questionbank-diu-default-rtdb.firebaseio.com"
});
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const questionRoute = require('./api/routes/questions');
const userRoute = require('./api/routes/users');
const adminRoute = require('./api/routes/admin');
const { checkToken, checkApi } = require("./client");

// Increase request size limit
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.sendStatus(200);
  }
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/questions', questionRoute);
app.use('/users', userRoute); 
app.use('/admin', adminRoute); 

// app.use('/questions', checkToken, questionRoute);
// app.use('/users', checkApi, userRoute); 
// app.use('/admin', checkToken, adminRoute); 


app.get('/', (req, res) => {
  res.redirect('https://techerax.com/');
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;