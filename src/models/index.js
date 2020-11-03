import Sequelize from 'sequelize';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL,
    {
      dialect: 'postgres',
      protocol: 'postgres',
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      logging: true //false
    },
  );
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'mysql',
    },
  );
}

const models = {
  RezeptZutat: sequelize.import('./rezeptZutat'),
  Rezept: sequelize.import('./rezept'),
  Zutat: sequelize.import('./zutat'),
  Wochenplan: sequelize.import('./wochenplan'),
  Favorit: sequelize.import('./favorit'),
  Einkaufsliste: sequelize.import('./einkaufsliste')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;