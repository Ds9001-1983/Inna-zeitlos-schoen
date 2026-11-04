'use client'

import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const pfad = usePathname()

  useEffect(() => {
    // Lenis über den GSAP-Ticker antreiben, damit ScrollTrigger synchron bleibt
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  // Kommt man von Impressum oder Datenschutz über „/#abschnitt“ zurück, springt Next.js selbst zum
  // Abschnitt. Lenis kennt diese Position nicht und würde beim ersten Scrollen von der alten Seite aus
  // weiterrechnen – die Seite spränge fast nach oben. Deshalb übernimmt Lenis den Sprung (04.11.2026).
  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis || !window.location.hash) return
    const frame = requestAnimationFrame(() => {
      const ziel = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (!ziel) return
      lenis.resize() // sonst gilt noch die Höhe der vorigen Seite als Grenze
      lenis.scrollTo(ziel, { immediate: true, force: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pfad])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, syncTouch: false }}>
      {children}
    </ReactLenis>
  )
}
