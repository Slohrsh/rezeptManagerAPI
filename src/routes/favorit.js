import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const favoriten = await req.context.models.Favorit.findAll();
  const favoritenIds = [];

  favoriten.forEach(
    (favorit) => {
      favoritenIds.push(favorit.REZ01REZEPTId);
    }
  )

  const rezepte = await req.context.models.Rezept.findRezepte(favoritenIds);

  const favoritenView = [];

  for(let i = 0; i < rezepte.length; i++) {
    favoritenView.push({
      favoritId: favoriten[i].id, 
      rezept: rezepte[i]});
  }
  return res.send(favoritenView);
});

router.get('/debug', async (req, res) => {
  const favoriten = await req.context.models.Favorit.findAll();
  return res.send(favoriten);
});

router.post('/', async (req, res) => {
  const favorit = await req.body;

  const newRezept = await req.context.models.Favorit.create(
    {
      REZ01REZEPTId: favorit.rezeptId
    }
  );

  return res.send(favorit);
});

export default router;