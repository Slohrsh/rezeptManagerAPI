"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zutat = exports.ZutatView = exports.RezeptView = exports.RezeptViewLight = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RezeptViewLight = function RezeptViewLight(id, bild, titel, kcal) {
  _classCallCheck(this, RezeptViewLight);

  this.id = id;
  this.bild = bild;
  this.titel = titel;
  this.kcal = kcal;
};

exports.RezeptViewLight = RezeptViewLight;

var RezeptView = function RezeptView(id, bild, titel, kcal, rezept, zutaten) {
  _classCallCheck(this, RezeptView);

  this.id = id;
  this.bild = bild;
  this.titel = titel;
  this.kcal = kcal;
  this.rezept = rezept;
  this.zutaten = zutaten;
};

exports.RezeptView = RezeptView;

var ZutatView = function ZutatView(id, zutat) {
  _classCallCheck(this, ZutatView);

  this.id = id;
  this.zutat = zutat;
};

exports.ZutatView = ZutatView;

var Zutat = function Zutat(menge, beschreibung, einheit) {
  _classCallCheck(this, Zutat);

  this.menge = menge;
  this.beschreibung = beschreibung;
  this.einheit = einheit;
};

exports.Zutat = Zutat;
//# sourceMappingURL=rezeptView.js.map