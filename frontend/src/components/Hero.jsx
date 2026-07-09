import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiPlay } from 'react-icons/hi'

const roles = [
  'Short-Form Video Editor',
  'Poster Designer',
  'Content Creator',
  'Visual Storyteller',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1))
      }, 70)
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1))
      }, 40)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="hero-kicker">Freelance Portfolio</p>
          <h1>
            Hi, I&apos;m <span className="gold-text">Santhosh</span>
          </h1>
          <p className="hero-role">{displayText}</p>
          <p>
            I craft stunning short-form videos and eye-catching posters that elevate
            brands and captivate audiences. Let&apos;s turn your vision into visual
            magic.
          </p>

          <div className="hero-actions">
            <a href="#portfolio" className="btn-primary">
              View My Work <HiArrowRight />
            </a>
            <a href="#contact" className="btn-outline">
              <HiPlay /> Work With Me
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="hero-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h3 style={{ marginBottom: '12px' }}>What I Deliver</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>
            Viral-ready edits, clean storytelling, and impactful poster designs for
            modern social brands.
          </p>
          <div className="hero-stat-grid">
            <div className="hero-stat">
              <strong>20+</strong>
              <span>Projects Done</span>
            </div>
            <div className="hero-stat">
              <strong>10+</strong>
              <span>Happy Clients</span>
            </div>
            <div className="hero-stat">
              <strong>4</strong>
              <span>Videos Made</span>
            </div>
            <div className="hero-stat">
              <strong>4</strong>
              <span>Posters Made</span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
