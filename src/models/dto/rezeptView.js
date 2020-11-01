export class RezeptViewLight {
    constructor(id, bild, titel, kcal){
        this.id = id;
        this.bild = bild;
        this.titel = titel;
        this.kcal = kcal;
    }
}

export class RezeptView {
    constructor(id, bild, titel, kcal, rezept, zutaten){
        this.id = id;
        this.bild = bild;
        this.titel = titel;
        this.kcal = kcal;
        this.rezept = rezept;
        this.zutaten = zutaten;
    }
}

export class ZutatView {
    constructor(id, zutat)
    {
        this.id = id;
        this.zutat = zutat;
    }
}

export class Zutat {
    constructor(menge, beschreibung, einheit)
    {
        this.menge = menge;
        this.beschreibung = beschreibung;
        this.einheit = einheit;
    }
}