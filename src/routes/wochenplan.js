import { Router } from 'express';

const router = Router();

router.get('/:kw', async (req, res) => {
  const eintraege = await req.context.models.Wochenplan.findAllByKw(req.params.kw);

  const rezeptIds = [];

  eintraege.forEach(
    (eintrag) => {
      rezeptIds.push(eintrag.REZ01REZEPTId);
    }
  )

  const rezepte = await req.context.models.Rezept.findRezepte(rezeptIds);

  const eintraegeView = [];

  for(let i = 0; i < eintraege.length; i++) {
    let rezeptEintrag;
    rezepte.forEach((rezept) => {
      if(eintraege[i].REZ01REZEPTId === rezept.id) {
        rezeptEintrag = rezept;
        return;
      }
    });

    eintraegeView.push( {
      tag: eintraege[i].tag,
      zeitraum: eintraege[i].zeitraum,
      rezept: rezeptEintrag
    });
  }
    
  return res.send(eintraegeView);
});

router.post('/', async (req, res) => {
  const plan = await req.body;

  const newRezept = await req.context.models.Wochenplan.create(
    {
      kw: plan.kw,
      tag: plan.tag,
      zeitraum: plan.zeitraum,
      REZ01REZEPTId: plan.rezeptId
    }
  );
  return res.send(newRezept);
});

export default router;