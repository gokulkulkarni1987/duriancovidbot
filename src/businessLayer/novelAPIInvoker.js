const CovidAllDetailsModel = require("../models/CovidAllDetailsModel");
const CovidDetailsModel = require("../models/CovidDetailsModel");
const NetworkHandler = require("../network/NetworkHandler");

const invokeAllCountryData = async () => {
  NetworkHandler.requestHandler
    .get("/all")
    .then((response) => {
      // console.log("data from :", JSON.stringify(response.data));
      CovidAllDetailsModel.destroy({
        where: {},
        truncate: true,
      }).then(() => {
        CovidAllDetailsModel.create(response.data)
          .then((response) => {
            // console.log("data insert: ", response);
          })
          .catch((error) => {
            console.log("Unable to insert Data", error);
          });
      });
    })
    .catch((err) => {
      console.log("unable to delete all details: ", err);
    })
    .catch((err) => {
      console.log("unable to call API: ", err);
    });
};

const invokeCounteyDetailsData = () => {
  NetworkHandler.requestHandler
    .get("/countries")
    .then((response) => {
      // console.log("data from :", JSON.stringify(response.data));
      CovidDetailsModel.destroy({
        where: {},
        truncate: true,
      }).then(() => {
        CovidDetailsModel.bulkCreate(response.data)
          .then((response) => {
            // console.log("data insert: ", response);
          })
          .catch((error) => {
            console.log("Unable to insert Data", error);
          });
      });
    })
    .catch((err) => {
      console.log("unable to delete all details: ", err);
    })
    .catch((err) => {
      console.log("unable to call API: ", err);
    });
}

module.exports = {
  invokeAllCountryData,
  invokeCounteyDetailsData
};
