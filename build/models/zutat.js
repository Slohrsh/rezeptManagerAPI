"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Entity: REZ02_ZUTAT
 */
var _require = require("sequelize"),
    Op = _require.Op;

var regeneratorRuntime = require("regenerator-runtime");

var zutat = function zutat(sequelize, DataTypes) {
  var Zutat = sequelize.define('REZ02_ZUTAT', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    beschreibung: {
      type: DataTypes.STRING
    }
  });

  Zutat.associate = function (models) {
    Zutat.hasMany(models.RezeptZutat, {
      as: 'mengen'
    });
  };

  Zutat.findByBeschreibung = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(zutatSearch) {
      var zutat;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Zutat.findAll({
                where: {
                  beschreibung: _defineProperty({}, Op.like, '%' + zutatSearch + '%')
                }
              });

            case 2:
              zutat = _context.sent;
              return _context.abrupt("return", zutat);

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

  Zutat.findAllByBeschreibung = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(zutaten) {
      var zutat;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Zutat.findAll({
                where: {
                  beschreibung: _defineProperty({}, Op["in"], zutaten)
                }
              });

            case 2:
              zutat = _context2.sent;
              return _context2.abrupt("return", zutat);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  Zutat.findZutaten = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(zutatenIds) {
      var rezept;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Zutat.findAll({
                where: {
                  id: _defineProperty({}, Op["in"], zutatenIds)
                }
              });

            case 2:
              rezept = _context3.sent;
              return _context3.abrupt("return", rezept);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return Zutat;
};

var _default = zutat;
exports["default"] = _default;
//# sourceMappingURL=zutat.js.map