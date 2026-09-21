import type { Metadata } from 'next'
import { Rechtstext, Offen } from '@/components/rechtstext'
import { salon } from '@/inhalte/salon'

export const metadata: Metadata = {
  title: 'Impressum | INNA – Zeitlos schön',
  robots: { index: false },
}

export default function Impressum() {
  return (
    <Rechtstext titel="Impressum">
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <Offen was="Inhaberin, vollständiger Name" />
          <br />
          {salon.betrieb}
          <br />
          {salon.strasse}
          <br />
          {salon.plz} {salon.ort}
        </p>
      </div>

      <div>
        <h2>Kontakt</h2>
        <p>
          Telefon: <Offen was="Telefonnummer" />
          <br />
          E-Mail: <Offen was="E-Mail-Adresse" />
          <br />
          Instagram:{' '}
          <a href={salon.instagram} className="text-kupfer-tief underline underline-offset-4">
            {salon.instagramName}
          </a>
        </p>
      </div>

      <div>
        <h2>Umsatzsteuer</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: <Offen was="USt-IdNr. oder Hinweis auf Kleinunternehmerregelung" />
        </p>
      </div>

      <div>
        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: Friseurmeisterin (verliehen in der Bundesrepublik Deutschland)
          <br />
          Zuständige Kammer: <Offen was="Handwerkskammer" />
          <br />
          Es gelten die Handwerksordnung (HwO) und die Regelungen der zuständigen Handwerkskammer.
        </p>
      </div>

      <div>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>

      <div>
        <h2>Bildnachweis</h2>
        <p>
          Alle Aufnahmen von Haararbeiten stammen aus dem Salon.
          <br />
          <Offen was="Bildnachweis, sobald die Einwilligungen der abgebildeten Kundinnen vorliegen" />
        </p>
      </div>
    </Rechtstext>
  )
}
