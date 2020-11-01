import { Router } from 'express';
import { RezeptViewLight, RezeptView, Zutat } from '../models/dto/rezeptView'

const router = Router();

router.get('/', async (req, res) => {
  const rezepte = await req.context.models.Rezept.findAll({ include: { all: true, nested: true } });
  const rezepteViews = [];

  rezepte.forEach(
    (rezept) => {
      rezepteViews.push(new RezeptViewLight(rezept.id, rezept.bild, rezept.titel, rezept.kcal));
    }
  )
  return res.send(rezepteViews);
});

router.get('/search/:titel', async (req, res) => {
  const rezepte = await req.context.models.Rezept.findByTitel(req.params.titel);
  const rezepteViews = [];

  rezepte.forEach(
    (rezept) => {
      rezepteViews.push(new RezeptViewLight(rezept.id, rezept.bild, rezept.titel, rezept.kcal));
    }
  )
  return res.send(rezepteViews);
});

router.delete('/:id', async (req, res) => {
  const rezept = await req.context.models.Rezept.findByPk(req.params.id);
  rezept.destroy()
  return res.send('ok');
});

router.get('/debug', async (req, res) => {
  const rezepte = await req.context.models.Rezept.findAll({ include: { all: true, nested: true } });

  return res.send(rezepte);
});

router.get('/:rezeptId', async (req, res) => {
  const rezept = await req.context.models.Rezept.findByPk(
    req.params.rezeptId,
    { include: { all: true, nested: true } }
  );


  if (rezept) {
    const zutaten = [];
    if (rezept.mengen) {
      for (let menge of rezept.mengen) {
        const zutat = await req.context.models.Zutat.findByPk(menge.REZ02ZUTATId);
        const zutatView = new Zutat(menge.menge, zutat.beschreibung, menge.einheit);
        zutaten.push(zutatView);
      }
    }
    return res.send(new RezeptView(rezept.id, rezept.bild, rezept.titel, rezept.kcal, rezept.rezept, zutaten));
  }

  return res.send(rezept);
});

router.post('/debug', async (req, res) => {
  const rezept = await req.body;
  return res.send(rezept);
});

router.patch('/', async (req, res) => {
  const rezept = await req.body;

  let loadedRezept = await req.context.models.Rezept.findByPk(rezept.id, { include: 'mengen' });

  loadedRezept.titel = rezept.titel;
  loadedRezept.rezept = rezept.rezept;
  loadedRezept.kcal = rezept.kcal;
  loadedRezept.bild = rezept.bild;

  loadedRezept.mengen.forEach((menge) => {
    menge.destroy();
  })

  const zutaten = await req.context.models.Zutat.findAllByBeschreibung(rezept.zutaten.map(zutat => zutat.beschreibung));

  if (rezept.zutaten) {
    for (const zutat of rezept.zutaten) {
      let newZutat;
      if (zutaten) {
        zutaten.forEach((zutatSearch) => {
          if (zutatSearch.beschreibung === zutat.beschreibung) {
            newZutat = zutatSearch;
          }
        });
      }
      if (newZutat) { }
      else if (zutat.id) {
        newZutat = zutat;
      } else {
        newZutat = await req.context.models.Zutat.create(
          {
            beschreibung: zutat.beschreibung
          }
        );
      }
      await req.context.models.RezeptZutat.create(
        {
          menge: zutat.menge,
          einheit: zutat.einheit,
          REZ01REZEPTId: loadedRezept.id,
          REZ02ZUTATId: newZutat.id
        }
      );
    }
  }

  loadedRezept.save();

  return res.send(loadedRezept);
});

router.post('/', async (req, res) => {
  const rezept = await req.body;

  const newRezept = await req.context.models.Rezept.create(
    {
      bild: rezept.bild,
      titel: rezept.titel,
      rezept: rezept.rezept,
      kcal: rezept.kcal
    }
  );

  const zutaten = await req.context.models.Zutat.findAllByBeschreibung(rezept.zutaten.map(zutat => zutat.beschreibung));

  if (rezept.zutaten) {
    for (const zutat of rezept.zutaten) {
      let newZutat;
      if (zutaten) {
        zutaten.forEach((zutatSearch) => {
          if (zutatSearch.beschreibung === zutat.beschreibung) {
            newZutat = zutatSearch;
          }
        });
      }
      if (newZutat) { }
      else if (zutat.id) {
        newZutat = zutat;
      } else {
        newZutat = await req.context.models.Zutat.create(
          {
            beschreibung: zutat.beschreibung
          }
        );
      }
      await req.context.models.RezeptZutat.create(
        {
          menge: zutat.menge,
          einheit: zutat.einheit,
          REZ01REZEPTId: newRezept.id,
          REZ02ZUTATId: newZutat.id
        }
      );
    }
  }

  return res.send(rezept);
});

export default router;
