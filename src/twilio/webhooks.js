const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const { getCountryCasesBL, getCountryDeathsBL } = require("../businessLayer/covidCaseFetcher");
const { sendMessage } = require("./config");

const twillioMsgReceived = (req, res) => {
  const { body: mainBody } = req;

  const { Body: body, From: from } = mainBody;

  switch(body.toUpperCase()) {
    case 'CASES':
      getCountryCasesBL(body, from);
      break;
    case 'DEATHS':
      getCountryDeathsBL(body, from);
      break;
    case 'CASES TOTAL':
      getTotalCasesBL(body, from);
      break;
    case 'DEATHS TOTAL':
      getTotalDeathsBL(body, from);
      break;
    default:
      sendMessage(process.env.INVALID_COMMAND_MSG, from);
  }

  res.set('Content-Type', 'text/xml');
  res.send(process.env.INVALID_COMMAND_MSG).status(200);
}

module.exports = {
  twillioMsgReceived
}