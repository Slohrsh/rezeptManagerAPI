export class EinkaufslisteEintragView {
    constructor(id, checked, menge, zutat, rezeptIds){
        this.ids = id;
        this.checked = checked;
        this.mengen = menge;
        this.zutat = zutat;
        this.rezeptIds = rezeptIds;
    }
}

export class Menge {
    constructor(einheit, menge){
        this.einheit = einheit;
        this.menge = menge;
    }
}