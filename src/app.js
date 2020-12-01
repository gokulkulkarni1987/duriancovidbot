require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const { invokeAllCountryData, invokeCounteyDetailsData } = require('./businessLayer/novelAPIInvoker');
const { twillioMsgReceived } = require('./twilio/webhooks');
const app = express();
var CronJob = require('cron').CronJob;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({message: "Hello"});
});

app.post('/twiliomsg', twillioMsgReceived);

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('App started listening');
});

require('./utils/sequelizeHelper');

const job = new CronJob(
	'40 * * * * *',
	function() {
    console.log('You will see this message every second', new Date());
    invokeAllCountryData();
    invokeCounteyDetailsData();
	}
);
job.start();