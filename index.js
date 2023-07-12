const express = require('express');
const https = require('https');
const mongoose = require("mongoose");


const app = express();

const dotenv = require("dotenv");
require('dotenv').config();

const bodyParser = require('body-parser');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 9000;
const MONGODB_LINK = process.env.MONGODB_LINK;

mongoose.connect(MONGODB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
          console.log(`Server started on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });



const weatherRoute = require('./routes/weatherRoute');
app.use('/weather', weatherRoute);


