/**
 * Entity: REZ70_REZEPT_ZUTATEN
 */

const { Op } = require("sequelize");
const regeneratorRuntime = require("regenerator-runtime");

const rezeptZutat = (sequelize, DataTypes) => {
    const RezeptZutat = sequelize.define('REZ70_REZEPT_ZUTATEN', {
      menge: {
        type: DataTypes.INTEGER
      },
      einheit: {
        type: DataTypes.STRING
      }
    });
   
    RezeptZutat.associate = (models) => {
      RezeptZutat.belongsTo(models.Rezept, {
        foreignKey: "rez01_rezept_zutat",
        as: "rezept",
      });
      RezeptZutat.belongsTo(models.Zutat, {
        foreignKey: "rez02_zutat_rezept",
        as: "zutat",
      });
      RezeptZutat.hasMany(models.Einkaufsliste, { as: 'listeneintrag' });
    };

    RezeptZutat.findMengen = async mengenIds => {
      let mengen = await RezeptZutat.findAll({
        where: {
          id: {
            [Op.in]: mengenIds
          }
        }
      });
  
      return mengen;
    };
    
   
    return RezeptZutat;
  };
   
  export default rezeptZutat;