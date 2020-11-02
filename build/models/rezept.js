"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Entity: REZ01_REZEPT
 */
var _require = require("sequelize"),
    Op = _require.Op;

var rezept = function rezept(sequelize, DataTypes) {
  var Rezept = sequelize.define('REZ01_REZEPT', {
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
    bild: {
      type: DataTypes.STRING
    },
    titel: {
      type: DataTypes.STRING
    },
    rezept: {
      type: DataTypes.TEXT
    },
    kcal: {
      type: DataTypes.INTEGER
    }
  });

  Rezept.associate = function (models) {
    Rezept.hasMany(models.Wochenplan, {
      as: 'wochenplaene'
    });
    Rezept.hasMany(models.RezeptZutat, {
      as: 'mengen'
    });
    Rezept.hasMany(models.Favorit, {
      as: 'favoriten'
    });
  };

  Rezept.findByTitel = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rezeptSearch) {
      var rezept;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Rezept.findAll({
                where: {
                  titel: _defineProperty({}, Op.like, '%' + rezeptSearch + '%')
                }
              });

            case 2:
              rezept = _context.sent;
              return _context.abrupt("return", rezept);

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

  Rezept.findRezepte = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(favoritIds) {
      var rezept;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(favoritIds);
              _context2.next = 3;
              return Rezept.findAll({
                where: {
                  id: _defineProperty({}, Op["in"], favoritIds)
                }
              });

            case 3:
              rezept = _context2.sent;
              return _context2.abrupt("return", rezept);

            case 5:
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

  return Rezept;
};

var _default = rezept;
exports["default"] = _default;
//# sourceMappingURL=rezept.js.map