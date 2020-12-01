const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const {
  getCountryCasesBL,
  getCountryDeathsBL,
  getTotalCasesBL,
  getTotalDeathsBL,
} = require("../businessLayer/covidCaseFetcher");
const { sendMessage } = require("./config");

const twillioMsgReceived = async (req, res) => {
  const { body: mainBody } = req;

  const { Body: body, From: from } = mainBody;

  const bodySplits = body.split(" ");
  if (bodySplits.length < 1) {
    sendMessage(process.env.INVALID_COMMAND_MSG, from);
    return;
  }

  if (body.toUpperCase().includes('TOTAL')) {
    switch (body.toUpperCase()) {
      case "CASES TOTAL":
        getTotalCasesBL(from);
        break;
      case "DEATHS TOTAL":
        getTotalDeathsBL(from);
        break;
      default:
        sendMessage(process.env.INVALID_COMMAND_MSG, from);
    }
    
  } else {
    switch (bodySplits[0].toUpperCase()) {
      case "CASES":
        getCountryCasesBL(bodySplits[1].toUpperCase(), from);
        break;
      case "DEATHS":
        getCountryDeathsBL(bodySplits[1].toUpperCase(), from);
        break;
      default:
        sendMessage(process.env.INVALID_COMMAND_MSG, from);
    }
  }

  res.set("Content-Type", "text/xml");
  res.send(process.env.INVALID_COMMAND_MSG).status(200);
};

module.exports = {
  twillioMsgReceived,
};
