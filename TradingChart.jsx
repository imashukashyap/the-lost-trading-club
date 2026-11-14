import React, { useEffect, useRef } from 'react'

export default function TradingChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let isVisible = true

    // Retina display resolution scaling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Candle data generator
    const CANDLE_WIDTH = 8
    const CANDLE_GAP = 14
    const TOTAL_SLOTS = 45

    let basePrice = 2840
    const candles = []

    // Seed initial historical candles
    let currentPrice = basePrice
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      const change = (Math.random() - 0.48) * 4.5
      const open = currentPrice
      const close = open + change
      const high = Math.max(open, close) + Math.random() * 3
      const low = Math.min(open, close) - Math.random() * 3
      candles.push({ open, close, high, low })
      currentPrice = close
    }

    let tickCounter = 0
    let lastTickTime = performance.now()
    let pulseRadius = 0

    // Main animation loop
    const render = (time) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Time-based tick for price fluctuation
      const delta = time - lastTickTime
      if (delta > 80) {
        lastTickTime = time
        tickCounter++

        // Fluctuating current candle
        const current = candles[candles.length - 1]
        const jitter = (Math.random() - 0.49) * 0.9
        current.close += jitter
        current.high = Math.max(current.high, current.close)
        current.low = Math.min(current.low, current.close)

        // Every 35 ticks (~2.8s), finalize candle and start a new one
        if (tickCounter > 35) {
          tickCounter = 0
          candles.shift() // remove oldest
          const nextOpen = current.close
          const nextChange = (Math.random() - 0.47) * 3.5
          const nextClose = nextOpen + nextChange
          candles.push({
            open: nextOpen,
            close: nextClose,
            high: Math.max(nextOpen, nextClose) + Math.random() * 2,
            low: Math.min(nextOpen, nextClose) - Math.random() * 2,
          })
        }
      }

      // Calculate price domain (min & max for vertical scaling)
      let minPrice = Infinity
      let maxPrice = -Infinity
      for (let c of candles) {
        if (c.low < minPrice) minPrice = c.low
        if (c.high > maxPrice) maxPrice = c.high
      }
      const padding = (maxPrice - minPrice) * 0.18 || 10
      minPrice -= padding
      maxPrice += padding
      const priceRange = maxPrice - minPrice

      const getY = (val) => {
        return height - ((val - minPrice) / priceRange) * (height * 0.78) - height * 0.1
      }

      // 1. Draw subtle horizontal grid price levels
      const gridLevels = 5
      ctx.lineWidth = 1
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.textAlign = 'right'

      for (let i = 0; i <= gridLevels; i++) {
        const p = minPrice + (priceRange / gridLevels) * i
        const y = getY(p)

        // Grid line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)'
        ctx.beginPath()
        ctx.moveTo(30, y)
        ctx.lineTo(width - 55, y)
        ctx.stroke()

        // Subtle price label
        ctx.fillStyle = 'rgba(212, 175, 55, 0.35)'
        ctx.fillText(p.toFixed(1), width - 10, y + 3)
      }

      // 2. Draw candlesticks
      const startX = width - candles.length * (CANDLE_WIDTH + CANDLE_GAP) - 70

      candles.forEach((c, index) => {
        const x = startX + index * (CANDLE_WIDTH + CANDLE_GAP)
        if (x < -20 || x > width + 20) return

        const isUp = c.close >= c.open
        const openY = getY(c.open)
        const closeY = getY(c.close)
        const highY = getY(c.high)
        const lowY = getY(c.low)

        const top = Math.min(openY, closeY)
        const bodyHeight = Math.max(Math.abs(openY - closeY), 2)

        // Wick
        ctx.lineWidth = 1.2
        ctx.strokeStyle = isUp ? 'rgba(212, 175, 55, 0.7)' : 'rgba(148, 163, 184, 0.45)'
        ctx.beginPath()
        ctx.moveTo(x + CANDLE_WIDTH / 2, highY)
        ctx.lineTo(x + CANDLE_WIDTH / 2, lowY)
        ctx.stroke()

        // Body
        if (isUp) {
          ctx.fillStyle = 'rgba(212, 175, 55, 0.22)'
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)'
        } else {
          ctx.fillStyle = 'rgba(30, 41, 59, 0.4)'
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)'
        }

        ctx.fillRect(x, top, CANDLE_WIDTH, bodyHeight)
        ctx.strokeRect(x, top, CANDLE_WIDTH, bodyHeight)
      })

      // 3. Golden Trend Spline / Moving Average
      ctx.beginPath()
      const linePoints = []
      candles.forEach((c, index) => {
        const x = startX + index * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_WIDTH / 2
        // Smooth weighted price
        const price = c.close * 0.7 + (c.high + c.low) * 0.15
        const y = getY(price)
        linePoints.push({ x, y })
      })

      if (linePoints.length > 1) {
        ctx.moveTo(linePoints[0].x, linePoints[0].y)
        for (let i = 1; i < linePoints.length; i++) {
          const xc = (linePoints[i].x + linePoints[i - 1].x) / 2
          const yc = (linePoints[i].y + linePoints[i - 1].y) / 2
          ctx.quadraticCurveTo(linePoints[i - 1].x, linePoints[i - 1].y, xc, yc)
        }
        ctx.lineTo(linePoints[linePoints.length - 1].x, linePoints[linePoints.length - 1].y)

        // Spline Stroke
        ctx.save()
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)'
        ctx.lineWidth = 2
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)'
        ctx.shadowBlur = 12
        ctx.stroke()
        ctx.restore()

        // Soft Area Gradient beneath the line
        ctx.lineTo(linePoints[linePoints.length - 1].x, height)
        ctx.lineTo(linePoints[0].x, height)
        ctx.closePath()
        const areaGrad = ctx.createLinearGradient(0, height * 0.2, 0, height)
        areaGrad.addColorStop(0, 'rgba(212, 175, 55, 0.08)')
        areaGrad.addColorStop(1, 'rgba(212, 175, 55, 0.0)')
        ctx.fillStyle = areaGrad
        ctx.fill()
      }

      // 4. Live Price Point & Horizontal Guideline
      const lastPoint = linePoints[linePoints.length - 1]
      const lastCandle = candles[candles.length - 1]

      if (lastPoint && lastCandle) {
        const liveY = getY(lastCandle.close)

        // Horizontal dashed tracking line
        ctx.save()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(30, liveY)
        ctx.lineTo(width - 55, liveY)
        ctx.stroke()
        ctx.restore()

        // Pulsing live price dot
        pulseRadius = (pulseRadius + 0.15) % 8
        ctx.beginPath()
        ctx.arc(lastPoint.x, liveY, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#d4af37'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(lastPoint.x, liveY, 4 + pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0, 0.8 - pulseRadius / 8)})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Live Price Badge on the right axis
        const badgeWidth = 62
        const badgeHeight = 20
        const badgeX = width - 68
        const badgeY = liveY - badgeHeight / 2

        ctx.fillStyle = '#0f131a'
        ctx.strokeStyle = '#d4af37'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#f3e5ab'
        ctx.font = 'bold 10px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(lastCandle.close.toFixed(1), badgeX + badgeWidth / 2, badgeY + 13.5)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Pause animation when out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] flex items-center justify-center select-none overflow-hidden">
      {/* Cinematic Edge Masking for Seamless Blending into #060709 */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#060709] via-transparent to-[#060709]/80" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#060709] via-transparent to-[#060709]" />

      {/* Floating Chart Header Tag */}
      <div className="absolute top-6 right-8 z-20 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0c0e14]/70 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#d4af37]">
          LIVE ORDERFLOW • M1
        </span>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
