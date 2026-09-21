import type { Metadata } from 'next'
import { Rechtstext, Offen } from '@/components/rechtstext'
import { salon } from '@/inhalte/salon'

export const metadata: Metadata = {
  title: 'Datenschutz | INNA – Zeitlos schön',
  robots: { index: false },
}

export default function Datenschutz() {
  return (
    <Rechtstext titel="Datenschutz">
      <div>
        <h2>Kurz gesagt</h2>
        <p>
          Diese Website setzt keine Cookies, bindet keine Analyse- oder Werbedienste ein und
          lädt keine Schriften von fremden Servern. Es gibt kein Kontaktformular. Wer die Seite
          nur liest, hinterlässt außer den technisch notwendigen Server-Protokollen keine Daten.
        </p>
      </div>

      <div>
        <h2>Verantwortlich</h2>
        <p>
          <Offen was="Inhaberin, vollständiger Name" />
          <br />
          {salon.betrieb}, {salon.strasse}, {salon.plz} {salon.ort}
        </p>
      </div>

      <div>
        <h2>Server-Protokolle</h2>
        <p>
          Die Seite wird bei der Vercel Inc. gehostet. Beim Abruf werden technisch notwendige
          Daten verarbeitet: IP-Adresse, Zeitpunkt, abgerufene Adresse, übertragene Datenmenge,
          Browser und Betriebssystem. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – das
          berechtigte Interesse am sicheren und stabilen Betrieb. Die Daten werden nicht mit
          anderen Quellen zusammengeführt.
        </p>
      </div>

      <div>
        <h2>Schriften</h2>
        <p>
          Cormorant Garamond, Montserrat und Parisienne werden beim Aufbau der Seite mit
          ausgeliefert und vom selben Server geladen wie die Seite. Es entsteht keine Verbindung
          zu Google.
        </p>
      </div>

      <div>
        <h2>Links zu Instagram und Google Maps</h2>
        <p>
          Die Seite verlinkt auf das Instagram-Profil des Salons und auf Google Maps. Es sind
          reine Links, keine eingebetteten Inhalte – es werden also erst dann Daten an Meta oder
          Google übertragen, wenn du den Link anklickst. Ab dort gelten die
          Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </div>

      <div>
        <h2>Kontaktaufnahme</h2>
        <p>
          Wenn du über Instagram oder telefonisch Kontakt aufnimmst, werden die dabei
          mitgeteilten Angaben zur Bearbeitung deiner Anfrage verarbeitet (Art. 6 Abs. 1 lit. b
          DSGVO) und gelöscht, sobald sie nicht mehr benötigt werden und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </div>

      <div>
        <h2>Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei der zuständigen
          Aufsichtsbehörde beschweren: Landesbeauftragte für Datenschutz und Informationsfreiheit
          Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.
        </p>
      </div>

      <div>
        <h2>Bilder von Kundinnen</h2>
        <p>
          Aufnahmen von Haararbeiten werden nur mit ausdrücklicher Einwilligung der abgebildeten
          Person veröffentlicht. Die Einwilligung kann jederzeit für die Zukunft widerrufen
          werden; das Bild wird dann entfernt.
        </p>
      </div>
    </Rechtstext>
  )
}
