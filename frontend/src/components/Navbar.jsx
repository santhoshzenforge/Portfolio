import { useState, useEffect, useRef } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ logo }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const marker = 140
      let current = '#home'

      for (let i = 0; i < navLinks.length; i++) {
        const id = navLinks[i].href.slice(1)
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const isActiveSection = rect.top <= marker && rect.bottom > marker
        if (isActiveSection) {
          current = `#${id}`
          break
        }
      }

      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleHashChange = () => setMobileOpen(false)
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mobileOpen) return
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <nav ref={navRef} className={`site-nav ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}>
      <div className="site-nav-inner">
        <a href="#home" className="nav-brand" onClick={() => { setMobileOpen(false); setActive('#home') }}>
          <img src={logo} alt="ZenForce Edits" />
          <span>ZenForce Edits</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${active === link.href ? 'active' : ''}`}
              onClick={() => setActive(link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        className={`container mobile-menu ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`nav-link ${active === link.href ? 'active' : ''}`}
            onClick={() => {
              setActive(link.href)
              setMobileOpen(false)
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
