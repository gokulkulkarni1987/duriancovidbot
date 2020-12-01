require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const { twillioMsgReceived } = require('./twilio/webhooks');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({message: "Hello"});
});

app.post('/twiliomsg', twillioMsgReceived);

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('App started listening');
});