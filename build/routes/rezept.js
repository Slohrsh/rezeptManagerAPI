"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _rezeptView = require("../models/dto/rezeptView");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var rezepte, rezepteViews;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.Rezept.findAll({
              include: {
                all: true,
                nested: true
              }
            });

          case 2:
            rezepte = _context.sent;
            rezepteViews = [];
            rezepte.forEach(function (rezept) {
              rezepteViews.push(new _rezeptView.RezeptViewLight(rezept.id, rezept.bild, rezept.titel, rezept.kcal));
            });
            return _context.abrupt("return", res.send(rezepteViews));

          case 6:
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
router.get('/search/:titel', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var rezepte, rezepteViews;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.Rezept.findByTitel(req.params.titel);

          case 2:
            rezepte = _context2.sent;
            rezepteViews = [];
            rezepte.forEach(function (rezept) {
              rezepteViews.push(new _rezeptView.RezeptViewLight(rezept.id, rezept.bild, rezept.titel, rezept.kcal));
            });
            return _context2.abrupt("return", res.send(rezepteViews));

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
router["delete"]('/:id', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var rezept;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.context.models.Rezept.findByPk(req.params.id);

          case 2:
            rezept = _context3.sent;
            rezept.destroy();
            return _context3.abrupt("return", res.send('ok'));

          case 5:
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
router.get('/debug', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var rezepte;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.context.models.Rezept.findAll({
              include: {
                all: true,
                nested: true
              }
            });

          case 2:
            rezepte = _context4.sent;
            return _context4.abrupt("return", res.send(rezepte));

          case 4:
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
router.get('/:rezeptId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var rezept, zutaten, _iterator, _step, menge, zutat, zutatView;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return req.context.models.Rezept.findByPk(req.params.rezeptId, {
              include: {
                all: true,
                nested: true
              }
            });

          case 2:
            rezept = _context5.sent;

            if (!rezept) {
              _context5.next = 27;
              break;
            }

            zutaten = [];

            if (!rezept.mengen) {
              _context5.next = 26;
              break;
            }

            _iterator = _createForOfIteratorHelper(rezept.mengen);
            _context5.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context5.next = 18;
              break;
            }

            menge = _step.value;
            _context5.next = 13;
            return req.context.models.Zutat.findByPk(menge.REZ02ZUTATId);

          case 13:
            zutat = _context5.sent;
            zutatView = new _rezeptView.Zutat(menge.menge, zutat.beschreibung, menge.einheit);
            zutaten.push(zutatView);

          case 16:
            _context5.next = 9;
            break;

          case 18:
            _context5.next = 23;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](7);

            _iterator.e(_context5.t0);

          case 23:
            _context5.prev = 23;

            _iterator.f();

            return _context5.finish(23);

          case 26:
            return _context5.abrupt("return", res.send(new _rezeptView.RezeptView(rezept.id, rezept.bild, rezept.titel, rezept.kcal, rezept.rezept, zutaten)));

          case 27:
            return _context5.abrupt("return", res.send(rezept));

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 20, 23, 26]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/debug', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var rezept;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return req.body;

          case 2:
            rezept = _context6.sent;
            return _context6.abrupt("return", res.send(rezept));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.patch('/', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var rezept, loadedRezept, zutaten, _iterator2, _step2, _loop;

    return regeneratorRuntime.wrap(function _callee7$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return req.body;

          case 2:
            rezept = _context8.sent;
            _context8.next = 5;
            return req.context.models.Rezept.findByPk(rezept.id, {
              include: 'mengen'
            });

          case 5:
            loadedRezept = _context8.sent;
            loadedRezept.titel = rezept.titel;
            loadedRezept.rezept = rezept.rezept;
            loadedRezept.kcal = rezept.kcal;
            loadedRezept.bild = rezept.bild;
            loadedRezept.mengen.forEach(function (menge) {
              menge.destroy();
            });
            _context8.next = 13;
            return req.context.models.Zutat.findAllByBeschreibung(rezept.zutaten.map(function (zutat) {
              return zutat.beschreibung;
            }));

          case 13:
            zutaten = _context8.sent;

            if (!rezept.zutaten) {
              _context8.next = 31;
              break;
            }

            _iterator2 = _createForOfIteratorHelper(rezept.zutaten);
            _context8.prev = 16;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var zutat, newZutat;
              return regeneratorRuntime.wrap(function _loop$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      zutat = _step2.value;
                      newZutat = void 0;

                      if (zutaten) {
                        zutaten.forEach(function (zutatSearch) {
                          if (zutatSearch.beschreibung === zutat.beschreibung) {
                            newZutat = zutatSearch;
                          }
                        });
                      }

                      if (!newZutat) {
                        _context7.next = 6;
                        break;
                      }

                      _context7.next = 13;
                      break;

                    case 6:
                      if (!zutat.id) {
                        _context7.next = 10;
                        break;
                      }

                      newZutat = zutat;
                      _context7.next = 13;
                      break;

                    case 10:
                      _context7.next = 12;
                      return req.context.models.Zutat.create({
                        beschreibung: zutat.beschreibung
                      });

                    case 12:
                      newZutat = _context7.sent;

                    case 13:
                      _context7.next = 15;
                      return req.context.models.RezeptZutat.create({
                        menge: zutat.menge,
                        einheit: zutat.einheit,
                        REZ01REZEPTId: loadedRezept.id,
                        REZ02ZUTATId: newZutat.id
                      });

                    case 15:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _loop);
            });

            _iterator2.s();

          case 19:
            if ((_step2 = _iterator2.n()).done) {
              _context8.next = 23;
              break;
            }

            return _context8.delegateYield(_loop(), "t0", 21);

          case 21:
            _context8.next = 19;
            break;

          case 23:
            _context8.next = 28;
            break;

          case 25:
            _context8.prev = 25;
            _context8.t1 = _context8["catch"](16);

            _iterator2.e(_context8.t1);

          case 28:
            _context8.prev = 28;

            _iterator2.f();

            return _context8.finish(28);

          case 31:
            loadedRezept.save();
            return _context8.abrupt("return", res.send(loadedRezept));

          case 33:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee7, null, [[16, 25, 28, 31]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var rezept, newRezept, zutaten, _iterator3, _step3, _loop2;

    return regeneratorRuntime.wrap(function _callee8$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return req.body;

          case 2:
            rezept = _context10.sent;
            _context10.next = 5;
            return req.context.models.Rezept.create({
              bild: rezept.bild,
              titel: rezept.titel,
              rezept: rezept.rezept,
              kcal: rezept.kcal
            });

          case 5:
            newRezept = _context10.sent;
            _context10.next = 8;
            return req.context.models.Zutat.findAllByBeschreibung(rezept.zutaten.map(function (zutat) {
              return zutat.beschreibung;
            }));

          case 8:
            zutaten = _context10.sent;

            if (!rezept.zutaten) {
              _context10.next = 26;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(rezept.zutaten);
            _context10.prev = 11;
            _loop2 = /*#__PURE__*/regeneratorRuntime.mark(function _loop2() {
              var zutat, newZutat;
              return regeneratorRuntime.wrap(function _loop2$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      zutat = _step3.value;
                      newZutat = void 0;

                      if (zutaten) {
                        zutaten.forEach(function (zutatSearch) {
                          if (zutatSearch.beschreibung === zutat.beschreibung) {
                            newZutat = zutatSearch;
                          }
                        });
                      }

                      if (!newZutat) {
                        _context9.next = 6;
                        break;
                      }

                      _context9.next = 13;
                      break;

                    case 6:
                      if (!zutat.id) {
                        _context9.next = 10;
                        break;
                      }

                      newZutat = zutat;
                      _context9.next = 13;
                      break;

                    case 10:
                      _context9.next = 12;
                      return req.context.models.Zutat.create({
                        beschreibung: zutat.beschreibung
                      });

                    case 12:
                      newZutat = _context9.sent;

                    case 13:
                      _context9.next = 15;
                      return req.context.models.RezeptZutat.create({
                        menge: zutat.menge,
                        einheit: zutat.einheit,
                        REZ01REZEPTId: newRezept.id,
                        REZ02ZUTATId: newZutat.id
                      });

                    case 15:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _loop2);
            });

            _iterator3.s();

          case 14:
            if ((_step3 = _iterator3.n()).done) {
              _context10.next = 18;
              break;
            }

            return _context10.delegateYield(_loop2(), "t0", 16);

          case 16:
            _context10.next = 14;
            break;

          case 18:
            _context10.next = 23;
            break;

          case 20:
            _context10.prev = 20;
            _context10.t1 = _context10["catch"](11);

            _iterator3.e(_context10.t1);

          case 23:
            _context10.prev = 23;

            _iterator3.f();

            return _context10.finish(23);

          case 26:
            return _context10.abrupt("return", res.send(rezept));

          case 27:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee8, null, [[11, 20, 23, 26]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=rezept.js.map