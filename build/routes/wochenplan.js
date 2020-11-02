"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/:kw', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var eintraege, rezeptIds, rezepte, eintraegeView, _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.Wochenplan.findAllByKw(req.params.kw);

          case 2:
            eintraege = _context.sent;
            rezeptIds = [];
            eintraege.forEach(function (eintrag) {
              rezeptIds.push(eintrag.REZ01REZEPTId);
            });
            _context.next = 7;
            return req.context.models.Rezept.findRezepte(rezeptIds);

          case 7:
            rezepte = _context.sent;
            eintraegeView = [];

            _loop = function _loop(i) {
              var rezeptEintrag = void 0;
              rezepte.forEach(function (rezept) {
                if (eintraege[i].REZ01REZEPTId === rezept.id) {
                  rezeptEintrag = rezept;
                  return;
                }
              });
              eintraegeView.push({
                tag: eintraege[i].tag,
                zeitraum: eintraege[i].zeitraum,
                rezept: rezeptEintrag
              });
            };

            for (i = 0; i < eintraege.length; i++) {
              _loop(i);
            }

            return _context.abrupt("return", res.send(eintraegeView));

          case 12:
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
router.post('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var plan, newRezept;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.body;

          case 2:
            plan = _context2.sent;
            _context2.next = 5;
            return req.context.models.Wochenplan.create({
              kw: plan.kw,
              tag: plan.tag,
              zeitraum: plan.zeitraum,
              REZ01REZEPTId: plan.rezeptId
            });

          case 5:
            newRezept = _context2.sent;
            return _context2.abrupt("return", res.send(newRezept));

          case 7:
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
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=wochenplan.js.map