import { Router } from 'express';
import { sequelize } from '../models';
import { EinkaufslisteEintragView, Menge } from '../models/dto/einkaufslisteEintragView';

const { QueryTypes } = require('sequelize');

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
    let listAggStringDialect;
    if(process.env.PORT) {
        listAggStringDialect = "string_agg(rez70.REZ01REZEPTId,',') ";
    } else {
        listAggStringDialect = "group_concat(rez70.REZ01REZEPTId separator ', ')";
    }

    const einkaufsliste = await sequelize.query(
        'select sum(rez70.menge) menge, rez70.einheit, rez02.beschreibung, ' + listAggStringDialect + ' as rezeptIds from "EIN01_EINKAUFSLISTEs" ein01 '
        + 'join "REZ70_REZEPT_ZUTATENs" rez70 on rez70.id = ein01.REZ70REZEPTZUTATENId '
        + 'join "REZ02_ZUTATs" rez02 on rez02.id = rez70.REZ02ZUTATId '
        + "group by rez70.einheit, rez02.beschreibung "
        + "order by rez02.beschreibung", { type: QueryTypes.SELECT });

    const eintraege = [];

    einkaufsliste.forEach((item) => {
        item.rezeptIds = item.rezeptIds.split(',');
        item.mengen = [new Menge(item.einheit, item.menge)]
        item.einheit = undefined;
        item.menge = undefined;
        let foundItem;
        eintraege.forEach((eintrag) => {
            if(eintrag.beschreibung === item.beschreibung){
                foundItem = true;
                item.mengen.push(new Menge(item.einheit, item.menge))
            }
        });

        if(!foundItem){
            eintraege.push(item);
        }
    });


    return res.send(einkaufsliste);
});

export default router;