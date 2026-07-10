import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiX } from 'react-icons/hi'

const categories = ['Short Videos', 'Posters']

const projects = [
  { id: 1, title: 'Motion Graphics Edit', category: 'Short Videos', videoUrl: '/portfolio-2.mp4', desc: 'Dynamic motion graphics and typography' },
  { id: 2, title: 'Book Promo Edit', category: 'Short Videos', videoUrl: '/portfolio-book.mp4', desc: 'Cinematic promotional edit' },
  { id: 3, title: 'Footages Compilation', category: 'Short Videos', videoUrl: '/portfolio-footages.mp4', desc: 'High-energy raw footage compilation' },
  { id: 4, title: 'Creative Cut', category: 'Short Videos', videoUrl: '/portfolio-3.mp4', desc: 'Creative short-form video edit' },
  { id: 5, title: 'Clinic Poster Design', category: 'Posters', thumbnail: '/clinic-poster.jpg', desc: 'Professional clinic branding poster' },
  { id: 6, title: 'Coffee Poster Design', category: 'Posters', thumbnail: '/coffee-poster.jpg', desc: 'Vibrant coffee shop advertisement' },
  { id: 7, title: 'Shoe Ad Design', category: 'Posters', thumbnail: '/shoe-poster.png', desc: 'Dynamic shoe promotional poster' },
  { id: 8, title: 'Portfolio Showcase', category: 'Posters', thumbnail: '/portfolio-banner.jpg', desc: 'Custom portfolio branding' },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Short Videos')
  const [selectedProject, setSelectedProject] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const handleOpenProject = (project) => {
    setSelectedProject(project)
    setZoomLevel(1)
  }

  const handleCloseProject = () => setSelectedProject(null)

  const filtered = projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Works
        </motion.h2>
        <p className="section-subtitle">Featured work aligned for strong visual storytelling.</p>

        <div className="portfolio-toolbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                className="card project-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenProject(project)}
              >
                <div className="project-hover-overlay">
                  <span className="hover-text">{project.category === 'Short Videos' ? '▶ Play Video' : '👁 View Poster'}</span>
                </div>
                {project.category === 'Short Videos' ? (
                  <video src={project.videoUrl} className="project-thumb" muted preload="metadata" />
                ) : (
                  <img src={project.thumbnail} alt={project.title} className="project-thumb poster-thumb" />
                )}
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-head">
                <div>
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.category}</p>
                </div>
                <button type="button" className="close-btn" onClick={handleCloseProject}>
                  <HiX />
                </button>
              </div>
              <div className="modal-body">
                {selectedProject.category === 'Short Videos' ? (
                  <video
                    src={selectedProject.videoUrl}
                    controls
                    autoPlay
                    style={{ width: '100%', maxHeight: '75vh', borderRadius: '8px', objectFit: 'contain', background: '#000' }}
                  />
                ) : (
                  <div>
                    <div className="zoom-controls">
                      <button className="zoom-btn" onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}>Zoom In (+)</button>
                      <button className="zoom-btn" onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 1))}>Zoom Out (-)</button>
                    </div>
                    <div className="zoom-container">
                      <img 
                        src={selectedProject.thumbnail} 
                        alt={selectedProject.title}
                        style={{ 
                          transform: `scale(${zoomLevel})`, 
                          transition: 'transform 0.3s ease',
                          transformOrigin: 'top center',
                          width: '100%',
                          cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in'
                        }}
                        onClick={() => setZoomLevel(prev => (prev === 1 ? 2 : 1))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
