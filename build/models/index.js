"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize;
exports.sequelize = sequelize;

if (process.env.DATABASE_URL) {
  exports.sequelize = sequelize = new _sequelize["default"](process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    logging: true //false

  });
} else {
  exports.sequelize = sequelize = new _sequelize["default"](process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql'
  });
}

var models = {
  RezeptZutat: sequelize["import"]('./rezeptZutat'),
  Rezept: sequelize["import"]('./rezept'),
  Zutat: sequelize["import"]('./zutat'),
  Wochenplan: sequelize["import"]('./wochenplan'),
  Favorit: sequelize["import"]('./favorit'),
  Einkaufsliste: sequelize["import"]('./einkaufsliste')
};
Object.keys(models).forEach(function (key) {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map