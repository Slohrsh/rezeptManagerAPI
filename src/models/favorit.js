/**
 * Entity: fav01_Favoriten
 */

const favorit = (sequelize, DataTypes) => {
    const Favorit = sequelize.define('FAV01_FAVORIT', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });

    Favorit.associate = (models) => {
        Favorit.belongsTo(models.Rezept, {
            foreignKey: "rez01_rezept_favorit",
            as: "favorit",
        });
    };

    return Favorit;
}

export default favorit;