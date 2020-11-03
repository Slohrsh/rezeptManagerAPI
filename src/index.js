import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';
var FS = require('fs');


const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

// * Routes * //

app.use('/api/rezept', routes.rezept);
app.use('/api/zutat', routes.zutat);
app.use('/api/wochenplan', routes.wochenplan);
app.use('/api/favorit', routes.favorit);
app.use('/api/einkaufsliste', routes.einkaufsliste);

// * Start * //
const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync}).then(async () => {

  if (eraseDatabaseOnSync) {
    createRezept();
  }

  app.listen(process.env.PORT | 3000, () =>
    console.log(`App listening on port ${process.env.PORT | 3000}!`),
  );

});

const createRezept = async () => {
  await models.Rezept.create(
    {
      id: 1,
      bild: 'https://img.chefkoch-cdn.de/rezepte/422041132876716/bilder/1117837/crop-600x400/tomate-mozzarella.jpg',
      titel: 'Tomate Mozarella',
      rezept: 'Tomate und Mozarella mit Öl und Gewürz zämmeschmeisse',
      kcal: '300'
    }
  );
  await models.Rezept.create(
    {
      id: 2,
      bild: 'https://d12xickik43a9a.cloudfront.net/images/magazine/de/M28912-klassische-Pizzabroetchen-Q75-750.jpg',
      titel: 'Dinkel Pizzabrötchen',
      rezept: '•Die Hefe mit dem Zucker und etwas lauwarmen Wasser verrühren.\r' +
      '•Mehl und Salz in eine Schüssel geben.\r' +
      '•Öl dazugeben.\r' +
      '• ca 100-150ml Wasser dazu geben, lieber nach und nach dazugeben.\r' +
      '•und die Hefe mischung mit in die schüssel geben, alles mit dem Handrührgerät verrühren. (mit den Händen geht das auch)\r' +
      '•Brötchen formen und auf ein Backblech mit Backpapier geben.\r' +
      'Bei 180C° ca. 10-12min. Backen.\r',
      kcal: '172'
    }
  );
  await models.Zutat.create(
    {
      id: 1,
      beschreibung: 'Tomate'
    }
  );
  await models.Zutat.create(
    {
      id: 2,
      beschreibung: 'Mozarella'
    }
  );
  await models.Zutat.create(
    {
      id: 3,
      beschreibung: 'Öl'
    }
  );
  await models.Zutat.create(
    {
      id: 4,
      beschreibung: 'Tomate Mozarella Gewürz'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 2,
      einheit: 'Stück',
      REZ01REZEPTId: 1,
      REZ02ZUTATId: 1
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 1,
      einheit: 'Stück',
      REZ01REZEPTId: 1,
      REZ02ZUTATId: 2
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 1,
      einheit: 'EL',
      REZ01REZEPTId: 1,
      REZ02ZUTATId: 3
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 1,
      einheit: 'Prise',
      REZ01REZEPTId: 1,
      REZ02ZUTATId: 4
    }
  );
  await models.Zutat.create(
    {
      id: 5,
      beschreibung: 'Dinkelmehl'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 200,
      einheit: 'Gramm',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 5
    }
  );
  await models.Zutat.create(
    {
      id: 6,
      beschreibung: 'Hefe frisch'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 20,
      einheit: 'Gramm',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 6
    }
  );
  await models.Zutat.create(
    {
      id: 7,
      beschreibung: 'Zucker'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 5,
      einheit: 'Gramm',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 7
    }
  );
  await models.Zutat.create(
    {
      id: 8,
      beschreibung: 'Salz'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 10,
      einheit: 'Gramm',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 8
    }
  );
  await models.Zutat.create(
    {
      id: 9,
      beschreibung: 'Olivenöl'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 10,
      einheit: 'Gramm',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 9
    }
  );
  await models.Zutat.create(
    {
      id: 10,
      beschreibung: 'lauwarmes Wasser'
    }
  );
  await models.RezeptZutat.create(
    {
      menge: 150,
      einheit: 'Milliliter',
      REZ01REZEPTId: 2,
      REZ02ZUTATId: 10
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 1,
      REZ70REZEPTZUTATENId: 1
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 2,
      REZ70REZEPTZUTATENId: 2
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 3,
      REZ70REZEPTZUTATENId: 3
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 4,
      REZ70REZEPTZUTATENId: 4
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 5,
      REZ70REZEPTZUTATENId: 5
    }
  );
  await models.Einkaufsliste.create(
    {
      id: 6,
      REZ70REZEPTZUTATENId: 5
    }
  );
};