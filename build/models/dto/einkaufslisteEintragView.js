"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menge = exports.EinkaufslisteEintragView = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EinkaufslisteEintragView = function EinkaufslisteEintragView(id, checked, menge, zutat, rezeptIds) {
  _classCallCheck(this, EinkaufslisteEintragView);

  this.ids = id;
  this.checked = checked;
  this.mengen = menge;
  this.zutat = zutat;
  this.rezeptIds = rezeptIds;
};

exports.EinkaufslisteEintragView = EinkaufslisteEintragView;

var Menge = function Menge(einheit, menge) {
  _classCallCheck(this, Menge);

  this.einheit = einheit;
  this.menge = menge;
};

exports.Menge = Menge;
//# sourceMappingURL=einkaufslisteEintragView.js.map