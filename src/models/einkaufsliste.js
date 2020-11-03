/**
 * Entity: ein01_Einkaufsliste
 */

const einkaufsliste = (sequelize, DataTypes) => {
    const Einkaufsliste = sequelize.define('EIN01_EINKAUFSLISTE', {
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
        checked: {
            type: DataTypes.BOOLEAN
        }
    });

    Einkaufsliste.associate = (models) => {
        Einkaufsliste.belongsTo(models.RezeptZutat, {
            foreignKey: "rez70_menge_einkaufsliste",
            as: "zutat",
        });
    };

    return Einkaufsliste;
}

export default einkaufsliste;