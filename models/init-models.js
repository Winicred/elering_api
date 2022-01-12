const DataTypes = require("sequelize").DataTypes;
const _ee_current = require("./ee_current");

function initModels(sequelize) {
  const ee_current = _ee_current(sequelize, DataTypes);


  return {
    ee_current,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
