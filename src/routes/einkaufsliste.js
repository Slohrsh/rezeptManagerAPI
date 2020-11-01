import { Router } from 'express';
import { EinkaufslisteEintragView, Menge } from '../models/dto/einkaufslisteEintragView';

const router = Router();

router.post('/', async (req, res) => {
    const rezeptId = await req.body;

    const rezept = await req.context.models.Rezept.findByPk(rezeptId.rezeptId, { include: 'mengen' });

    rezept.mengen.forEach((menge) => {
        req.context.models.Einkaufsliste.create(
            {
                REZ70REZEPTZUTATENId: menge.id
            }
        );
    })

    return res.send('ok');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const eintrag = await req.context.models.Einkaufsliste.findByPk(id);

    eintrag.destroy();

    return res.send('ok');
});


router.post('/check', async (req, res) => {
    const check = await req.body;

    const eintrag = await req.context.models.Einkaufsliste.findByPk(check.id);

    eintrag.checked = check.checked;

    eintrag.save();

    return res.send('ok');
});

router.get('/', async (req, res) => {
    const einkaufsliste = await req.context.models.Einkaufsliste.findAll();
    const mengeIds = [];

    einkaufsliste.forEach(
        (eintrag) => {
            mengeIds.push(eintrag.REZ70REZEPTZUTATENId);
        }
    )

    const zutatenIDs = [];

    const mengen = await req.context.models.RezeptZutat.findMengen(mengeIds);
    mengen.forEach(
        (menge) => {
            zutatenIDs.push(menge.REZ02ZUTATId);
        }
    )

    const zutaten = await req.context.models.Zutat.findZutaten(mengeIds);
    const eintraege = new Map();

    for (let i = 0; i < einkaufsliste.length; i++) {
        let foundMenge;

        mengen.forEach((menge) => {
            if (menge.id === einkaufsliste[i].REZ70REZEPTZUTATENId) {
                foundMenge = menge;
            }
        });

        let foundZutat;

        zutaten.forEach((zutat) => {
            if (zutat.id === foundMenge.REZ02ZUTATId) {
                foundZutat = zutat;
            }
        });

        let eintrag = eintraege.get(foundZutat.beschreibung);
        if (!eintrag) {
            eintrag = new EinkaufslisteEintragView(
                [einkaufsliste[i].id],
                einkaufsliste[i].checked === null || einkaufsliste[i].checked === false 
                    ? false : true,
                [new Menge(foundMenge.einheit, foundMenge.menge)],
                foundZutat.beschreibung,
                [foundMenge.REZ01REZEPTId])
            eintraege.set(foundZutat.beschreibung, eintrag);
        } else {
            let mengeUpdated = false;
            eintrag.mengen.forEach((menge) => {
                if (menge.einheit === foundMenge.einheit) {
                    menge.menge += foundMenge.menge;
                    mengeUpdated = true;
                }
            });
            eintrag.ids.push(einkaufsliste[i].id);
            eintrag.rezeptIds.push(foundMenge.REZ01REZEPTId);
            if (!mengeUpdated) {
                eintrag.mengen.push(new Menge(foundMenge.einheit, foundMenge.menge));
            }
        }
    }


    return res.send(Array.from(eintraege.values()));
});

export default router;