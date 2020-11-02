"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var favoriten, favoritenIds, rezepte, favoritenView, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.Favorit.findAll();

          case 2:
            favoriten = _context.sent;
            favoritenIds = [];
            favoriten.forEach(function (favorit) {
              favoritenIds.push(favorit.REZ01REZEPTId);
            });
            _context.next = 7;
            return req.context.models.Rezept.findRezepte(favoritenIds);

          case 7:
            rezepte = _context.sent;
            favoritenView = [];

            for (i = 0; i < rezepte.length; i++) {
              favoritenView.push({
                favoritId: favoriten[i].id,
                rezept: rezepte[i]
              });
            }

            return _context.abrupt("return", res.send(favoritenView));

          case 11:
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
router.get('/debug', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var favoriten;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.Favorit.findAll();

          case 2:
            favoriten = _context2.sent;
            return _context2.abrupt("return", res.send(favoriten));

          case 4:
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
router.post('/', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var favorit, newRezept;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.body;

          case 2:
            favorit = _context3.sent;
            _context3.next = 5;
            return req.context.models.Favorit.create({
              REZ01REZEPTId: favorit.rezeptId
            });

          case 5:
            newRezept = _context3.sent;
            return _context3.abrupt("return", res.send(favorit));

          case 7:
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
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=favorit.js.map