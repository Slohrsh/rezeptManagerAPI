"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Entity: woc01_wochenplan
 */
var wochenplan = function wochenplan(sequelize, DataTypes) {
  var Wochenplan = sequelize.define('WOC01_WOCHENPLAN', {
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
    kw: {
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.INTEGER
    },
    zeitraum: {
      type: DataTypes.STRING
    }
  });

  Wochenplan.associate = function (models) {
    Wochenplan.belongsTo(models.Rezept, {
      foreignKey: "rez01_rezept_wochenplan",
      as: "rezept"
    });
  };

  Wochenplan.findAllByKw = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(woche) {
      var kw;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Wochenplan.findAll({
                where: {
                  kw: woche
                }
              });

            case 2:
              kw = _context.sent;
              return _context.abrupt("return", kw);

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

  return Wochenplan;
};

var _default = wochenplan;
exports["default"] = _default;
//# sourceMappingURL=wochenplan.js.map