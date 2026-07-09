import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaInstagram, FaGithub } from 'react-icons/fa'

export default function About({ profileImg }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <p className="section-subtitle">
          Professional <span className="gold-text">Video Editor</span> and{' '}
          <span className="gold-text">Poster Designer</span>
        </p>

        <div className="grid-2">
          <motion.div
            className="about-media"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ maxWidth: '380px', margin: '0 auto' }}
          >
            <img src={profileImg} alt="Santhosh" className="about-image" />
            <div className="profile-social" aria-label="Profile social links">
              <a
                href="https://www.instagram.com/zenforge_edits?igsh=eGV0bTF2bHEwZ3Bz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/santhoshzenforge/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="about-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '2.4rem', color: 'var(--accent)', marginBottom: '16px' }}>Why Choose Me?</h3>
            <p style={{ fontSize: '1.6rem', marginBottom: '24px', lineHeight: '1.6' }}>
              I don&apos;t just edit videos, I create content that captures attention and leaves a lasting impression. Every project is crafted with creativity, precision, and a results-driven mindset.
            </p>
            
            <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '1.5rem', color: 'var(--muted)' }}>
              <li>Premium-quality video editing & poster design</li>
              <li>Engaging visual storytelling that keeps audiences watching</li>
              <li>Fast, reliable, and on-time delivery</li>
              <li>Clear communication and smooth collaboration</li>
              <li>Unlimited commitment to quality and client satisfaction</li>
            </ul>

            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text)', marginBottom: '32px' }}>
              Your vision. My creativity. Content that delivers results.
            </p>

            <a href="#contact" className="btn-primary">Let&apos;s Work Together</a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
