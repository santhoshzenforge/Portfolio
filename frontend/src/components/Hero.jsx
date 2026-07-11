import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiPlay } from 'react-icons/hi'
import MagneticButton from './MagneticButton'

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
            <MagneticButton>
              <a href="#portfolio" className="btn-primary">
                View My Work <HiArrowRight />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="btn-outline">
                <HiPlay /> Work With Me
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <div className="hero-bento">
          <motion.div
            className="bento-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.15 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
          >
            <h4 className="bento-title">Core Services</h4>
            <ul className="bento-list">
              <li><strong>Short-Form Video</strong> (Reels & TikTok)</li>
              <li><strong>Motion Graphics</strong> & Color Grading</li>
              <li><strong>Posters</strong> & Branding Assets</li>
              <li><strong>Content Tips</strong> & Growth Strategy</li>
            </ul>
          </motion.div>

          <motion.div
            className="bento-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.3 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }
            }}
          >
            <h4 className="bento-title">Why Me?</h4>
            <ul className="bento-list">
              <li>I can improvise your content with visual storytelling</li>
              <li>Fast revisions & on-time delivery</li>
              <li>Edits engineered to capture attention</li>
            </ul>
          </motion.div>
        </div>
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
