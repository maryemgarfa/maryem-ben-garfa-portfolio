'use client'
import { useEffect, useRef, useState } from 'react'
import { T, EMAIL, LINKEDIN, GITHUB, CVS, WHATSAPP, WHATSAPP_LABEL, asset, PROJECTS, EXP, SKILLS, TECH_TILES, INFO } from '../lib/data'
import dynamic from 'next/dynamic'
import { Icon, PixelArt, CODE, CODE_PAL, CODE_PINK } from '../components/Icons'
const Scene = dynamic(() => import('../components/Scene'), { ssr: false })
const MiniIsland = dynamic(() => import('../components/MiniIsland'), { ssr: false })
const IDS = ['top', 'about', 'projets', 'competences', 'parcours', 'contact']
const TECH = { wordpress: 'WordPress', prestashop: 'PrestaShop', react: 'React', shopify: 'Shopify', webapp: 'Web App' }
const CTX = ['all', ...Object.keys(TECH).filter(k => PROJECTS.some(p => p.tech === k))]

// Miniature d'un projet : sans image (ou image absente/cassée), on affiche le logo Pixel Art à la place
function Thumb({ src, name, theme }) {
  const ref = useRef(null)
  const [bad, setBad] = useState(false)
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setBad(true) }, [])
  if (!src || bad) return (
    <div className="thumb ph" aria-hidden="true"><PixelArt rows={CODE} pal={theme === 'dark' ? CODE_PAL : CODE_PINK} size={5} /><span>{name}</span></div>)
  return <img ref={ref} className="thumb" src={asset(src)} alt={name} loading="lazy" onError={() => setBad(true)} />
}

// Rend le mot `link.word` cliquable dans un texte (ex. « ESPRIT »)
function Linked({ text, link }) {
  if (!link || !text.includes(link.word)) return text
  const [a, b] = text.split(link.word)
  return <>{a}<a className="inline" href={link.href} title={link.title} target="_blank" rel="noopener noreferrer">{link.word}</a>{b}</>
}

function Social() {
  return (
    <div className="social">
      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
      {GITHUB && <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>}
      <a href={'mailto:' + EMAIL} aria-label="E-mail"><Icon name="mail" /></a>
      <a href={'https://wa.me/' + WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label={'WhatsApp ' + WHATSAPP_LABEL} title={'WhatsApp ' + WHATSAPP_LABEL}><Icon name="whatsapp" /></a>
    </div>)
}

export default function Home() {
  const [lang, setLang] = useState('en'), [theme, setTheme] = useState('dark')
  const [active, setActive] = useState('top'), [open, setOpen] = useState(false)
  const [prog, setProg] = useState(0), [filter, setFilter] = useState('all'), [showAll, setShowAll] = useState(false)
  useEffect(() => { try {
    const l = localStorage.getItem('lang'), th = localStorage.getItem('theme')
    if (l && T[l]) setLang(l)
    if (th) setTheme(th)
  } catch {} }, [])
  useEffect(() => {
    const d = document.documentElement
    d.lang = lang; d.dir = lang === 'ar' ? 'rtl' : 'ltr'; d.dataset.theme = theme
    try { localStorage.setItem('lang', lang); localStorage.setItem('theme', theme) } catch {}
  }, [lang, theme])
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    IDS.forEach(id => { const el = document.getElementById(id); el && obs.observe(el) })
    const onScroll = () => {
      const h = document.documentElement
      setProg(h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1))
      if (h.scrollTop < 200) setActive('top')
    }
    onScroll(); addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])
  // Animation d'apparition au scroll : chaque élément [data-rv] reçoit la classe « in » en entrant dans l'écran
  useEffect(() => {
    if (!document.documentElement.classList.contains('rv-on') || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
    document.querySelectorAll('[data-rv]:not(.in)').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [lang, showAll, filter])
  const t = T[lang]
  const cvHref = CVS[lang] || CVS.en || CVS.fr  // CV dans la langue du site
  const d = i => ({ '--d': `${Math.min(i, 8) * 70}ms` })
  const list = showAll ? PROJECTS.filter(p => filter === 'all' || p.tech === filter) : PROJECTS.filter(p => p.featured)
  const toggleAll = () => { setShowAll(!showAll); setFilter('all') }
  return (<>
    <a className="skip" href="#projets">{t.skip}</a>
    <div className="progress" style={{ transform: `scaleX(${prog})` }} aria-hidden="true" />
    <header className="nav">
      <a className="logo" href="#top" onClick={() => setOpen(false)}>
        <PixelArt rows={CODE} pal={theme === 'dark' ? CODE_PAL : CODE_PINK} size={3} /><span>Maryem</span>
      </a>
      <nav className={open ? 'open' : ''} aria-label="Navigation">
        {t.nav.map((n, i) => (
          <a key={n} href={'#' + IDS[i]} className={active === IDS[i] ? 'act' : ''} aria-current={active === IDS[i] ? 'true' : undefined} onClick={() => setOpen(false)}>{n}</a>))}
      </nav>
      <div className="tools">
        {[['fr', 'FR'], ['en', 'EN'], ['ar', 'عربي']].map(([c, n]) => (
          <button key={c} className={lang === c ? 'on' : ''} onClick={() => setLang(c)} aria-pressed={lang === c}>{n}</button>))}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t.theme}>{theme === 'dark' ? '☀' : '☾'}</button>
        <a className="btn alt sm navcv" href={asset(cvHref)} download><Icon name="download" size={16} />{t.cv}</a>
        <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.menu}>{open ? '✕' : '☰'}</button>
      </div>
    </header>
    <main>
      <section className="hero" id="top">
        <div className="hero-txt" data-rv>
          <p className="prompt" aria-hidden="true">{'>'}<i>_</i></p>
          <h1>{t.hi} <span className="hl">Maryem</span><span className="sr"> Ben Garfa</span><span className="spark" aria-hidden="true" /></h1>
          <p className="role">{t.role}</p>
          <p className="lead">{t.intro}</p>
          <div className="row">
            <a className="btn" href="#projets"><Icon name="folder" size={18} />{t.cta[0]}<Icon name="arrow" size={18} className="arr" /></a>
            <a className="btn alt" href={asset(cvHref)} download><Icon name="download" size={18} />{t.cv}</a>
          </div>
          <Social />
        </div>
        <div className="scene3d" aria-hidden="true" data-rv style={d(2)}><Scene theme={theme} /></div>
      </section>

      <section id="about" className="about">
        <div className="frame" aria-hidden="true" data-rv><Scene theme={theme} variant="desk" /></div>
        <div className="about-txt" data-rv style={d(1)}>
          <p className="eyebrow"><PixelArt rows={CODE} pal={theme === 'dark' ? CODE_PAL : CODE_PINK} size={2} />{t.aboutLabel}</p>
          <h2>{t.aboutTitle}</h2>
          {t.about.map(x => <p key={x}>{x}</p>)}
        </div>
        <ul className="info">{INFO.map((i, n) => (
          <li key={n} data-rv style={d(n + 2)}><Icon name={i.icon} size={24} /><div><b>{i.a[lang]}</b>{i.b && <span><Linked text={i.b[lang]} link={i.link} /></span>}</div></li>))}</ul>
        <div className="motto" aria-hidden="true" data-rv style={d(4)}>
          <div className="isl3d plant"><MiniIsland kind="plant" theme={theme} /></div>
          <span className="hand">{t.motto[0]}<br />{t.motto[1]} ♥</span>
        </div>
      </section>

      <section id="projets">
        <div className="head" data-rv>
          <div><h2><Icon name="folder" size={26} />{t.featTitle}</h2><p className="sub">{t.featSub}</p></div>
          <button className="more" onClick={toggleAll} aria-expanded={showAll}>{showAll ? t.viewLess : t.viewAll}<Icon name="arrow" size={16} className="arr" /></button>
        </div>
        {showAll && <div className="chips" role="group">{CTX.map(c => (
          <button key={c} className={filter === c ? 'on' : ''} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c === 'all' ? t.all : TECH[c]}</button>))}</div>}
        <div className="grid">{list.map((p, i) => (
          <article className="card" key={p.name} data-rv style={d(i % 4)}>
            <Thumb src={p.image} name={p.name} theme={theme} />
            <div className="cbody">
              <div className="ctop"><h3>{p.name}</h3>
                {p.link && <a className="ext" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${t.view} ${p.name}`}><Icon name="external" size={18} /></a>}</div>
              <small>{p.label || TECH[p.tech]}</small>
              {p.desc && <p>{p.desc[lang]}</p>}
              {p.tags && <ul className="tags">{p.tags.map(x => <li key={x}>{x}</li>)}</ul>}
              {p.link && <a className="visit" href={p.link} target="_blank" rel="noopener noreferrer">{t.visit}<Icon name="arrow" size={16} className="arr" /></a>}
            </div>
          </article>))}</div>
      </section>

      <div className="duo"><div className="duo-in">
        <section id="competences" className="skills">
          <div data-rv><h2><Icon name="layers" size={26} />{t.skillsTitle}</h2><p className="sub">{t.skillsSub}</p></div>
          <ul className="tiles">{TECH_TILES.map((k, i) => (
            <li key={k.n} data-rv style={{ '--k': k.c, ...d(i % 6) }}><span className="glyph" aria-hidden="true">{k.a}</span><b>{k.n}</b></li>))}</ul>
          <div className="cats">{SKILLS.map((s, i) => (
            <div key={s.l.en} data-rv style={d(i % 3)}><h3>{s.l[lang]}</h3><ul className="tags">{s.v.map(x => <li key={x}>{x}</li>)}</ul></div>))}</div>
        </section>
        <section id="parcours" className="exp">
          <div data-rv><h2><Icon name="briefcase" size={26} />{t.expTitle}</h2><p className="sub">{t.expSub}</p></div>
          <ul className="time">{EXP.map((e, i) => (
            <li key={e.org + e.date} data-rv style={d(i % 3)}><small>{e.date.replace('{now}', t.now)}</small>
              <div><b>{e.link ? <a className="orglink" href={e.link} target="_blank" rel="noopener noreferrer">{e.org}<Icon name="external" size={14} /></a> : e.org} — {e.title[lang]}</b>{e.text && <p>{e.text[lang]}</p>}</div></li>))}</ul>
          <div className="keep" aria-hidden="true"><span className="hand">{t.keep}</span><div className="isl3d laptop"><MiniIsland kind="laptop" theme={theme} /></div></div>
        </section>
      </div></div>

      <div className="band"><div className="band-in">
        <section id="contact" className="contact" data-rv>
          <h2><Icon name="mail" size={26} />{t.contactTitle}</h2>
          <p className="lead">{t.contact}</p>
          <div className="row"><a className="btn" href={'mailto:' + EMAIL}><Icon name="mail" size={18} />{t.mail}</a><Social /></div>
        </section>
        <div className="thanks" aria-hidden="true" data-rv style={d(1)}>
          <div className="isl3d thx"><MiniIsland kind="thanks" theme={theme} text={t.thanks} /></div>
        </div>
        <footer data-rv style={d(2)}>
          <p className="brand"><PixelArt rows={CODE} pal={theme === 'dark' ? CODE_PAL : CODE_PINK} size={3} /><b>Maryem</b></p>
          <p>{t.brand}</p>
          <p className="loc"><Icon name="pin" size={16} />{t.foot}</p>
          <p className="copy">© 2026 Maryem Ben Garfa</p>
          <div className="isl3d castle" aria-hidden="true"><MiniIsland kind="castle" theme={theme} /></div>
        </footer>
      </div></div>
    </main>
    {prog > .15 && <a className="btn top" href="#top" aria-label={t.top}>↑</a>}
  </>)
}