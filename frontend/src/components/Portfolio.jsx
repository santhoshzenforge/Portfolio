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
  { id: 5, title: 'Brand Identity Poster', category: 'Posters', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600', desc: 'Minimal brand identity poster design' },
  { id: 6, title: 'Event Promotion Poster', category: 'Posters', thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600', desc: 'Vibrant event promotion design' },
  { id: 7, title: 'Social Media Campaign', category: 'Posters', thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600', desc: 'Instagram carousel campaign design' },
  { id: 8, title: 'Fashion Lookbook', category: 'Posters', thumbnail: 'https://images.unsplash.com/photo-1557200139-90348f2963ac?w=600', desc: 'Fashion editorial poster series' },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

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
          My Portfolio
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
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.thumbnail} alt={project.title} className="project-thumb" />
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
            onClick={() => setSelectedProject(null)}
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
                <button type="button" className="close-btn" onClick={() => setSelectedProject(null)}>
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
                  <img src={selectedProject.thumbnail} alt={selectedProject.title} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
