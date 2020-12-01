const {
  getCountryCasesDL,
  getAllCovidDetailsDL,
} = require("../dao/covidCaseDAO");
const { sendMessage } = require("../twilio/config");

const getCountryCasesBL = async (countryCode, from) => {
  const covid = await getCountryCasesDL(countryCode);
  if (covid) {
    const message = countryCode + " Active Cases " + covid.cases;
    sendMessage(message, from);
  } else {
    const message = countryCode + process.env.INVALID_COUNTRY_CODE;
    sendMessage(message, from);
  }
};

const getCountryDeathsBL = async (countryCode, from) => {
  const covid = await getCountryCasesDL(countryCode);
  if (covid) {
    const message = countryCode + " Deaths " + covid.deaths;
    sendMessage(message, from);
  } else {
    const message = countryCode + process.env.INVALID_COUNTRY_CODE;
    sendMessage(message, from);
  }
};

const getTotalCasesBL = async (from) => {
  const covid = await getAllCovidDetailsDL();
  if (covid) {
    const message = `Total Active Cases ${covid.cases}`;
    sendMessage(message, from);
  } else {
    const message = process.env.UNABLE_TO_GET_DATA;
    sendMessage(message, from);
  }
};

const getTotalDeathsBL = async (from) => {
  const covid = await getAllCovidDetailsDL();
  if (covid) {
    const message = `Total Deaths ${covid.deaths}`;
    sendMessage(message, from);
  } else {
    const message = process.env.UNABLE_TO_GET_DATA;
    sendMessage(message, from);
  }
};

module.exports = {
  getCountryCasesBL,
  getCountryDeathsBL,
  getTotalCasesBL,
  getTotalDeathsBL,
};
