import React, { useEffect, useRef } from 'react'

export default function MarketHeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId
    let isVisible = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0

    // Offscreen canvas to cache static background glow and perspective grid
    const bgCanvas = document.createElement('canvas')
    const bgCtx = bgCanvas.getContext('2d')

    // Pre-allocated gradient caches (re-calculated only on resize, NEVER per frame)
    let volGradUp = null
    let volGradDown = null
    let lineGrad = null
    let fillGrad = null

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      // Resize and pre-render the static background offscreen canvas
      bgCanvas.width = canvas.width
      bgCanvas.height = canvas.height
      bgCtx.setTransform(1, 0, 0, 1, 0, 0)
      bgCtx.scale(dpr, dpr)

      // 1. Draw static background base (#060709)
      bgCtx.fillStyle = '#060709'
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
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.11)')
      radialGlow.addColorStop(0.45, 'rgba(180, 140, 45, 0.045)')
      radialGlow.addColorStop(0.8, 'rgba(120, 90, 25, 0.012)')
      radialGlow.addColorStop(1, 'rgba(6, 7, 9, 0)')
      bgCtx.fillStyle = radialGlow
      bgCtx.fillRect(0, 0, width, height)

      // 3. Draw static perspective digital grid
      const gridCols = 18
      const gridRows = 10
      bgCtx.lineWidth = 1

      for (let c = 0; c <= gridCols; c++) {
        const x = (width / gridCols) * c
        const colAlpha = Math.max(0.01, (c / gridCols) * 0.04)
        bgCtx.strokeStyle = `rgba(180, 145, 75, ${colAlpha})`
        bgCtx.beginPath()
        bgCtx.moveTo(x, 0)
        bgCtx.lineTo(x, height)
        bgCtx.stroke()
      }

      for (let r = 0; r <= gridRows; r++) {
        const y = (height / gridRows) * r
        bgCtx.strokeStyle = 'rgba(180, 145, 75, 0.02)'
        bgCtx.beginPath()
        bgCtx.moveTo(0, y)
        bgCtx.lineTo(width, y)
        bgCtx.stroke()
      }

      // Pre-compute gradients for dynamic elements (0 allocation per frame!)
      volGradUp = ctx.createLinearGradient(0, height * 0.72, 0, height)
      volGradUp.addColorStop(0, 'rgba(212, 175, 55, 0.38)')
      volGradUp.addColorStop(0.7, 'rgba(140, 110, 45, 0.15)')
      volGradUp.addColorStop(1, 'rgba(6, 7, 9, 0)')

      volGradDown = ctx.createLinearGradient(0, height * 0.72, 0, height)
      volGradDown.addColorStop(0, 'rgba(160, 125, 60, 0.28)')
      volGradDown.addColorStop(0.7, 'rgba(100, 80, 35, 0.1)')
      volGradDown.addColorStop(1, 'rgba(6, 7, 9, 0)')

      lineGrad = ctx.createLinearGradient(0, 0, width, 0)
      lineGrad.addColorStop(0, 'rgba(180, 140, 50, 0.04)')
      lineGrad.addColorStop(0.38, 'rgba(212, 175, 55, 0.35)')
      lineGrad.addColorStop(0.72, 'rgba(243, 229, 171, 0.85)')
      lineGrad.addColorStop(1, 'rgba(255, 238, 179, 1.0)')

      fillGrad = ctx.createLinearGradient(0, height * 0.18, 0, height)
      fillGrad.addColorStop(0, 'rgba(212, 175, 55, 0.07)')
      fillGrad.addColorStop(0.65, 'rgba(140, 105, 35, 0.012)')
      fillGrad.addColorStop(1, 'rgba(6, 7, 9, 0)')
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // 1. DATA PARTICLES
    const PARTICLE_COUNT = 45
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        size: Math.random() * 1.6 + 0.6,
        speedY: Math.random() * 0.35 + 0.1,
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

      const close = isUp ? open + bodyDelta : Math.max(20, open - bodyDelta)
      state.currentPrice = close

      const topOfBody = Math.max(open, close)
      const bottomOfBody = Math.min(open, close)

      const upperWick = Math.random() < 0.15 ? Math.random() * 15 + 8 : Math.random() * 6 + 1.2
      const lowerWick = Math.random() < 0.15 ? Math.random() * 15 + 8 : Math.random() * 6 + 1.2

      const high = topOfBody + upperWick
      const low = Math.max(10, bottomOfBody - lowerWick)
      const volume = (bodyDelta * 3.5 + upperWick + lowerWick) * (0.8 + Math.random() * 0.6)

      return { open, close, high, low, isUp, volume }
    }

    const initCandleSeries = () => {
      candles = []
      let price = currentWaveState.currentPrice
      for (let i = 0; i < TOTAL_CANDLES; i++) {
        const c = generateNextCandle(price, currentWaveState)
        candles.push(c)
        price = c.close
      }
    }
    initCandleSeries()

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

    // Constant colors to avoid string interpolation GC spikes
    const WICK_UP_COLOR = 'rgba(243, 229, 171, 0.75)'
    const WICK_DOWN_COLOR = 'rgba(180, 145, 80, 0.45)'
    const BODY_UP_FILL = 'rgba(229, 192, 123, 0.82)'
    const BODY_UP_STROKE = 'rgba(255, 238, 179, 0.9)'
    const BODY_DOWN_FILL = 'rgba(28, 23, 17, 0.85)'
    const BODY_DOWN_STROKE = 'rgba(165, 130, 68, 0.65)'
    const AURA_UP_FILL = 'rgba(212, 175, 55, 0.15)'
    const AURA_DOWN_FILL = 'rgba(40, 32, 22, 0.2)'
    const PARTICLE_COLOR = 'rgba(220, 185, 100, 0.35)'
    const NODE_OUTER_COLOR = 'rgba(212, 175, 55, 0.8)'
    const NODE_INNER_COLOR = 'rgba(255, 248, 220, 0.9)'

    // HIGH-PERFORMANCE 60FPS RENDER LOOP
    const render = (now) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const elapsed = Math.min(now - lastTime, 100)
      lastTime = now

      tickTime += elapsed
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

      ctx.fillStyle = volGradUp || 'rgba(212, 175, 55, 0.3)'
      for (let i = 0; i < volBarCount; i++) {
        const c = candles[i]
        if (c.isUp) {
          const x = i * volWidth + volWidth * 0.8
          const barH = Math.min(height * 0.24, Math.max(8, c.volume * 1.8 + (Math.sin(pulseAngle + i) * 3)))
          ctx.fillRect(x, height - barH, barDrawWidth, barH)
        }
      }

      ctx.fillStyle = volGradDown || 'rgba(160, 125, 60, 0.25)'
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

      // --- 4. RENDER HIGH-FIDELITY CANDLESTICKS ---
      for (let idx = 0; idx < TOTAL_CANDLES; idx++) {
        const c = candles[idx]
        const x = idx * candleSpacing + candleSpacing * 1.4

        const openY = chartBottom - (c.open - minP) * scaleFactor
        const closeY = chartBottom - (c.close - minP) * scaleFactor
        const highY = chartBottom - (c.high - minP) * scaleFactor
        const lowY = chartBottom - (c.low - minP) * scaleFactor

        const topY = Math.min(openY, closeY)
        const bottomY = Math.max(openY, closeY)
        const bodyHeight = Math.max(Math.abs(openY - closeY), 2.5)

        trendPoints[idx].x = x
        trendPoints[idx].y = chartBottom - ((c.close * 0.75 + (c.high + c.low) * 0.125) - minP) * scaleFactor

        // Draw wicks
        ctx.lineWidth = 1.1
        ctx.strokeStyle = c.isUp ? WICK_UP_COLOR : WICK_DOWN_COLOR
        ctx.beginPath()
        ctx.moveTo(x, highY)
        ctx.lineTo(x, topY)
        ctx.moveTo(x, bottomY)
        ctx.lineTo(x, lowY)
        ctx.stroke()

        // Soft holographic atmospheric aura
        if (idx > 22) {
          ctx.fillStyle = c.isUp ? AURA_UP_FILL : AURA_DOWN_FILL
          ctx.fillRect(x - candleBodyW / 2 - 2, topY - 2, candleBodyW + 4, bodyHeight + 4)
        }

        // Rectangular Body
        if (c.isUp) {
          ctx.fillStyle = BODY_UP_FILL
          ctx.fillRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
          ctx.strokeStyle = BODY_UP_STROKE
          ctx.lineWidth = 1
          ctx.strokeRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
        } else {
          ctx.fillStyle = BODY_DOWN_FILL
          ctx.fillRect(x - candleBodyW / 2, topY, candleBodyW, bodyHeight)
          ctx.strokeStyle = BODY_DOWN_STROKE
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

        ctx.save()
        ctx.strokeStyle = lineGrad || '#d4af37'
        ctx.lineWidth = 2.2
        ctx.stroke()
        ctx.restore()

        ctx.lineTo(trendPoints[TOTAL_CANDLES - 1].x, height)
        ctx.lineTo(trendPoints[0].x, height)
        ctx.closePath()
        ctx.fillStyle = fillGrad || 'rgba(212, 175, 55, 0.05)'
        ctx.fill()

        const pivotStep = 7
        for (let i = 5; i < TOTAL_CANDLES; i += pivotStep) {
          const pt = trendPoints[i]
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 3.6, 0, Math.PI * 2)
          ctx.fillStyle = NODE_OUTER_COLOR
          ctx.fill()

          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = NODE_INNER_COLOR
          ctx.fill()
        }

        const lastPt = trendPoints[TOTAL_CANDLES - 1]
        if (lastPt) {
          const pulse = Math.sin(pulseAngle) * 2.5 + 5
          ctx.beginPath()
          ctx.arc(lastPt.x, lastPt.y, 18, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(212, 175, 55, 0.18)'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(lastPt.x, lastPt.y, pulse, 0, Math.PI * 2)
          ctx.fillStyle = '#fff9e6'
          ctx.fill()
        }
      }

      // --- 6. FLOATING PARTICLES (BATCHED PATH) ---
      ctx.fillStyle = PARTICLE_COLOR
      ctx.beginPath()
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i]
        if (!prefersReducedMotion) {
          p.y -= p.speedY
          p.x += p.speedX
          if (p.y < 0) p.y = height
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
        }
        ctx.moveTo(p.x + p.size, p.y)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      }
      ctx.fill()

      // --- 7. DIGITAL COORDINATE ANNOTATIONS ---
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(212, 175, 55, 0.35)'
      for (let i = 0; i < coordinateNodes.length; i++) {
        const node = coordinateNodes[i]
        ctx.fillText(node.text, node.rx * width, node.ry * height)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
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
        className="w-full h-full block"
        style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }}
      />

      {/* 2. Seamless Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/85 sm:via-[#060709]/75 to-transparent to-[75%] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060709] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060709] via-[#060709]/60 to-transparent pointer-events-none" />
    </div>
  )
}
