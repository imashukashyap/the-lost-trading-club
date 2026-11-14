import React, { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function MarketHeroBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark
  const handleResizeRef = useRef(null)

  useEffect(() => {
    if (handleResizeRef.current) {
      handleResizeRef.current()
    }
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    let animationFrameId
    let isVisible = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0

    // Offscreen canvas to cache static background glow and perspective grid
    const bgCanvas = document.createElement('canvas')
    const bgCtx = bgCanvas.getContext('2d', { alpha: false })

    // Pre-allocated gradient & color caches (re-calculated only on resize/theme change, NEVER per frame)
    let volGradUp = null
    let volGradDown = null
    let lineGrad = null
    let fillGrad = null
    let colors = {}

    const handleResize = () => {
      const dark = isDarkRef.current
      const rect = canvas.getBoundingClientRect()
      // Capping DPR at 1.25 gives crisp retina fidelity while preventing massive GPU fill-rate drops
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.font = '10px "JetBrains Mono", monospace'

      // Resize and pre-render the static background offscreen canvas
      bgCanvas.width = canvas.width
      bgCanvas.height = canvas.height
      bgCtx.setTransform(1, 0, 0, 1, 0, 0)
      bgCtx.scale(dpr, dpr)

      // 1. Draw static background base
      bgCtx.fillStyle = dark ? '#060709' : '#f8fafc'
      bgCtx.fillRect(0, 0, width, height)

      // 2. Draw static ambient radial glow on the right
      const radialGlow = bgCtx.createRadialGradient(
        width * 0.85,
        height * 0.35,
        30,
        width * 0.85,
        height * 0.4,
        width * 0.6
      )
      if (dark) {
        radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.11)')
        radialGlow.addColorStop(0.45, 'rgba(180, 140, 45, 0.045)')
        radialGlow.addColorStop(0.8, 'rgba(120, 90, 25, 0.012)')
        radialGlow.addColorStop(1, 'rgba(6, 7, 9, 0)')
      } else {
        radialGlow.addColorStop(0, 'rgba(37, 99, 235, 0.09)')
        radialGlow.addColorStop(0.45, 'rgba(59, 130, 246, 0.04)')
        radialGlow.addColorStop(0.8, 'rgba(96, 165, 250, 0.012)')
        radialGlow.addColorStop(1, 'rgba(248, 250, 252, 0)')
      }
      bgCtx.fillStyle = radialGlow
      bgCtx.fillRect(0, 0, width, height)

      // 3. Draw static perspective digital grid
      const gridCols = 18
      const gridRows = 10
      bgCtx.lineWidth = 1

      for (let c = 0; c <= gridCols; c++) {
        const x = (width / gridCols) * c
        const colAlpha = Math.max(0.01, (c / gridCols) * 0.04)
        bgCtx.strokeStyle = dark
          ? `rgba(180, 145, 75, ${colAlpha})`
          : `rgba(37, 99, 235, ${colAlpha * 0.85})`
        bgCtx.beginPath()
        bgCtx.moveTo(x, 0)
        bgCtx.lineTo(x, height)
        bgCtx.stroke()
      }

      for (let r = 0; r <= gridRows; r++) {
        const y = (height / gridRows) * r
        bgCtx.strokeStyle = dark ? 'rgba(180, 145, 75, 0.02)' : 'rgba(37, 99, 235, 0.025)'
        bgCtx.beginPath()
        bgCtx.moveTo(0, y)
        bgCtx.lineTo(width, y)
        bgCtx.stroke()
      }

      // Pre-compute gradients for dynamic elements (0 allocation per frame!)
      volGradUp = ctx.createLinearGradient(0, height * 0.72, 0, height)
      if (dark) {
        volGradUp.addColorStop(0, 'rgba(212, 175, 55, 0.38)')
        volGradUp.addColorStop(0.7, 'rgba(140, 110, 45, 0.15)')
        volGradUp.addColorStop(1, 'rgba(6, 7, 9, 0)')
      } else {
        volGradUp.addColorStop(0, 'rgba(37, 99, 235, 0.35)')
        volGradUp.addColorStop(0.7, 'rgba(37, 99, 235, 0.12)')
        volGradUp.addColorStop(1, 'rgba(248, 250, 252, 0)')
      }

      volGradDown = ctx.createLinearGradient(0, height * 0.72, 0, height)
      if (dark) {
        volGradDown.addColorStop(0, 'rgba(160, 125, 60, 0.28)')
        volGradDown.addColorStop(0.7, 'rgba(100, 80, 35, 0.1)')
        volGradDown.addColorStop(1, 'rgba(6, 7, 9, 0)')
      } else {
        volGradDown.addColorStop(0, 'rgba(30, 64, 175, 0.22)')
        volGradDown.addColorStop(0.7, 'rgba(30, 64, 175, 0.08)')
        volGradDown.addColorStop(1, 'rgba(248, 250, 252, 0)')
      }

      lineGrad = ctx.createLinearGradient(0, 0, width, 0)
      if (dark) {
        lineGrad.addColorStop(0, 'rgba(180, 140, 50, 0.04)')
        lineGrad.addColorStop(0.38, 'rgba(212, 175, 55, 0.35)')
        lineGrad.addColorStop(0.72, 'rgba(243, 229, 171, 0.85)')
        lineGrad.addColorStop(1, 'rgba(255, 238, 179, 1.0)')
      } else {
        lineGrad.addColorStop(0, 'rgba(37, 99, 235, 0.06)')
        lineGrad.addColorStop(0.38, 'rgba(37, 99, 235, 0.45)')
        lineGrad.addColorStop(0.72, 'rgba(29, 78, 216, 0.85)')
        lineGrad.addColorStop(1, 'rgba(30, 58, 138, 1.0)')
      }

      fillGrad = ctx.createLinearGradient(0, height * 0.18, 0, height)
      if (dark) {
        fillGrad.addColorStop(0, 'rgba(212, 175, 55, 0.07)')
        fillGrad.addColorStop(0.65, 'rgba(140, 105, 35, 0.012)')
        fillGrad.addColorStop(1, 'rgba(6, 7, 9, 0)')
      } else {
        fillGrad.addColorStop(0, 'rgba(37, 99, 235, 0.07)')
        fillGrad.addColorStop(0.65, 'rgba(59, 130, 246, 0.012)')
        fillGrad.addColorStop(1, 'rgba(248, 250, 252, 0)')
      }

      // Pre-compute constant color strings (0 allocation per frame!)
      colors = {
        wickUp: dark ? 'rgba(243, 229, 171, 0.75)' : 'rgba(37, 99, 235, 0.8)',
        wickDown: dark ? 'rgba(180, 145, 80, 0.45)' : 'rgba(30, 64, 175, 0.45)',
        bodyUpFill: dark ? 'rgba(229, 192, 123, 0.82)' : 'rgba(59, 130, 246, 0.85)',
        bodyUpStroke: dark ? 'rgba(255, 238, 179, 0.9)' : 'rgba(29, 78, 216, 0.95)',
        bodyDownFill: dark ? 'rgba(28, 23, 17, 0.85)' : 'rgba(219, 234, 254, 0.85)',
        bodyDownStroke: dark ? 'rgba(165, 130, 68, 0.65)' : 'rgba(37, 99, 235, 0.65)',
        auraUpFill: dark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(37, 99, 235, 0.18)',
        auraDownFill: dark ? 'rgba(40, 32, 22, 0.2)' : 'rgba(147, 197, 253, 0.22)',
        particleColor: dark ? 'rgba(220, 185, 100, 0.35)' : 'rgba(37, 99, 235, 0.32)',
        nodeOuterColor: dark ? 'rgba(212, 175, 55, 0.8)' : 'rgba(37, 99, 235, 0.85)',
        nodeInnerColor: dark ? 'rgba(255, 248, 220, 0.9)' : 'rgba(239, 246, 255, 0.95)',
        pulseAura: dark ? 'rgba(212, 175, 55, 0.14)' : 'rgba(37, 99, 235, 0.15)',
        coordText: dark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(37, 99, 235, 0.45)',
      }
    }

    handleResizeRef.current = handleResize
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // 1. DATA PARTICLES
    const PARTICLE_COUNT = 40
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        size: Math.random() * 1.5 + 0.6,
        speedY: Math.random() * 0.32 + 0.1,
        speedX: (Math.random() - 0.48) * 0.2,
      })
    }

    // 2. REALISTIC OHLC MARKET CYCLE ENGINE
    const TOTAL_CANDLES = 58
    let candles = []
    let currentWaveState = {
      trend: 1,
      barsLeftInLeg: 6,
      currentPrice: 150,
      baseAnchor: 150,
    }

    const generateNextCandle = (prevClose, state) => {
      state.barsLeftInLeg--
      if (state.barsLeftInLeg <= 0) {
        const rand = Math.random()
        if (rand < 0.45) {
          state.trend = 1
          state.barsLeftInLeg = Math.floor(Math.random() * 6) + 4
        } else if (rand < 0.8) {
          state.trend = -1
          state.barsLeftInLeg = Math.floor(Math.random() * 5) + 3
        } else {
          state.trend = 0
          state.barsLeftInLeg = Math.floor(Math.random() * 4) + 3
        }
      }

      const distance = state.currentPrice - state.baseAnchor
      let bias = state.trend * 2.8
      if (distance > 65) bias -= 3.5
      if (distance < -50) bias += 3.5

      const open = prevClose
      const isUp = state.trend === 1 ? Math.random() > 0.28 : state.trend === -1 ? Math.random() < 0.32 : Math.random() > 0.5

      const sizeRand = Math.random()
      let bodyDelta = 0
      if (sizeRand < 0.2) {
        bodyDelta = Math.random() * 2.5 + 0.5
      } else if (sizeRand < 0.8) {
        bodyDelta = Math.random() * 7.5 + 3.0
      } else {
        bodyDelta = Math.random() * 14.0 + 8.0
      }

      const change = (isUp ? 1 : -1) * bodyDelta + (Math.random() - 0.5) * 1.5 + bias * 0.4
      const close = open + change
      state.currentPrice = close

      const upperWick = Math.random() * (bodyDelta * 0.75 + 3.5)
      const lowerWick = Math.random() * (bodyDelta * 0.75 + 3.5)
      const high = Math.max(open, close) + upperWick
      const low = Math.min(open, close) - lowerWick

      const volume = Math.max(10, Math.min(65, (bodyDelta * 2.8) + (upperWick + lowerWick) * 1.5 + Math.random() * 15))

      return { open, high, low, close, isUp, volume }
    }

    // Seed realistic multi-cycle market wave
    let p = 145
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      const c = generateNextCandle(p, currentWaveState)
      candles.push(c)
      p = c.close
    }

    const coordinateNodes = [
      { rx: 0.46, ry: 0.22, text: '26.417' },
      { rx: 0.65, ry: 0.18, text: '63.772' },
      { rx: 0.82, ry: 0.32, text: '31.012' },
      { rx: 0.93, ry: 0.44, text: '▲ 62.037' },
    ]

    let tickTime = 0
    let lastTime = performance.now()
    let pulseAngle = 0

    // Pre-allocated points array to avoid memory allocation every frame
    const trendPoints = new Array(TOTAL_CANDLES)
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      trendPoints[i] = { x: 0, y: 0 }
    }

    // HIGH-PERFORMANCE 60FPS CAPPED RENDER LOOP
    const render = (now) => {
      // 1. True pause: when offscreen, DO NOT schedule another frame!
      if (!isVisible) {
        return
      }

      // 2. Frame limiter: smooth 60 FPS cap on high-refresh (90Hz/120Hz/144Hz) monitors
      const delta = now - lastTime
      if (delta < 15) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastTime = now

      tickTime += delta
      pulseAngle += 0.03

      if (!prefersReducedMotion && tickTime > 90) {
        tickTime = 0

        const active = candles[candles.length - 1]
        const jitter = (Math.random() - 0.48) * 1.1
        active.close += jitter
        active.high = Math.max(active.high, active.close + Math.random() * 0.8)
        active.low = Math.min(active.low, active.close - Math.random() * 0.8)
        active.isUp = active.close >= active.open

        if (Math.random() < 0.048) {
          candles.shift()
          const next = generateNextCandle(active.close, currentWaveState)
          candles.push(next)
        }
      }

      // --- 1. BLIT PRE-RENDERED STATIC BACKGROUND ---
      ctx.drawImage(bgCanvas, 0, 0, width, height)

      // --- 2. DYNAMIC VOLUME BARS (BOTTOM OF SCREEN) ---
      const volBarCount = candles.length
      const volWidth = width / (volBarCount + 2)
      const barDrawWidth = Math.max(1.8, volWidth * 0.65)

      // Group volume bars by up/down to minimize context state changes
      ctx.fillStyle = volGradUp
      for (let i = 0; i < volBarCount; i++) {
        const c = candles[i]
        if (c.isUp) {
          const x = i * volWidth + volWidth * 0.8
          const barH = Math.min(height * 0.24, Math.max(8, c.volume * 1.8 + (Math.sin(pulseAngle + i) * 3)))
          ctx.fillRect(x, height - barH, barDrawWidth, barH)
        }
      }

      ctx.fillStyle = volGradDown
      for (let i = 0; i < volBarCount; i++) {
        const c = candles[i]
        if (!c.isUp) {
          const x = i * volWidth + volWidth * 0.8
          const barH = Math.min(height * 0.24, Math.max(8, c.volume * 1.8 + (Math.sin(pulseAngle + i) * 3)))
          ctx.fillRect(x, height - barH, barDrawWidth, barH)
        }
      }

      // --- 3. CANDLESTICK CALCULATIONS (FULL VERTICAL COVERAGE) ---
      let minP = Infinity
      let maxP = -Infinity
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i]
        if (c.low < minP) minP = c.low
        if (c.high > maxP) maxP = c.high
      }

      const padding = (maxP - minP) * 0.12 || 15
      minP -= padding
      maxP += padding
      const pSpan = maxP - minP

      const chartTop = height * 0.12
      const chartBottom = height * 0.82
      const chartHeight = chartBottom - chartTop
      const scaleFactor = chartHeight / pSpan

      const candleSpacing = width / (TOTAL_CANDLES + 2)
      const candleBodyW = Math.max(3.2, Math.min(9.5, candleSpacing * 0.62))

      // --- 4. BATCH RENDER HIGH-FIDELITY CANDLESTICKS ---
      // Batch UP wicks in one draw call
      ctx.lineWidth = 1.1
      ctx.strokeStyle = colors.wickUp
      ctx.beginPath()
      for (let idx = 0; idx < TOTAL_CANDLES; idx++) {
        const c = candles[idx]
        if (c.isUp) {
          const x = idx * candleSpacing + candleSpacing * 1.4
          const openY = chartBottom - (c.open - minP) * scaleFactor
          const closeY = chartBottom - (c.close - minP) * scaleFactor
          const highY = chartBottom - (c.high - minP) * scaleFactor
          const lowY = chartBottom - (c.low - minP) * scaleFactor
          const topY = Math.min(openY, closeY)
          const bottomY = Math.max(openY, closeY)
          ctx.moveTo(x, highY)
          ctx.lineTo(x, topY)
          ctx.moveTo(x, bottomY)
          ctx.lineTo(x, lowY)
        }
      }
      ctx.stroke()

      // Batch DOWN wicks in one draw call
      ctx.strokeStyle = colors.wickDown
      ctx.beginPath()
      for (let idx = 0; idx < TOTAL_CANDLES; idx++) {
        const c = candles[idx]
        if (!c.isUp) {
          const x = idx * candleSpacing + candleSpacing * 1.4
          const openY = chartBottom - (c.open - minP) * scaleFactor
          const closeY = chartBottom - (c.close - minP) * scaleFactor
          const highY = chartBottom - (c.high - minP) * scaleFactor
          const lowY = chartBottom - (c.low - minP) * scaleFactor
          const topY = Math.min(openY, closeY)
          const bottomY = Math.max(openY, closeY)
          ctx.moveTo(x, highY)
          ctx.lineTo(x, topY)
          ctx.moveTo(x, bottomY)
          ctx.lineTo(x, lowY)
        }
      }
      ctx.stroke()

      // Render Candle Auras & Bodies
      for (let idx = 0; idx < TOTAL_CANDLES; idx++) {
        const c = candles[idx]
        const x = idx * candleSpacing + candleSpacing * 1.4

        const openY = chartBottom - (c.open - minP) * scaleFactor
        const closeY = chartBottom - (c.close - minP) * scaleFactor
        const topY = Math.min(openY, closeY)
        const bodyHeight = Math.max(Math.abs(openY - closeY), 2.5)

        trendPoints[idx].x = x
        trendPoints[idx].y = chartBottom - ((c.close * 0.75 + (c.high + c.low) * 0.125) - minP) * scaleFactor

        // Soft atmospheric aura
        if (idx > 22) {
          ctx.fillStyle = c.isUp ? colors.auraUpFill : colors.auraDownFill
          ctx.fillRect(x - candleBodyW / 2 - 2, topY - 2, candleBodyW + 4, bodyHeight + 4)
        }

        // Rectangular Body
        if (c.isUp) {
          ctx.fillStyle = colors.bodyUpFill
          ctx.fillRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
          ctx.strokeStyle = colors.bodyUpStroke
          ctx.lineWidth = 1
          ctx.strokeRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
        } else {
          ctx.fillStyle = colors.bodyDownFill
          ctx.fillRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
          ctx.strokeStyle = colors.bodyDownStroke
          ctx.lineWidth = 1
          ctx.strokeRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
        }
      }

      // --- 5. GLOWING PRICE SPLINE ---
      if (TOTAL_CANDLES > 2) {
        ctx.beginPath()
        ctx.moveTo(trendPoints[0].x, trendPoints[0].y)
        for (let i = 1; i < TOTAL_CANDLES; i++) {
          const prev = trendPoints[i - 1]
          const curr = trendPoints[i]
          const midX = (prev.x + curr.x) * 0.5
          const midY = (prev.y + curr.y) * 0.5
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
        }
        ctx.lineTo(trendPoints[TOTAL_CANDLES - 1].x, trendPoints[TOTAL_CANDLES - 1].y)

        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 2.2
        ctx.stroke()

        // Spline Area Gradient Fill beneath curve
        ctx.lineTo(trendPoints[TOTAL_CANDLES - 1].x, height)
        ctx.lineTo(trendPoints[0].x, height)
        ctx.closePath()
        ctx.fillStyle = fillGrad
        ctx.fill()

        // Glowing live price node at final candle
        const lastPt = trendPoints[TOTAL_CANDLES - 1]
        const pulse = Math.sin(pulseAngle * 2.5) * 2.5

        ctx.beginPath()
        ctx.arc(lastPt.x, lastPt.y, 9 + pulse, 0, Math.PI * 2)
        ctx.fillStyle = colors.pulseAura
        ctx.fill()

        ctx.beginPath()
        ctx.arc(lastPt.x, lastPt.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = colors.nodeOuterColor
        ctx.fill()

        ctx.beginPath()
        ctx.arc(lastPt.x, lastPt.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = colors.nodeInnerColor
        ctx.fill()
      }

      // --- 6. FLOATING DUST PARTICLES ---
      ctx.fillStyle = colors.particleColor
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i]
        p.y -= p.speedY
        p.x += p.speedX

        if (p.y < 0) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // --- 7. DIGITAL COORDINATE ANNOTATIONS ---
      ctx.fillStyle = colors.coordText
      for (let i = 0; i < coordinateNodes.length; i++) {
        const node = coordinateNodes[i]
        ctx.fillText(node.text, node.rx * width, node.ry * height)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // WAKE/PAUSE OBSERVER: 100% idle when off-screen, zero battery/CPU overhead
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !wasVisible) {
          lastTime = performance.now()
          cancelAnimationFrame(animationFrameId)
          animationFrameId = requestAnimationFrame(render)
        }
      },
      { threshold: 0.02 }
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      {/* 1. Underlying High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-60 sm:opacity-100 transition-opacity duration-300"
        style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }}
      />

      {/* 2. Seamless Gradient Overlays */}
      {/* Mobile Subtle Vignette */}
      <div
        className="absolute inset-0 sm:hidden pointer-events-none transition-all duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 95% 65% at 50% 50%, rgba(6, 7, 9, 0.90) 0%, rgba(6, 7, 9, 0.60) 60%, rgba(6, 7, 9, 0.25) 100%)'
            : 'radial-gradient(ellipse 95% 65% at 50% 50%, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.60) 60%, rgba(248, 250, 252, 0.25) 100%)',
        }}
      />

      {/* Desktop Directional Fade */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/85 to-transparent to-[75%] dark:from-[#060709] dark:via-[#060709]/85 dark:sm:via-[#060709]/75 dark:to-transparent pointer-events-none transition-colors duration-300" />

      {/* Top and Bottom Fades */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-16 bg-gradient-to-t from-[#f8fafc] dark:from-[#060709] to-transparent pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/60 dark:from-[#060709] dark:via-[#060709]/60 to-transparent pointer-events-none transition-colors duration-300" />
    </div>
  )
}
