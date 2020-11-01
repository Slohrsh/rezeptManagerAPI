/**
 * Entity: woc01_wochenplan
 */

const wochenplan = (sequelize, DataTypes) => {
  const Wochenplan = sequelize.define('WOC01_WOCHENPLAN', {
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
    kw: {
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.INTEGER
    },
    zeitraum: {
      type: DataTypes.STRING
    }
  });

  Wochenplan.associate = (models) => {
    Wochenplan.belongsTo(models.Rezept, {
      foreignKey: "rez01_rezept_wochenplan",
      as: "rezept",
    });
  };

  Wochenplan.findAllByKw = async woche => {
    let kw = await Wochenplan.findAll({
      where: { kw:  woche }
    });
 
    return kw;
};

  return Wochenplan;
}

export default wochenplan;