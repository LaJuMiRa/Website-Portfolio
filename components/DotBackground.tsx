'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

const SPACING   = 38
const BASE_R    = 0.8
const MAX_R     = 4
const INFLUENCE = 120

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const { theme } = useTheme()
  const themeRef  = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cols: number, rows: number, dpr: number
    let rafId: number
    let resizeTimer: ReturnType<typeof setTimeout>

    function setup() {
      dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width  = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width  = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / SPACING) + 1
      rows = Math.ceil(h / SPACING) + 1
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx!.clearRect(0, 0, w, h)

      const dotColor = themeRef.current === 'dark'
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(0,0,0,0.10)'
      ctx!.fillStyle = dotColor

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx!.beginPath()
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x  = c * SPACING
          const y  = r * SPACING
          const dx = x - mx
          const dy = y - my
          const dist   = Math.sqrt(dx * dx + dy * dy)
          const factor = Math.pow(Math.max(0, 1 - dist / INFLUENCE), 2)
          const radius = BASE_R + (MAX_R - BASE_R) * factor
          ctx!.moveTo(x + radius, y)
          ctx!.arc(x, y, radius, 0, Math.PI * 2)
        }
      }
      ctx!.fill()

      rafId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 100)
    }

    setup()
    draw()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
