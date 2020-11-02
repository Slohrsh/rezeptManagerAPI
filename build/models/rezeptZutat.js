"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Entity: REZ70_REZEPT_ZUTATEN
 */
var _require = require("sequelize"),
    Op = _require.Op;

var regeneratorRuntime = require("regenerator-runtime");

var rezeptZutat = function rezeptZutat(sequelize, DataTypes) {
  var RezeptZutat = sequelize.define('REZ70_REZEPT_ZUTATEN', {
    menge: {
      type: DataTypes.INTEGER
    },
    einheit: {
      type: DataTypes.STRING
    }
  });

  RezeptZutat.associate = function (models) {
    RezeptZutat.belongsTo(models.Rezept, {
      foreignKey: "rez01_rezept_zutat",
      as: "rezept"
    });
    RezeptZutat.belongsTo(models.Zutat, {
      foreignKey: "rez02_zutat_rezept",
      as: "zutat"
    });
    RezeptZutat.hasMany(models.Einkaufsliste, {
      as: 'listeneintrag'
    });
  };

  RezeptZutat.findMengen = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mengenIds) {
      var mengen;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return RezeptZutat.findAll({
                where: {
                  id: _defineProperty({}, Op["in"], mengenIds)
                }
              });

            case 2:
              mengen = _context.sent;
              return _context.abrupt("return", mengen);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return RezeptZutat;
};

var _default = rezeptZutat;
exports["default"] = _default;
//# sourceMappingURL=rezeptZutat.js.map