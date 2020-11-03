import Sequelize from 'sequelize';
 
const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  true //false
  },
);
 
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