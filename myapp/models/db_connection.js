const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "heroku_37d590bbeb349e8",
  "bbfbf9e27f94a5",
  "5c7f2f36",
  {
    host: "us-cdbr-iron-east-02.cleardb.net",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
