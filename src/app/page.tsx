import { Hero } from '@/components/sections/hero'
import { Verwandlung } from '@/components/sections/verwandlung'
import { Arbeiten } from '@/components/sections/arbeiten'
import { UeberMich } from '@/components/sections/ueber-mich'
import { Leistungen } from '@/components/sections/leistungen'
import { Bildkapitel } from '@/components/sections/bildkapitel'
import { Team } from '@/components/sections/team'
import { Philosophie } from '@/components/sections/philosophie'
import { Preise } from '@/components/sections/preise'
import { Kontakt } from '@/components/sections/kontakt'

export default function Startseite() {
  return (
    <>
      <Hero />
      <Verwandlung />
      <Arbeiten />
      <UeberMich />
      <Leistungen />
      <Bildkapitel />
      <Team />
      <Philosophie />
      <Preise />
      <Kontakt />
    </>
  )
}
