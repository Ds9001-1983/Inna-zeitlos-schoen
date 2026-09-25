/**
 * Schild vor dem Eingang, 600 × 500 mm quer, hell auf Leinen (gewählt am 23.09.2026).
 *
 * Wie die Karte auf dem Tisch in Innas Seitenentwurf: alles hängt an einer senkrechten Achse, nach
 * den sichtbaren Glyphen zentriert. INNA gibt die Breite vor – ZEITLOS SCHÖN und beide
 * Leistungszeilen laufen auf ihre Kanten. Von oben nach unten die Fragen einer Passantin: Wer ist
 * das? Was macht sie? Wann ist offen? Wie erreiche ich sie?
 *
 * Aus der Jury (23.09.2026): Trennpunkte gezeichnet (Ø 5 mm statt 2,8 mm Glyphe), ZEITLOS SCHÖN in
 * Montserrat 400 statt 500 (auf Papier gibt es kein tinte/70 wie auf der Website), „Zwei
 * Friseurmeisterinnen" sagt, dass hier ein Friseur ist, Öffnungszeiten so breit wie ihr Inhalt
 * mit Linien wie die Preisliste, Zeilentakt 27 mm.
 */

/** Farbrollen auf Leinen: Kupfer tief für den Claim (Text), Kupfer für Linie und Punkte (Flächen) */
const TON = { grund: 'leinen', schrift: 'tinte', claim: 'kupferTief', akzent: 'kupfer' }

// Versalhöhen in mm (Mindestwerte stehen in formate.mjs → lesbarkeit)
const MASS = {
  inna: 88,
  /** x-Höhe der Parisienne */
  claimX: 13,
  team: 15,
  leistung: 20,
  angabe: 15,
  kontakt: 16,
  punkt: 5,
}

// Abstände in mm, jeweils von Tintenkante zu Tintenkante, wo nicht anders vermerkt
const NORMAL = {
  /** Grundlinie INNA → Versalkante ZEITLOS SCHÖN */
  marke: 13,
  /** Grundlinie ZEITLOS SCHÖN → Oberkante Claim */
  claim: 14,
  vorLinie: 12,
  nachLinie: 12,
  vorLeistung: 12,
  /** Grundlinie zu Grundlinie */
  leistungZeile: 34,
  /** Luft zwischen Leistung und Trennpunkt – mindestens, sonst so viel, dass die Zeile INNA-breit wird */
  leistungTrennerMin: 8,
  leistungTrennerMax: 26,
  vorZeiten: 16,
  /** Grundlinie zu Grundlinie */
  zeitenZeile: 27,
  /** Luft zwischen Tag und Uhrzeit */
  zeitenLuft: 40,
  vorKontakt: 14,
  kontaktTrenner: 14,
  /** Grundlinie zu Grundlinie, falls Telefon und Website zweizeilig stehen müssen */
  kontaktZeile: 26,
}

/** Enger Takt für viele Öffnungszeiten oder einen zweizeiligen Kontakt – spart rund 4 mm je Zeile. */
const KOMPAKT = { ...NORMAL, claim: 12, vorZeiten: 14, zeitenZeile: 24, vorKontakt: 12, kontaktZeile: 23 }

const LINIE = { laenge: 60, staerkePt: 3 }
const ZEITEN_LINIE = { staerkePt: 1.5 }

const sichtbar = (m) => m.rechts - m.links

/** Setzt eine Zeile so, dass die sichtbaren Glyphen – nicht die Vorbreite – mittig auf der Achse stehen. */
function mittig(s, inhalt, o, achse) {
  const m = s.messen(inhalt, o)
  return s.text(inhalt, { ...o, x: achse - (m.links + m.rechts) / 2, ausrichtung: 'links' })
}

/**
 * Teile mit gezeichnetem Punkt dazwischen, als Ganzes nach Tintenkanten zentriert. Die Luft um die
 * Punkte wächst, bis die Zeile `zielbreite` erreicht (zwischen min und max).
 */
function reihe(s, teile, y, o, { achse, zielbreite, min, max, farbe }) {
  const masse = teile.map((t) => s.messen(t, o))
  const textbreite = masse.reduce((summe, m) => summe + sichtbar(m), 0)
  const luecken = teile.length - 1
  const luft = Math.min(max, Math.max(min, (zielbreite - textbreite - luecken * MASS.punkt) / (2 * luecken)))
  const gesamt = textbreite + luecken * (2 * luft + MASS.punkt)
  const punktY = y - masse[0].xHoehe / 2
  let x = achse - gesamt / 2
  teile.forEach((t, i) => {
    s.text(t, { ...o, x: x - masse[i].links, y, ausrichtung: 'links' })
    x += sichtbar(masse[i])
    if (i < luecken) {
      s.punkt(x + luft + MASS.punkt / 2, punktY, MASS.punkt, { farbe })
      x += 2 * luft + MASS.punkt
    }
  })
  return gesamt
}

/** Breite, die eine Angabe belegt – Wert oder, solange offen, das Muster des Platzhalters. */
const angabeBreite = (s, feld, o, { angaben, feldBeschreibung }) =>
  s.messen(angaben[feld] ?? feldBeschreibung[feld].muster, o).breite

/**
 * Telefon · Website als eine Zeile, zentriert (nach Vorbreite – so rechnet auch der Platzhalter).
 * Passt das nicht in den Satzspiegel, stehen beide zentriert untereinander.
 */
function kontaktPlan(s, o, abstand, inhalte) {
  const breiten = ['telefon', 'domain'].map((f) => angabeBreite(s, f, o, inhalte))
  const platz = s.satzspiegel.breite
  for (const [i, feld] of ['Telefon', 'Website'].entries()) {
    if (breiten[i] > platz) {
      throw new Error(`Schild: ${feld} ist ${breiten[i].toFixed(0)} mm breit, Platz sind ${platz} mm – bitte kürzer schreiben (Website ohne www.).`)
    }
  }
  const einzeilig = breiten[0] + 2 * abstand.kontaktTrenner + MASS.punkt + breiten[1]
  return { breiten, einzeilig, zweizeilig: einzeilig > platz }
}

function kontaktSetzen(s, y, achse, o, farbePunkt, plan, abstand) {
  const [bTelefon, bDomain] = plan.breiten
  if (plan.zweizeilig) {
    s.angabe('telefon', { ...o, x: achse - bTelefon / 2, y, ausrichtung: 'links' })
    s.angabe('domain', { ...o, x: achse - bDomain / 2, y: y + abstand.kontaktZeile, ausrichtung: 'links' })
    return
  }
  const luft = abstand.kontaktTrenner
  const x0 = achse - plan.einzeilig / 2
  s.angabe('telefon', { ...o, x: x0, y, ausrichtung: 'links' })
  s.punkt(x0 + bTelefon + luft + MASS.punkt / 2, y - s.messen('x', o).xHoehe / 2, MASS.punkt, { farbe: farbePunkt })
  s.angabe('domain', { ...o, x: achse + plan.einzeilig / 2, y, ausrichtung: 'rechts' })
}

/** Ausdehnung der Öffnungszeiten über und unter der ersten Grundlinie – Tabelle oder Platzhalter. */
function zeitenMasse(s, o, abstand, { angaben, feldBeschreibung }) {
  const v = s.messen('H', o).versalhoehe
  const za = abstand.zeitenZeile
  if (angaben.oeffnungszeiten) {
    const linie = (za - v) / 2
    return { ueber: v, unter: (angaben.oeffnungszeiten.length - 1) * za + linie }
  }
  return { ueber: v * 1.25, unter: (feldBeschreibung.oeffnungszeiten.zeilen - 1) * za + v * 0.25 }
}

function schild() {
  const stil = {
    inna: { schrift: 'display', versalhoehe: MASS.inna, laufweite: 0.34, farbe: TON.schrift, rolle: 'wortmarke' },
    zeile2: { schrift: 'sans', laufweite: 0.36, farbe: TON.schrift, rolle: 'label' },
    claim: { schrift: 'signatur', farbe: TON.claim, rolle: 'claim' },
    team: { schrift: 'displayKursiv', versalhoehe: MASS.team, farbe: TON.schrift, rolle: 'angabe' },
    leistung: { schrift: 'display', versalhoehe: MASS.leistung, farbe: TON.schrift, rolle: 'leistung' },
    zeiten: { schrift: 'sans', versalhoehe: MASS.angabe, farbe: TON.schrift, rolle: 'angabe' },
    kontakt: { schrift: 'sans', versalhoehe: MASS.kontakt, farbe: TON.schrift, rolle: 'angabe' },
  }

  const seite = (s, inhalte) => {
    const { text } = inhalte
    const achse = s.breite / 2
    s.flaeche(TON.grund)

    // ---------- Maße vorab ----------

    const inna = s.messen(text.wortmarke, stil.inna)
    const innaBreite = sichtbar(inna)
    // ZEITLOS SCHÖN auf dieselbe Tintenbreite wie INNA – wie die Wortmarke der Website
    const probe = s.messen(text.wortmarkeZeile2, { ...stil.zeile2, versalhoehe: 20 })
    const zeile2 = { ...stil.zeile2, versalhoehe: (20 * innaBreite) / sichtbar(probe) }
    const zeile2Mass = s.messen(text.wortmarkeZeile2, zeile2)

    const claimProbe = s.messen(text.claim, { ...stil.claim, versalhoehe: 10 })
    const claim = { ...stil.claim, versalhoehe: (10 * MASS.claimX) / claimProbe.xHoehe }
    const claimMass = s.messen(text.claim, claim)

    const teamMass = s.messen(text.team, stil.team)

    // Leistungen in zwei gleich langen Zeilen: 1 + 3 und 2 + 4 der Website-Reihenfolge
    const [blond, farbe, tressen, schnitt] = text.leistungen
    const zeilen = [
      [blond, tressen],
      [farbe, schnitt],
    ]
    const zeilenMass = zeilen.map((z) => s.messen(z.join(' '), stil.leistung))

    const kontakt = s.messen('Hgy', stil.kontakt)

    /** Senkrechter Stapel mit einem Abstandssatz, erst relativ zur Oberkante von INNA. */
    const stapel = (abstand) => {
      const zeiten = zeitenMasse(s, stil.zeiten, abstand, inhalte)
      const plan = kontaktPlan(s, stil.kontakt, abstand, inhalte)
      const y = {}
      y.inna = inna.oben
      y.zeile2 = y.inna + abstand.marke + zeile2Mass.versalhoehe
      y.claim = y.zeile2 + abstand.claim + claimMass.oben
      y.linie = y.claim - claimMass.unten + abstand.vorLinie
      y.team = y.linie + abstand.nachLinie + teamMass.oben
      y.leistung1 = y.team - teamMass.unten + abstand.vorLeistung + zeilenMass[0].oben
      y.leistung2 = y.leistung1 + abstand.leistungZeile
      y.zeiten = y.leistung2 - zeilenMass[1].unten + abstand.vorZeiten + zeiten.ueber
      y.kontakt = y.zeiten + zeiten.unter + abstand.vorKontakt + kontakt.versalhoehe
      const letzte = y.kontakt + (plan.zweizeilig ? abstand.kontaktZeile : 0)
      return { abstand, plan, y, hoehe: letzte - kontakt.unten }
    }

    const platz = s.satzspiegel.hoehe
    const gewaehlt = [stapel(NORMAL), stapel(KOMPAKT)].find((st) => st.hoehe <= platz)
    if (!gewaehlt) {
      const zeilen = inhalte.angaben.oeffnungszeiten?.length ?? 3
      throw new Error(
        `Schild: ${zeilen} Zeilen Öffnungszeiten passen nicht (Inhalt ${stapel(KOMPAKT).hoehe.toFixed(0)} mm, Satzspiegel ${platz} mm). Höchstens vier Zeilen – bitte Tage zusammenfassen, z. B. „Di – Fr".`,
      )
    }
    const { abstand, plan, y, hoehe } = gewaehlt

    // Optische Mitte: oben etwas weniger Rand als unten
    const oben = s.satzspiegel.y + (platz - hoehe) * 0.45
    for (const k of Object.keys(y)) y[k] += oben

    // ---------- Setzen ----------

    mittig(s, text.wortmarke, { ...stil.inna, y: y.inna }, achse)
    mittig(s, text.wortmarkeZeile2, { ...zeile2, y: y.zeile2 }, achse)
    mittig(s, text.claim, { ...claim, y: y.claim }, achse)

    s.linie(achse - LINIE.laenge / 2, y.linie, achse + LINIE.laenge / 2, y.linie, {
      farbe: TON.akzent,
      staerkePt: LINIE.staerkePt,
    })

    mittig(s, text.team, { ...stil.team, y: y.team }, achse)

    const reiheOpt = { achse, zielbreite: innaBreite, min: abstand.leistungTrennerMin, max: abstand.leistungTrennerMax, farbe: TON.akzent }
    reihe(s, zeilen[0], y.leistung1, stil.leistung, reiheOpt)
    reihe(s, zeilen[1], y.leistung2, stil.leistung, reiheOpt)

    s.zeiten({
      ...stil.zeiten,
      x: achse,
      y: y.zeiten,
      breite: innaBreite,
      luft: abstand.zeitenLuft,
      ausrichtung: 'mitte',
      zeilenabstand: abstand.zeitenZeile,
      linien: { farbe: TON.akzent, staerkePt: ZEITEN_LINIE.staerkePt, abstand: (abstand.zeitenZeile - MASS.angabe) / 2 },
    })

    kontaktSetzen(s, y.kontakt, achse, stil.kontakt, TON.akzent, plan, abstand)
  }
  return seite
}

const auftrag = {
  produkt: 'schild',
  beschreibung: 'Schild 600 × 500 mm quer vor dem Eingang – eine Mittelachse wie Innas Karte, hell auf Leinen',
  ausgaben: { default: [schild()] },
}

export default auftrag
