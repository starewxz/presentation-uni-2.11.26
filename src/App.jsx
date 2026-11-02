import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { slides } from './slides.jsx'
import { LightboxContext, SlideNo } from './ui.jsx'

const W = 1920
const H = 1080

function useStageScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

const initialIndex = () => {
  const n = parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0
}

export default function App() {
  const scale = useStageScale()
  const [index, setIndex] = useState(initialIndex)
  const [dir, setDir] = useState(1)
  const [overview, setOverview] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const total = slides.length

  const go = useCallback(
    (to) => {
      const next = Math.max(0, Math.min(total - 1, to))
      setIndex((cur) => {
        if (next !== cur) setDir(next > cur ? 1 : -1)
        return next
      })
    },
    [total]
  )

  useEffect(() => {
    window.history.replaceState(null, '', `#${index + 1}`)
  }, [index])

  useEffect(() => {
    const onHash = () => go(initialIndex())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) {
        if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') setLightbox(null)
        return
      }
      if (overview) {
        if (e.key === 'Escape' || e.key.toLowerCase() === 'g') setOverview(false)
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault()
          go(index + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault()
          go(index - 1)
          break
        case 'Home':
          go(0)
          break
        case 'End':
          go(total - 1)
          break
        default:
          if (e.key.toLowerCase() === 'f') toggleFullscreen()
          if (e.key.toLowerCase() === 'g' || e.key === 'Escape') setOverview(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, go, total, overview, lightbox])

  const current = slides[index]

  return (
    <LightboxContext.Provider value={setLightbox}>
      <div className={`viewport ${current.dark ? 'viewport--dark' : ''}`}>
        <div className="progress" style={{ width: `${((index + 1) / total) * 100}%` }} />

        <div className="stage" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
          <div key={current.id} className={`slide-wrap ${dir > 0 ? 'enter-next' : 'enter-prev'}`}>
            {current.el}
            <SlideNo n={index + 1} total={total} light={current.dark} />
          </div>
        </div>

        <button className="nav-zone nav-zone--prev" aria-label="Попередній слайд" onClick={() => go(index - 1)} />
        <button className="nav-zone nav-zone--next" aria-label="Наступний слайд" onClick={() => go(index + 1)} />

        <div className="controls">
          <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Назад">←</button>
          <span>{index + 1} / {total}</span>
          <button onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Вперед">→</button>
          <i />
          <button onClick={() => setOverview(true)} title="Усі слайди (G)">▦</button>
          <button onClick={toggleFullscreen} title="На весь екран (F)">⛶</button>
        </div>

        {overview && (
          <div className="overview" onClick={() => setOverview(false)}>
            <div className="overview__grid" onClick={(e) => e.stopPropagation()}>
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  className={`thumb ${k === index ? 'thumb--active' : ''}`}
                  onClick={() => {
                    go(k)
                    setOverview(false)
                  }}
                >
                  <div className="thumb__inner">
                    <div className="thumb__stage">{s.el}</div>
                  </div>
                  <span>{k + 1}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox.src} alt={lightbox.caption || ''} />
            {lightbox.caption && <p>{lightbox.caption}</p>}
          </div>
        )}
      </div>

      {/* Усі слайди підряд — для друку / збереження в PDF (Ctrl+P) */}
      <div className="print-deck">
        {slides.map((s, k) => (
          <div className="print-page" key={s.id}>
            {s.el}
            <SlideNo n={k + 1} total={total} light={s.dark} />
          </div>
        ))}
      </div>
    </LightboxContext.Provider>
  )
}
