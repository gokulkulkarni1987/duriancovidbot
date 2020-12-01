const { MessagingResponse } = require('twilio').twiml;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendMessage = (body, to) => {
  return client.messages
        .create({
          from: process.env.TWILIO_ACCOUNT_WHATSAPP_NUMBER,
          body,
          to
        });
}

module.exports = {
  sendMessage
}