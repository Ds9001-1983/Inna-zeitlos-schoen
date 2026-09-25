/**
 * Druckvorgaben je Produkt. Quelle: Flyeralarm – Checkliste zur Druckdatenerstellung und das
 * Datenblatt `vk_mass_q` (Visitenkarte plano, Querformat). Alle Maße in Millimetern.
 *
 * Schild: Das Datenblatt für „Schilder mit Foliendruck im Wunschformat" gibt Flyeralarm erst im
 * Konfigurator heraus. Der Beschnitt von 3 mm ist eine ANNAHME – vor dem Upload mit dem Datenblatt
 * der Bestellung abgleichen und hier ändern. Der eigene Satzrand von 30 mm deckt jeden üblichen
 * Sicherheitsabstand und hält die Ecken für Bohrungen frei.
 */

export const grenzen = {
  schriftMinPt: 6,
  /** dunkle Linie auf hellem Grund */
  liniePositivMinPt: 0.25,
  /** helle Linie auf dunklem Grund */
  linieNegativMinPt: 0.5,
  farbauftragMaxProzent: 300,
  /** Text darunter nur in reinem K (tinteText) – vierfarbige Kleinschrift wird bei Passerschwankung unscharf */
  kleinschriftPt: 12,
  /** helle Schrift auf dunklem Grund (Aussparung aus vier Farben) nicht kleiner */
  negativSchriftMinPt: 7,
  /** kleinste Kantenlänge eines QR-Moduls – darunter scannen Handys unzuverlässig */
  qrModulMinMm: 0.4,
}

export const produkte = {
  visitenkarte: {
    titel: 'Visitenkarte 85 × 55 mm, quer, 4/4-farbig',
    endformat: { breite: 85, hoehe: 55 },
    beschnitt: 1,
    sicherheit: 3,
    profil: 'isoCoatedV2_300',
    datenblatt: 'Flyeralarm vk_mass_q (Datenformat 87 × 57 mm, Beschnitt 1 mm, Sicherheitsabstand 3 mm)',
    vorschauDpi: 600,
    /** Felder, ohne die keine Druck-PDF entsteht */
    pflichtfelder: ['telefon', 'email', 'domain'],
  },
  schild: {
    titel: 'Schild mit Foliendruck 600 × 500 mm, quer, 4/0-farbig',
    endformat: { breite: 600, hoehe: 500 },
    beschnitt: 3,
    beschnittIstAnnahme: true,
    sicherheit: 30,
    profil: 'isoCoatedV2',
    datenblatt:
      'Flyeralarm Schilder mit Foliendruck im Wunschformat – Beschnitt 3 mm ANGENOMMEN, Datenblatt der Bestellung prüfen',
    vorschauDpi: 40,
    pflichtfelder: ['telefon', 'domain', 'oeffnungszeiten'],
    /** Mindest-Versalhöhe in mm je Rolle – Leseabstand 2 bis 6 m vor dem Eingang */
    lesbarkeit: { wortmarke: 80, leistung: 20, angabe: 15, label: 12, claim: 12 },
  },
}

export const profile = {
  isoCoatedV2: {
    datei: 'ISOcoated_v2_eci.icc',
    name: 'ISO Coated v2 (ECI)',
    kennung: 'FOGRA39',
    bedingung:
      'Offset commercial and specialty printing according to ISO 12647-2:2004/Amd 1, paper type 1 or 2 (coated), FOGRA39L – ISO Coated v2 (ECI)',
  },
  isoCoatedV2_300: {
    datei: 'ISOcoated_v2_300_eci.icc',
    name: 'ISO Coated v2 300% (ECI)',
    kennung: 'FOGRA39',
    bedingung:
      'Offset commercial and specialty printing according to ISO 12647-2:2004/Amd 1, paper type 1 or 2 (coated), FOGRA39L – ISO Coated v2 300% (ECI), max. 300 % Farbauftrag',
  },
}

/** Datenformat = Endformat + Beschnitt auf jeder Seite */
export function datenformat(produkt) {
  const p = produkte[produkt]
  return {
    breite: p.endformat.breite + 2 * p.beschnitt,
    hoehe: p.endformat.hoehe + 2 * p.beschnitt,
  }
}
