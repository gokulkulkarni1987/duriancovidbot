require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();
const { MessagingResponse } = require('twilio').twiml;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({
//          from: 'whatsapp:+14155238886',
//          body: 'Hello there!',
//          to: 'whatsapp:+919741905373'
//        })
//       .then(message => console.log('==========', message.SubresourceUris.media));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({message: "Hello"});
});

app.post('/twiliomsg', async (req, res) => {
  console.log('msg webhooks received: ', req)
  const { body } = req;

  let message;

  if (body.NumMedia > 0) {
    message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
    message.media(goodBoyUrl);
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
});

router.post('/twiliomsg', async (req, res) => {
  console.log('msg webhooks received: ', req)
  const { body } = req;

  let message;

  if (body.NumMedia > 0) {
    message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
    message.media(goodBoyUrl);
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
})

router.post('/twiliostatus', (req, res) => {
  console.log('status webhooks received: ', req)
})


app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('App started listening');
});