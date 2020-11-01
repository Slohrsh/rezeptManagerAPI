/**
 * Entity: REZ01_REZEPT
 */

const { Op } = require("sequelize");

const rezept = (sequelize, DataTypes) => {
  const Rezept = sequelize.define('REZ01_REZEPT', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bild: {
      type: DataTypes.STRING,
    },
    titel: {
      type: DataTypes.STRING
    },
    rezept: {
      type: DataTypes.TEXT
    },
    kcal: {
      type: DataTypes.INTEGER
    },
  });

  Rezept.associate = models => {
    Rezept.hasMany(models.Wochenplan, { as: 'wochenplaene' });
    Rezept.hasMany(models.RezeptZutat, { as: 'mengen' });
    Rezept.hasMany(models.Favorit, { as: 'favoriten' });
  };

  Rezept.findByTitel = async rezeptSearch => {
    let rezept = await Rezept.findAll({
      where: {
        titel: {
          [Op.like]: '%' + rezeptSearch + '%'
        }
      }
    });

    return rezept;
  };

  Rezept.findRezepte = async favoritIds => {
    console.log(favoritIds);
    let rezept = await Rezept.findAll({
      where: {
        id: {
          [Op.in]: favoritIds
        }
      }
    });

    return rezept;
  };

  return Rezept;
};

export default rezept;