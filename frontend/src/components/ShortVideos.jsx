import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiChevronUp, HiChevronDown, HiPlay, HiPause, HiVolumeUp, HiVolumeOff, HiX } from 'react-icons/hi'

const shortVideos = [
  { id: 1, title: 'WFL Demo', videoUrl: '/WFL DEMO 1.mp4', desc: 'Professional demo reel' },
  { id: 2, title: 'Cinematic Edit', videoUrl: '/CHESTFINAL2 - Copy.mp4', desc: 'Cinematic visual storytelling' },
  { id: 3, title: 'Sports Edit', videoUrl: '/ORTHOAND SPORTS 1.mp4', desc: 'High-energy sports compilation' },
  { id: 4, title: 'Reel Edit', videoUrl: '/REEL 3 FOR ME - Copy.mp4', desc: 'Creative reel production' },
  { id: 5, title: 'Ratings Edit', videoUrl: '/RATINGS FOR EDITING SOFTWARE - Copy.mp4', desc: 'Software ratings showcase' },
  { id: 6, title: 'Sleeve Car Edit', videoUrl: '/SRIVELANCARS SMAPLE EDIT.mp4', desc: 'Sleek automotive visuals' },
  { id: 7, title: 'Quick Edit', videoUrl: '/PSILKS T.mp4', desc: 'Quick creative montage' },
]

function VideoCard({ video, isActive, onEnded }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    if (isActive) {
      vid.currentTime = 0
      vid.play().catch(() => {})
      setIsPlaying(true)
    } else {
      vid.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const updateProgress = () => {
      if (vid.duration) {
        setProgress((vid.currentTime / vid.duration) * 100)
      }
    }

    vid.addEventListener('timeupdate', updateProgress)
    vid.addEventListener('ended', onEnded)
    return () => {
      vid.removeEventListener('timeupdate', updateProgress)
      vid.removeEventListener('ended', onEnded)
    }
  }, [onEnded])

  const togglePlay = (e) => {
    e.stopPropagation()
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) {
      vid.play()
      setIsPlaying(true)
    } else {
      vid.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const vid = videoRef.current
    if (!vid) return
    vid.muted = !vid.muted
    setIsMuted(!isMuted)
  }

  return (
    <div className="short-video-card">
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="short-video-player"
        onClick={togglePlay}
      />

      <div className="short-video-overlay" onClick={togglePlay}>
        {!isPlaying && (
          <div className="short-video-play-icon">
            <HiPlay size={48} />
          </div>
        )}
      </div>

      <div className="short-video-progress">
        <div className="short-video-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="short-video-controls">
        <button className="short-video-ctrl-btn" onClick={toggleMute}>
          {isMuted ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
        </button>
      </div>

      <div className="short-video-info">
        <h4>{video.title}</h4>
        <p>{video.desc}</p>
      </div>
    </div>
  )
}

export default function ShortVideos() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const containerRef = useRef(null)

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shortVideos.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shortVideos.length) % shortVideos.length)
  }

  const togglePanel = () => setShowPanel(!showPanel)

  return (
    <section id="short-videos" ref={ref} className="short-videos-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          Reels
        </motion.h2>
        <p className="section-subtitle">Swipe or use arrows to skip videos.</p>
      </div>

      <div className="short-videos-feed" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="short-video-slide"
          >
            <VideoCard
              video={shortVideos[currentIndex]}
              isActive={inView}
              onEnded={goNext}
            />
          </motion.div>
        </AnimatePresence>

        <button className="short-video-nav-btn short-nav-up" onClick={goPrev}>
          <HiChevronUp size={24} />
        </button>
        <button className="short-video-nav-btn short-nav-down" onClick={goNext}>
          <HiChevronDown size={24} />
        </button>

        <div className="short-video-counter">
          {currentIndex + 1} / {shortVideos.length}
        </div>

        <button className="short-video-list-toggle" onClick={togglePanel}>
          {showPanel ? <HiX size={20} /> : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="short-video-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="short-video-panel-header">
              <h3>All Reels</h3>
              <button onClick={togglePanel}><HiX size={20} /></button>
            </div>
            <div className="short-video-panel-list">
              {shortVideos.map((vid, idx) => (
                <button
                  key={vid.id}
                  className={`short-video-panel-item ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => { setCurrentIndex(idx); setShowPanel(false) }}
                >
                  <span className="panel-item-num">{idx + 1}</span>
                  <div>
                    <strong>{vid.title}</strong>
                    <span>{vid.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
