import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiPlay, HiPhotograph, HiColorSwatch, HiAnnotation } from 'react-icons/hi'
import { SiAdobecreativecloud, SiAdobeaftereffects, SiAdobepremierepro, SiAdobephotoshop, SiAdobeillustrator, SiDavinciresolve, SiBlender } from 'react-icons/si'

const skills = [
  { name: 'Video Editing', level: 95, icon: <HiPlay />, desc: 'Short-form & Long-form' },
  { name: 'Poster Design', level: 92, icon: <HiPhotograph />, desc: 'Social Media & Branding' },
  { name: 'Color Grading', level: 88, icon: <HiColorSwatch />, desc: 'Professional Look' },
  { name: 'Motion Graphics', level: 85, icon: <HiAnnotation />, desc: 'Animations & FX' },
]

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My Expertise
        </motion.h2>
        <p className="section-subtitle">
          The goal is not to build a video or poster. The goal is to build your brand.
        </p>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.article
              key={skill.name}
              className="card skill-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div className="skill-head">
                <div className="skill-icon">{skill.icon}</div>
                <div>
                  <h3>{skill.name}</h3>
                  <p className="skill-sub">{skill.desc}</p>
                </div>
              </div>

              <div className="progress">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.07 }}
                />
              </div>
              <p className="progress-label">{skill.level}%</p>
            </motion.article>
          ))}
        </div>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-content">
          {/* We duplicate the list to make the infinite scroll seamless */}
          {[1, 2].map((listIndex) => (
            <div key={listIndex} style={{ display: 'inline-flex', gap: '60px' }}>
              <div className="software-item"><SiAdobepremierepro size={24} /> Premiere Pro</div>
              <div className="software-item"><SiAdobeaftereffects size={24} /> After Effects</div>
              <div className="software-item"><SiAdobephotoshop size={24} /> Photoshop</div>
              <div className="software-item"><SiDavinciresolve size={24} /> DaVinci Resolve</div>
              <div className="software-item"><SiAdobeillustrator size={24} /> Illustrator</div>
              <div className="software-item"><SiBlender size={24} /> Blender 3D</div>
              <div className="software-item"><SiAdobecreativecloud size={24} /> Creative Cloud</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
