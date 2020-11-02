"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rezept = _interopRequireDefault(require("./rezept"));

var _zutat = _interopRequireDefault(require("./zutat"));

var _wochenplan = _interopRequireDefault(require("./wochenplan"));

var _favorit = _interopRequireDefault(require("./favorit"));

var _einkaufsliste = _interopRequireDefault(require("./einkaufsliste"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  rezept: _rezept["default"],
  zutat: _zutat["default"],
  wochenplan: _wochenplan["default"],
  favorit: _favorit["default"],
  einkaufsliste: _einkaufsliste["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map