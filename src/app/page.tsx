import { Hero } from '@/components/sections/hero'
import { UeberUns } from '@/components/sections/ueber-uns'
import { Leistungen } from '@/components/sections/leistungen'
import { VorherNachher } from '@/components/sections/vorher-nachher'
import { Bildkapitel } from '@/components/sections/bildkapitel'
import { Team } from '@/components/sections/team'
import { Philosophie } from '@/components/sections/philosophie'
import { NeuBeiUns } from '@/components/sections/neu-bei-uns'
import { Kontakt } from '@/components/sections/kontakt'

export default function Startseite() {
  return (
    <>
      <Hero />
      <UeberUns />
      <Leistungen />
      <VorherNachher />
      <Bildkapitel />
      <Team />
      <Philosophie />
      <NeuBeiUns />
      <Kontakt />
    </>
  )
}
