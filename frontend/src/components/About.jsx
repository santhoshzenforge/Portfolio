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
              Your content deserves more than just edits it deserves impact. I create engaging videos and designs that help your brand grow and connect with your audience.
            </p>


            <a href="#contact" className="btn-primary">Let&apos;s Work Together</a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
