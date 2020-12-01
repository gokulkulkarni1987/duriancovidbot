const Sequelize = require('sequelize');

try {
  let db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST_URL,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        timestamps: false
      },
      pool: {
        max: 25,
        min: 0
      },
      sync: { force: false },
      logging: false
    }
  );

  db.authenticate()
    .then(function (err) {
      console.log('Connected to MySQL db.');
    })
    .catch(function (err) {
      console.log(
        { error: 'Unable to connect to the MySQL db:', err },
        'initMysql'
      );
      console.error(
        { error: 'Unable to connect to the MySQL db:', err },
        'initMysql'
      );
    });
  module.exports = { db, sqlOperator: Sequelize };
} catch (exception) {
  console.log(exception);
}
