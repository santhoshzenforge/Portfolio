import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiDownload, HiDocumentText } from 'react-icons/hi'

export default function Resume() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section style={{
      minHeight: 'auto', padding: '80px 5%', textAlign: 'center', position: 'relative',
    }} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '650px', margin: '0 auto', padding: '50px',
          background: '#1a1a1a', borderRadius: '4px',
          border: '1px solid #242424',
        }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '2.5rem', color: '#c9a86a', marginBottom: '20px',
            display: 'flex', justifyContent: 'center',
          }}
        >
          <HiDocumentText />
        </motion.div>

        <h2 style={{
          fontSize: '2rem', color: '#f5f5f5', marginBottom: '15px',
          fontFamily: "'Playfair Display', serif",
        }}>
          Download My Resume
        </h2>

        <p style={{
          color: '#999', marginBottom: '30px', fontSize: '0.95rem',
          maxWidth: '480px', margin: '0 auto 30px', lineHeight: 1.9,
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
        }}>
          Get a complete overview of my experience, skills, and professional journey
          in video editing and poster design.
        </p>

        <motion.a
          href="/resume.pdf" download
          className="btn-primary"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <HiDownload /> Download CV
        </motion.a>
      </motion.div>
    </section>
  )
}
