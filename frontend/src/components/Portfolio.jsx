import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const categories = ['Short Videos', 'Posters']

const projects = [
  { id: 1, title: 'Motion Graphics Edit', category: 'Short Videos', videoUrl: '/portfolio-2.mp4', thumbnail: '/thumb-motion.jpg', desc: 'Dynamic motion graphics and typography' },
  { id: 2, title: 'Book Promo Edit', category: 'Short Videos', videoUrl: '/portfolio-book.mp4', thumbnail: '/thumb-book.jpg', desc: 'Cinematic promotional edit' },
  { id: 3, title: 'Footages Compilation', category: 'Short Videos', videoUrl: '/portfolio-footages.mp4', thumbnail: '/thumb-footages.jpg', desc: 'High-energy raw footage compilation' },
  { id: 4, title: 'Creative Cut', category: 'Short Videos', videoUrl: '/portfolio-3.mp4', thumbnail: '/thumb-creative.jpg', desc: 'Creative short-form video edit' },
  { id: 9, title: 'WFL Demo', category: 'Short Videos', videoUrl: '/WFL DEMO 1.mp4', desc: 'Professional demo reel' },
  { id: 10, title: 'Cinematic Edit', category: 'Short Videos', videoUrl: '/CHESTFINAL2 - Copy.mp4', desc: 'Cinematic visual storytelling' },
  { id: 11, title: 'Sports Edit', category: 'Short Videos', videoUrl: '/ORTHOAND SPORTS 1.mp4', desc: 'High-energy sports compilation' },
  { id: 12, title: 'Reel Edit', category: 'Short Videos', videoUrl: '/REEL 3 FOR ME - Copy.mp4', desc: 'Creative reel production' },
  { id: 13, title: 'Ratings Edit', category: 'Short Videos', videoUrl: '/RATINGS FOR EDITING SOFTWARE - Copy.mp4', desc: 'Software ratings showcase' },
  { id: 14, title: 'Sleeve Car Edit', category: 'Short Videos', videoUrl: '/SRIVELANCARS SMAPLE EDIT.mp4', desc: 'Sleek automotive visuals' },
  { id: 15, title: 'Quick Edit', category: 'Short Videos', videoUrl: '/PSILKS T.mp4', desc: 'Quick creative montage' },
  { id: 5, title: 'Clinic Poster Design', category: 'Posters', thumbnail: '/clinic-poster.jpg', desc: 'Professional clinic branding poster' },
  { id: 6, title: 'Coffee Poster Design', category: 'Posters', thumbnail: '/coffee-poster.jpg', desc: 'Vibrant coffee shop advertisement' },
  { id: 7, title: 'Shoe Ad Design', category: 'Posters', thumbnail: '/shoe-poster.png', desc: 'Dynamic shoe promotional poster' },
  { id: 8, title: 'Portfolio Showcase', category: 'Posters', thumbnail: '/portfolio-banner.jpg', desc: 'Custom portfolio branding' },
]

const SWIPE_THRESHOLD = 100

function VideoThumb({ videoUrl, className, style }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [thumbUrl, setThumbUrl] = useState(null)

  const captureFrame = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    if (video.videoWidth === 0) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    setThumbUrl(canvas.toDataURL('image/jpeg', 0.8))
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => {
      video.currentTime = 0.1
    }
    const handleSeeked = () => {
      captureFrame()
    }

    video.addEventListener('loadeddata', handleLoaded)
    video.addEventListener('seeked', handleSeeked)

    return () => {
      video.removeEventListener('loadeddata', handleLoaded)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [captureFrame, videoUrl])

  return (
    <>
      <video
        ref={videoRef}
        src={encodeURI(videoUrl)}
        muted
        preload="metadata"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {thumbUrl ? (
        <img src={thumbUrl} className={className} style={style} alt="" />
      ) : (
        <div className={className} style={{ ...style, background: '#0a0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem' }}>▶</div>
        </div>
      )}
    </>
  )
}

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

  const scale = 1 - index * 0.05;
  const yOffset = index * 10;

  let initialRotation = 0;
  if (index === 1) initialRotation = 6;
  if (index === 2) initialRotation = -6;
  if (index === 3) initialRotation = 10;

  const thumbClass = project.category === 'Posters' ? 'project-thumb poster-thumb' : 'project-thumb'

  return (
    <motion.article
      layoutId={`project-${project.id}`}
      className="deck-card"
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        if (Math.abs(x.get()) < 5) handleOpenProject(project)
      }}
      initial={false}
      animate={{
        scale,
        y: yOffset,
        zIndex: 10 - index,
        opacity: index > 3 ? 0 : 1
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
      {project.thumbnail ? (
        <img src={project.thumbnail} alt={project.title} className={thumbClass} style={{ height: '70%', width: '100%', objectFit: 'cover' }} />
      ) : (
        <VideoThumb
          videoUrl={project.videoUrl}
          className={thumbClass}
          style={{ height: '70%', width: '100%', objectFit: 'cover' }}
        />
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    setDeck(projects.filter((p) => p.category === activeCategory))
  }, [activeCategory])

  const swipeNext = () => setDeck(prev => [...prev.slice(1), prev[0]])
  const swipePrev = () => setDeck(prev => [prev[prev.length - 1], ...prev.slice(0, -1)])

  const handleOpenProject = (project) => {
    setSelectedProject(project)
  }

  return (
    <section id="portfolio" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
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
            <div
              style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.category === 'Short Videos' ? (
                <video
                  key={selectedProject.id}
                  src={encodeURI(selectedProject.videoUrl)}
                  controls
                  muted
                  playsInline
                  style={{ width: '100%', maxHeight: '85vh', borderRadius: '16px', objectFit: 'contain', background: '#000', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}
                />
              ) : (
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  style={{ width: '100%', maxHeight: '85vh', borderRadius: '16px', objectFit: 'contain', background: '#000', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
