'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/**
 * Text fährt zeilenweise aus einer Maske hoch, sobald er in den Blick kommt.
 * SplitText mit aria:'auto' hält den Text für Screenreader zusammen,
 * autoSplit:true teilt bei Fensteränderung und Schriftwechsel neu auf.
 */
export function ZeilenReveal({
  children,
  className = '',
  as: Tag = 'div',
  verzug = 0,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  verzug?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (selbst) =>
            gsap.from(selbst.lines, {
              yPercent: 110,
              duration: 1.05,
              ease: 'power3.out',
              stagger: 0.08,
              delay: verzug,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        })
        return () => split.revert()
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/**
 * Bild wird beim Scrollen aus einer Maske aufgedeckt und fährt dabei
 * aus leichter Übergröße in den Stand. Ohne Scroll-Scrub, damit es einmal
 * passiert und danach ruhig bleibt.
 */
export function BildReveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        })
        tl.from(ref.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.15,
          ease: 'power3.out',
        }).from('[data-bild]', { scale: 1.16, duration: 1.5, ease: 'power3.out' }, 0)
        return () => tl.kill()
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
