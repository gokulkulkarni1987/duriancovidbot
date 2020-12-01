const CovidAllDetailsModel = require("../models/CovidAllDetailsModel");
const CovidDetailsModel = require("../models/CovidDetailsModel")

const getCountryCasesDL = async (countryCode) => {
  try {
    return await CovidDetailsModel.findOne({
      where: {
        countryInfo: {
          '"iso2"': countryCode
        }
      }
    });
  } catch(err) {
    console.log('error occured while fetching: ', err);
  }
}

const getAllCovidDetailsDL = async () => {
  try {
    return await CovidAllDetailsModel.findOne({where: {}});
  } catch(err) {
    console.log('error occured while fetching all covid details: ', err);
  }
}

module.exports = {
  getCountryCasesDL,
  getAllCovidDetailsDL
}