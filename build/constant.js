const path = require("path");
const PROJECT_PATH = path.resolve(__dirname, "../");
const isDEV = process.env.NODE_ENV !== "production";

module.exports = {
  PROJECT_PATH,
  isDEV
};
