const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const appConfig = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = {
  appConfig,
};
