import { Hero } from '@/components/sections/hero'
import { Verwandlung } from '@/components/sections/verwandlung'
import { UeberMich } from '@/components/sections/ueber-mich'
import { Leistungen } from '@/components/sections/leistungen'
import { Team } from '@/components/sections/team'
import { Philosophie } from '@/components/sections/philosophie'
import { Preise } from '@/components/sections/preise'
import { Kontakt } from '@/components/sections/kontakt'

export default function Startseite() {
  return (
    <>
      <Hero />
      <Verwandlung />
      <UeberMich />
      <Leistungen />
      <Team />
      <Philosophie />
      <Preise />
      <Kontakt />
    </>
  )
}
