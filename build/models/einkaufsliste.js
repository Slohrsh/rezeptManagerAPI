"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Entity: ein01_Einkaufsliste
 */
var einkaufsliste = function einkaufsliste(sequelize, DataTypes) {
  var Einkaufsliste = sequelize.define('EIN1_EINKAUFSLISTE', {
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
    checked: {
      type: DataTypes.BOOLEAN
    }
  });

  Einkaufsliste.associate = function (models) {
    Einkaufsliste.belongsTo(models.RezeptZutat, {
      foreignKey: "rez70_menge_einkaufsliste",
      as: "zutat"
    });
  };

  return Einkaufsliste;
};

var _default = einkaufsliste;
exports["default"] = _default;
//# sourceMappingURL=einkaufsliste.js.map