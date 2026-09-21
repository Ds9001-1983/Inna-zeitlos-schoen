import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Verwandlung } from '@/components/sections/verwandlung'
import { Termin } from '@/components/sections/termin'

export default function Startseite() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Verwandlung />
        <Termin />
      </main>
      <SiteFooter />
    </>
  )
}
