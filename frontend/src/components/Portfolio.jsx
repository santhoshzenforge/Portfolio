import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const categories = ['Short Videos', 'Posters']

const projects = [
  { id: 1, title: 'Motion Graphics Edit', category: 'Short Videos', videoUrl: '/portfolio-2.mp4#t=1.5', desc: 'Dynamic motion graphics and typography' },
  { id: 2, title: 'Book Promo Edit', category: 'Short Videos', videoUrl: '/portfolio-book.mp4#t=1.5', desc: 'Cinematic promotional edit' },
  { id: 3, title: 'Footages Compilation', category: 'Short Videos', videoUrl: '/portfolio-footages.mp4#t=1.5', desc: 'High-energy raw footage compilation' },
  { id: 4, title: 'Creative Cut', category: 'Short Videos', videoUrl: '/portfolio-3.mp4#t=1.5', desc: 'Creative short-form video edit' },
  { id: 5, title: 'Clinic Poster Design', category: 'Posters', thumbnail: '/clinic-poster.jpg', desc: 'Professional clinic branding poster' },
  { id: 6, title: 'Coffee Poster Design', category: 'Posters', thumbnail: '/coffee-poster.jpg', desc: 'Vibrant coffee shop advertisement' },
  { id: 7, title: 'Shoe Ad Design', category: 'Posters', thumbnail: '/shoe-poster.png', desc: 'Dynamic shoe promotional poster' },
  { id: 8, title: 'Portfolio Showcase', category: 'Posters', thumbnail: '/portfolio-banner.jpg', desc: 'Custom portfolio branding' },
]

const SWIPE_THRESHOLD = 100

function Card({ project, index, isTop, swipe, handleOpenProject }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      swipe('right')
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      swipe('left')
    }
  }

  // Visual stacking effects
  const scale = 1 - index * 0.05;
  const yOffset = index * 10;
  
  // Create a fan effect for the cards beneath the top card
  // Index 1 goes slightly right, Index 2 goes slightly left
  let initialRotation = 0;
  if (index === 1) initialRotation = 6;
  if (index === 2) initialRotation = -6;
  if (index === 3) initialRotation = 10;

  return (
    <motion.article
      layoutId={`project-${project.id}`}
      className="deck-card"
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        // Prevent click if they were dragging
        if (Math.abs(x.get()) < 5) handleOpenProject(project)
      }}
      initial={false}
      animate={{ 
        scale, 
        y: yOffset,
        zIndex: 10 - index,
        opacity: index > 3 ? 0 : 1 // Show top 4
      }}
      style={{ 
        x: isTop ? x : 0, 
        rotate: isTop ? rotate : initialRotation, 
        opacity: isTop ? opacity : 1,
        transformOrigin: "bottom center"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="project-hover-overlay">
        <span className="hover-text">{project.category === 'Short Videos' ? '▶ Play Video' : '👁 View Poster'}</span>
      </div>
      {project.category === 'Short Videos' ? (
        <video src={project.videoUrl} className="project-thumb" style={{ height: '70%', width: '100%', objectFit: 'cover' }} muted preload="metadata" />
      ) : (
        <img src={project.thumbnail} alt={project.title} className="project-thumb poster-thumb" style={{ height: '70%', width: '100%', objectFit: 'cover' }} />
      )}
      <div className="project-copy" style={{ height: '30%', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--surface-light)' }}>
        <h3 style={{ fontSize: '1.6rem', margin: '0 0 6px 0', color: '#fff', lineHeight: '1.2' }}>{project.title}</h3>
        <p style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{project.desc}</p>
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Short Videos')
  const [deck, setDeck] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    setDeck(projects.filter((p) => p.category === activeCategory))
  }, [activeCategory])

  const swipeNext = () => setDeck(prev => [...prev.slice(1), prev[0]])
  const swipePrev = () => setDeck(prev => [prev[prev.length - 1], ...prev.slice(0, -1)])

  const handleOpenProject = (project) => {
    setSelectedProject(project)
    setZoomLevel(1)
  }

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
        <p className="section-subtitle">Swipe left/right or click the arrows to explore the deck.</p>

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

        <div className="deck-container">
          <button className="deck-nav-btn deck-nav-prev" onClick={swipePrev}><HiChevronLeft size={28} /></button>
          <AnimatePresence mode="popLayout">
            {deck.map((project, i) => (
              <Card 
                key={project.id} 
                project={project} 
                index={i} 
                isTop={i === 0}
                swipe={swipeNext} 
                handleOpenProject={handleOpenProject}
              />
            ))}
          </AnimatePresence>
          <button className="deck-nav-btn deck-nav-next" onClick={swipeNext}><HiChevronRight size={28} /></button>
        </div>
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
              layoutId={`project-${selectedProject.id}`}
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                {selectedProject.category === 'Short Videos' ? (
                  <video
                    src={selectedProject.videoUrl.split('#')[0]} // Remove the #t= for actual playback
                    controls
                    autoPlay
                    style={{ width: '100%', maxHeight: '75vh', borderRadius: '8px', objectFit: 'contain', background: '#000' }}
                  />
                ) : (
                  <img 
                    src={selectedProject.thumbnail} 
                    alt={selectedProject.title}
                    style={{ width: '100%', maxHeight: '75vh', borderRadius: '8px', objectFit: 'contain', background: '#000' }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
