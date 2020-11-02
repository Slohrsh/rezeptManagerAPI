"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Entity: fav01_Favoriten
 */
var favorit = function favorit(sequelize, DataTypes) {
  var Favorit = sequelize.define('FAV01_FAVORIT', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Favorit.associate = function (models) {
    Favorit.belongsTo(models.Rezept, {
      foreignKey: "rez01_rezept_favorit",
      as: "favorit"
    });
  };

  return Favorit;
};

var _default = favorit;
exports["default"] = _default;
//# sourceMappingURL=favorit.js.map