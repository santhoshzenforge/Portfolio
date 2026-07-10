import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiX } from 'react-icons/hi'

const categories = ['All', 'Videos', 'Posters']

const projects = [
  { id: 1, title: 'Product Launch Reel', category: 'Videos', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', desc: 'High-energy product launch short video' },
  { id: 2, title: 'Travel Montage', category: 'Videos', thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg', videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', desc: 'Cinematic travel short-form edit' },
  { id: 3, title: 'Fitness Promo Reel', category: 'Videos', thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg', videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0', desc: 'Dynamic fitness transformation video' },
  { id: 4, title: 'Music Visualizer', category: 'Videos', thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg', videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk', desc: 'Lyric video with motion graphics' },
  { id: 5, title: 'Clinic Poster Design', category: 'Posters', thumbnail: '/clinic-poster.jpg', desc: 'Professional clinic branding poster' },
  { id: 6, title: 'Coffee Poster Design', category: 'Posters', thumbnail: '/coffee-poster.jpg', desc: 'Vibrant coffee shop advertisement' },
  { id: 7, title: 'Shoe Ad Design', category: 'Posters', thumbnail: '/shoe-poster.png', desc: 'Dynamic shoe promotional poster' },
  { id: 8, title: 'Portfolio Showcase', category: 'Posters', thumbnail: '/portfolio-banner.jpg', desc: 'Custom portfolio branding' },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const handleOpenProject = (project) => {
    setSelectedProject(project)
    setZoomLevel(1)
  }

  const handleCloseProject = () => setSelectedProject(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

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
                  <span className="hover-text">{project.category === 'Videos' ? '▶ Play Video' : '👁 View Poster'}</span>
                </div>
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className={`project-thumb ${project.category === 'Posters' ? 'poster-thumb' : ''}`} 
                />
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
                {selectedProject.category === 'Videos' ? (
                  <iframe
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ aspectRatio: '16/9' }}
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
