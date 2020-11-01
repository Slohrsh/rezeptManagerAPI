/**
 * Entity: REZ02_ZUTAT
 */
const { Op } = require("sequelize");

 const zutat = (sequelize, DataTypes) => {
    const Zutat = sequelize.define('REZ02_ZUTAT', {
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
      beschreibung: {
          type: DataTypes.STRING
      }
    });

    Zutat.associate = models => {
        Zutat.hasMany(models.RezeptZutat, { as: 'mengen' } );
    };

    Zutat.findByBeschreibung = async zutatSearch => {
        let zutat = await Zutat.findAll({
          where: { beschreibung:  {
            [Op.like]: '%' + zutatSearch + '%' 
          }
        }
        });
     
        return zutat;
    };

    Zutat.findAllByBeschreibung = async zutaten => {
      let zutat = await Zutat.findAll({
        where: { beschreibung:  {
          [Op.in]: zutaten
        }
      }
      });
   
      return zutat;
  };

    Zutat.findZutaten = async zutatenIds => {
      let rezept = await Zutat.findAll({
        where: {
          id: {
            [Op.in]: zutatenIds
          }
        }
      });
  
      return rezept;
    };

    return Zutat;
}

export default zutat;