"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _models = require("../models");

var _einkaufslisteEintragView = require("../models/dto/einkaufslisteEintragView");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('sequelize'),
    QueryTypes = _require.QueryTypes;

var router = (0, _express.Router)();
router.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var rezeptId, rezept;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.body;

          case 2:
            rezeptId = _context.sent;
            _context.next = 5;
            return req.context.models.Rezept.findByPk(rezeptId.rezeptId, {
              include: 'mengen'
            });

          case 5:
            rezept = _context.sent;
            rezept.mengen.forEach(function (menge) {
              req.context.models.Einkaufsliste.create({
                REZ70REZEPTZUTATENId: menge.id
              });
            });
            return _context.abrupt("return", res.send('ok'));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router["delete"]('/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, eintrag;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return req.context.models.Einkaufsliste.findByPk(id);

          case 3:
            eintrag = _context2.sent;
            eintrag.destroy();
            return _context2.abrupt("return", res.send('ok'));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/check', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var check, eintrag;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.body;

          case 2:
            check = _context3.sent;
            _context3.next = 5;
            return req.context.models.Einkaufsliste.findByPk(check.id);

          case 5:
            eintrag = _context3.sent;
            eintrag.checked = check.checked;
            eintrag.save();
            return _context3.abrupt("return", res.send('ok'));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var einkaufsliste, eintraege;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.sequelize.query("select sum(rez70.menge) menge, rez70.einheit, rez02.beschreibung, group_concat(rez70.REZ01REZEPTId separator ', ') as rezeptIds from EIN1_EINKAUFSLISTEs ein1 " + "join REZ70_REZEPT_ZUTATENs rez70 on rez70.id = ein1.REZ70REZEPTZUTATENId " + "join REZ02_ZUTATs rez02 on rez02.id = rez70.REZ02ZUTATId " + "group by rez70.einheit, rez02.beschreibung " + "order by rez02.beschreibung", {
              type: QueryTypes.SELECT
            });

          case 2:
            einkaufsliste = _context4.sent;
            eintraege = [];
            einkaufsliste.forEach(function (item) {
              item.rezeptIds = item.rezeptIds.split(',');
              item.mengen = [new _einkaufslisteEintragView.Menge(item.einheit, item.menge)];
              item.einheit = undefined;
              item.menge = undefined;
              var foundItem;
              eintraege.forEach(function (eintrag) {
                if (eintrag.beschreibung === item.beschreibung) {
                  foundItem = true;
                  item.mengen.push(new _einkaufslisteEintragView.Menge(item.einheit, item.menge));
                }
              });

              if (!foundItem) {
                eintraege.push(item);
              }
            });
            return _context4.abrupt("return", res.send(einkaufsliste));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=einkaufsliste.js.map