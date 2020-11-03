"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireWildcard(require("./models"));

var _routes = _interopRequireDefault(require("./routes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FS = require('fs');

var app = (0, _express["default"])(); // * Application-Level Middleware * //
// Third-Party Middleware

app.use((0, _cors["default"])()); // Built-In Middleware

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // Custom Middleware

app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.context = {
              models: _models["default"]
            };
            next();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // * Routes * //

app.use('/api/rezept', _routes["default"].rezept);
app.use('/api/zutat', _routes["default"].zutat);
app.use('/api/wochenplan', _routes["default"].wochenplan);
app.use('/api/favorit', _routes["default"].favorit);
app.use('/api/einkaufsliste', _routes["default"].einkaufsliste); // * Start * //

var eraseDatabaseOnSync = false;

_models.sequelize.sync({
  force: eraseDatabaseOnSync
}).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (eraseDatabaseOnSync) {
            createRezept();
          }

          app.listen(process.env.PORT | 3000, function () {
            return console.log("App listening on port ".concat(process.env.PORT | 3000, "!"));
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));

var createRezept = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].Rezept.create({
              id: 1,
              bild: 'https://img.chefkoch-cdn.de/rezepte/422041132876716/bilder/1117837/crop-600x400/tomate-mozzarella.jpg',
              titel: 'Tomate Mozarella',
              rezept: 'Tomate und Mozarella mit Öl und Gewürz zämmeschmeisse',
              kcal: '300'
            });

          case 2:
            _context3.next = 4;
            return _models["default"].Rezept.create({
              id: 2,
              bild: 'https://d12xickik43a9a.cloudfront.net/images/magazine/de/M28912-klassische-Pizzabroetchen-Q75-750.jpg',
              titel: 'Dinkel Pizzabrötchen',
              rezept: '•Die Hefe mit dem Zucker und etwas lauwarmen Wasser verrühren.\r' + '•Mehl und Salz in eine Schüssel geben.\r' + '•Öl dazugeben.\r' + '• ca 100-150ml Wasser dazu geben, lieber nach und nach dazugeben.\r' + '•und die Hefe mischung mit in die schüssel geben, alles mit dem Handrührgerät verrühren. (mit den Händen geht das auch)\r' + '•Brötchen formen und auf ein Backblech mit Backpapier geben.\r' + 'Bei 180C° ca. 10-12min. Backen.\r',
              kcal: '172'
            });

          case 4:
            _context3.next = 6;
            return _models["default"].Zutat.create({
              id: 1,
              beschreibung: 'Tomate'
            });

          case 6:
            _context3.next = 8;
            return _models["default"].Zutat.create({
              id: 2,
              beschreibung: 'Mozarella'
            });

          case 8:
            _context3.next = 10;
            return _models["default"].Zutat.create({
              id: 3,
              beschreibung: 'Öl'
            });

          case 10:
            _context3.next = 12;
            return _models["default"].Zutat.create({
              id: 4,
              beschreibung: 'Tomate Mozarella Gewürz'
            });

          case 12:
            _context3.next = 14;
            return _models["default"].RezeptZutat.create({
              menge: 2,
              einheit: 'Stück',
              REZ01REZEPTId: 1,
              REZ02ZUTATId: 1
            });

          case 14:
            _context3.next = 16;
            return _models["default"].RezeptZutat.create({
              menge: 1,
              einheit: 'Stück',
              REZ01REZEPTId: 1,
              REZ02ZUTATId: 2
            });

          case 16:
            _context3.next = 18;
            return _models["default"].RezeptZutat.create({
              menge: 1,
              einheit: 'EL',
              REZ01REZEPTId: 1,
              REZ02ZUTATId: 3
            });

          case 18:
            _context3.next = 20;
            return _models["default"].RezeptZutat.create({
              menge: 1,
              einheit: 'Prise',
              REZ01REZEPTId: 1,
              REZ02ZUTATId: 4
            });

          case 20:
            _context3.next = 22;
            return _models["default"].Zutat.create({
              id: 5,
              beschreibung: 'Dinkelmehl'
            });

          case 22:
            _context3.next = 24;
            return _models["default"].RezeptZutat.create({
              menge: 200,
              einheit: 'Gramm',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 5
            });

          case 24:
            _context3.next = 26;
            return _models["default"].Zutat.create({
              id: 6,
              beschreibung: 'Hefe frisch'
            });

          case 26:
            _context3.next = 28;
            return _models["default"].RezeptZutat.create({
              menge: 20,
              einheit: 'Gramm',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 6
            });

          case 28:
            _context3.next = 30;
            return _models["default"].Zutat.create({
              id: 7,
              beschreibung: 'Zucker'
            });

          case 30:
            _context3.next = 32;
            return _models["default"].RezeptZutat.create({
              menge: 5,
              einheit: 'Gramm',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 7
            });

          case 32:
            _context3.next = 34;
            return _models["default"].Zutat.create({
              id: 8,
              beschreibung: 'Salz'
            });

          case 34:
            _context3.next = 36;
            return _models["default"].RezeptZutat.create({
              menge: 10,
              einheit: 'Gramm',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 8
            });

          case 36:
            _context3.next = 38;
            return _models["default"].Zutat.create({
              id: 9,
              beschreibung: 'Olivenöl'
            });

          case 38:
            _context3.next = 40;
            return _models["default"].RezeptZutat.create({
              menge: 10,
              einheit: 'Gramm',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 9
            });

          case 40:
            _context3.next = 42;
            return _models["default"].Zutat.create({
              id: 10,
              beschreibung: 'lauwarmes Wasser'
            });

          case 42:
            _context3.next = 44;
            return _models["default"].RezeptZutat.create({
              menge: 150,
              einheit: 'Milliliter',
              REZ01REZEPTId: 2,
              REZ02ZUTATId: 10
            });

          case 44:
            _context3.next = 46;
            return _models["default"].Einkaufsliste.create({
              id: 1,
              REZ70REZEPTZUTATENId: 1
            });

          case 46:
            _context3.next = 48;
            return _models["default"].Einkaufsliste.create({
              id: 2,
              REZ70REZEPTZUTATENId: 2
            });

          case 48:
            _context3.next = 50;
            return _models["default"].Einkaufsliste.create({
              id: 3,
              REZ70REZEPTZUTATENId: 3
            });

          case 50:
            _context3.next = 52;
            return _models["default"].Einkaufsliste.create({
              id: 4,
              REZ70REZEPTZUTATENId: 4
            });

          case 52:
            _context3.next = 54;
            return _models["default"].Einkaufsliste.create({
              id: 5,
              REZ70REZEPTZUTATENId: 5
            });

          case 54:
            _context3.next = 56;
            return _models["default"].Einkaufsliste.create({
              id: 6,
              REZ70REZEPTZUTATENId: 5
            });

          case 56:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createRezept() {
    return _ref3.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map