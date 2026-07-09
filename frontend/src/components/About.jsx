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
                href="https://instagram.com"
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
            <p>
              I&apos;m Santhosh, the creative force behind ZenForce Edits. With years
              of experience in short-form video editing and poster design, I
              specialize in transforming raw footage into compelling visual stories
              that grab attention and drive engagement.
            </p>
            <p>
              From viral ready Reels and instagram posts to stunning social media posters,
              every project gets the full ZenForce treatment, precision editing,
              color grading, motion graphics, and a deep understanding of what makes
              content stop the scroll.
            </p>

            <a href="#contact" className="btn-primary">Let&apos;s Work Together</a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
