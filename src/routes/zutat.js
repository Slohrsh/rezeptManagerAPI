import { Router } from 'express';
import { ZutatView } from '../models/dto/rezeptView'

const router = Router();

router.get('/single/:zutatId', async (req, res) => {
  const zutat = await req.context.models.Zutat.findByPk(
    req.params.zutatId,
  );
  return res.send(zutat);
});

router.get('/search/:beschreibung', async (req, res) => {
  const zutaten = await req.context.models.Zutat.findByBeschreibung(
    req.params.beschreibung,
  );
  const zutatenViews = [];

  zutaten.forEach(
    (zutat) => {
      zutatenViews.push(new ZutatView(zutat.id, zutat.beschreibung));
    }
  )
  return res.send(zutatenViews);
});

export default router;
