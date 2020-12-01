const { getCountryCasesDL, getAllCovidDetailsDL } = require('../dao/covidCaseDAO');
const { sendMessage } = require('../twilio/config');

const getCountryCasesBL = async (countryCode, from) => {
  const covid = await getCountryCasesDL(countryCode);
  const message = countryCode + ' Active Cases ' + covid.cases;
  sendMessage(message, from);
}

const getCountryDeathsBL = async (countryCode, from) => {
  const covid = await getCountryCasesDL(countryCode);
  const message = countryCode + ' Deaths ' + covid.deaths;
  sendMessage(message, from);
}

const getTotalCasesBL = async (from) => {
  const covid = await getAllCovidDetailsDL();
  const message = `Total Active Cases ${covid.cases}`
  sendMessage(message, from);
}

const getTotalDeathsBL = async (from) => {
  const covid = await getAllCovidDetailsDL();
  const message = `Total Deaths ${covid.deaths}`
  sendMessage(message, from);
}

module.exports = {
  getCountryCasesBL,
  getCountryDeathsBL,
  getTotalCasesBL,
  getTotalDeathsBL
}