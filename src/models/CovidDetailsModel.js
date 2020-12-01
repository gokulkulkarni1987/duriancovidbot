const sequelizeHelper = require("../utils/sequelizeHelper");
const db = sequelizeHelper.db;
const sqlOperator = sequelizeHelper.sqlOperator;

const CovidDetailsModel = db.define("covid_details", {
  covid_details_id: {
    field: 'covid_details_id',
    type:sqlOperator.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  updated: sqlOperator.BIGINT,
  country: sqlOperator.STRING,
  countryInfo: sqlOperator.JSON,
  cases: sqlOperator.BIGINT,
  todayCases: sqlOperator.BIGINT,
  deaths: sqlOperator.BIGINT,
  todayDeaths: sqlOperator.BIGINT,
  recovered: sqlOperator.BIGINT,
  todayRecovered: sqlOperator.BIGINT,
  active: sqlOperator.BIGINT,
  critical: sqlOperator.BIGINT,
  casesPerOneMillion: sqlOperator.BIGINT,
  deathsPerOneMillion: sqlOperator.BIGINT,
  tests: sqlOperator.BIGINT,
  testsPerOneMillion: sqlOperator.BIGINT,
  population: sqlOperator.BIGINT,
  continent: sqlOperator.STRING,
  oneCasePerPeople: sqlOperator.BIGINT,
  oneDeathPerPeople: sqlOperator.BIGINT,
  oneTestPerPeople: sqlOperator.BIGINT,
  activePerOneMillion: sqlOperator.DOUBLE,
  recoveredPerOneMillion: sqlOperator.DOUBLE,
  criticalPerOneMillion: sqlOperator.DOUBLE,
}, {
  tableName: 'covid_details'
});

module.exports = CovidDetailsModel;