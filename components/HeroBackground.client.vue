<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let raf = null
let _cleanup = null
let _ro = null

onMounted(() => {
  const c = canvas.value
  if (!c) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const ctx = c.getContext('2d')
  if (!ctx) return

  const CONNECT_DIST = 130
  const MOUSE_DIST   = 100
  const SPEED        = 0.35

  let W = 0, H = 0, dots = []
  let mouse = { x: -9999, y: -9999 }

  function init(w, h) {
    W = c.width  = w
    H = c.height = h
    const count = Math.floor((W * H) / 14000)
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }))
  }

  function resize() {
    const rect = c.getBoundingClientRect()
    const w = Math.round(rect.width)
    const h = Math.round(rect.height)
    if (w === 0 || h === 0 || (w === W && h === H)) return
    const prevW = W, prevH = H
    W = c.width  = w
    H = c.height = h
    const count = Math.floor((W * H) / 14000)
    // Scale existing dot positions to new size, preserve velocities
    if (prevW > 0 && prevH > 0) {
      for (const d of dots) {
        d.x = (d.x / prevW) * W
        d.y = (d.y / prevH) * H
      }
    }
    while (dots.length < count) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      })
    }
    dots.length = count
  }

  function draw() {
    raf = requestAnimationFrame(draw)
    if (W === 0 || H === 0 || dots.length === 0) return
    ctx.clearRect(0, 0, W, H)

    for (const d of dots) {
      const dx = d.x - mouse.x
      const dy = d.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_DIST && dist > 0) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.4
        d.vx += (dx / dist) * force
        d.vy += (dy / dist) * force
      }

      d.x += d.vx
      d.y += d.vy

      const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy)
      if (spd > SPEED * 3) { d.vx *= 0.9; d.vy *= 0.9 }

      if (d.x < 0 || d.x > W) d.vx *= -1
      if (d.y < 0 || d.y > H) d.vy *= -1
      d.x = Math.max(0, Math.min(W, d.x))
      d.y = Math.max(0, Math.min(H, d.y))
    }

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x
        const dy = dots[i].y - dots[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.25
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.strokeStyle = `rgba(100,89,200,${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    for (const d of dots) {
      ctx.beginPath()
      ctx.arc(d.x, d.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(155,148,224,0.5)'
      ctx.fill()
    }

    if (mouse.x > 0 && mouse.x < W) {
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(29,158,117,0.12)'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#1D9E75'
      ctx.fill()

      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.4
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(d.x, d.y)
          ctx.strokeStyle = `rgba(29,158,117,${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
  }

  const section = c.closest('section')
  const onMouseMove = (e) => {
    const rect = c.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

  if (section) {
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
  }

  _ro = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    const { width, height } = entry.contentRect
    const w = Math.round(width)
    const h = Math.round(height)
    if (w === 0 || h === 0) return
    if (W === 0) {
      init(w, h)
      draw()
    } else {
      resize()
    }
  })
  _ro.observe(c)

  // ResizeObserver always fires once synchronously on observe() in spec,
  // but some browsers defer it. Force init immediately if size is already known.
  if (W === 0) {
    const rect = c.getBoundingClientRect()
    const w = Math.round(rect.width)
    const h = Math.round(rect.height)
    if (w > 0 && h > 0) {
      init(w, h)
      draw()
    }
  }

  _cleanup = () => {
    cancelAnimationFrame(raf)
    if (_ro) { _ro.disconnect(); _ro = null }
    if (section) {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }
})

onUnmounted(() => {
  _cleanup?.()
  _cleanup = null
})
</script>
