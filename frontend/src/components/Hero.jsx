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
            I'm a freelance video editor who transforms ideas into engaging visual stories. I create high quality, attention grabbing short-form videos that help brands, businesses, and creators stand out online. With a focus on creativity, fast delivery, and clear communication, I'm committed to delivering content that makes an impact and helps your brand grow.
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
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h3 style={{ fontSize: '2.4rem', color: 'var(--accent)', marginBottom: '4px' }}>What I Deliver</h3>

          <div className="animated-box">
            <h4 style={{ marginBottom: '10px', fontSize: '1.6rem', color: 'var(--accent)', position: 'relative', zIndex: 2 }}>Core Services</h4>
            <ul style={{ color: 'var(--muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '1.45rem', position: 'relative', zIndex: 2 }}>
              <li><strong>Short-Form Video</strong> (Reels & TikTok)</li>
              <li><strong>Motion Graphics</strong> & Color Grading</li>
              <li><strong>Posters</strong> & Branding Assets</li>
            </ul>
          </div>

          <div className="animated-box">
            <h4 style={{ marginBottom: '10px', fontSize: '1.6rem', color: 'var(--accent)', position: 'relative', zIndex: 2 }}>Why Me?</h4>
            <ul style={{ color: 'var(--muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '1.45rem', position: 'relative', zIndex: 2 }}>
              <li>Premium, professional-grade results</li>
              <li>Fast revisions & on-time delivery</li>
              <li>Edits engineered to capture attention</li>
            </ul>
          </div>
        </motion.aside>
      </div>

      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="stats-banner">
          <div className="stat-item">
            <strong>6M+</strong>
            <span>Views Generated</span>
          </div>
          <div className="stat-item">
            <strong>10+</strong>
            <span>Videos Crafted</span>
          </div>
          <div className="stat-item">
            <strong>9+</strong>
            <span>Posters Designed</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
