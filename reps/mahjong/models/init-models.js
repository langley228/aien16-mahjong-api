const DataTypes = require("sequelize").DataTypes;
const _Tile = require("./tile");

function initModels(sequelize) {
  const Tile = _Tile(sequelize, DataTypes);


  return {
    Tile,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
