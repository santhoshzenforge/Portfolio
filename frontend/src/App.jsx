import Navbar from './components/Navbar'
import CursorSpotlight from './components/CursorSpotlight'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

import logo from '/zenforge-edits-logo-dynamic-white.png'
import profileImg from '/sandy.png'

function SectionTransition({ children }) {
  return (
    <div style={{ position: 'relative' }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <>
      <CursorSpotlight />
      <ParticleBackground />
      <Navbar logo={logo} />
      <SectionTransition><Hero /></SectionTransition>
      <SectionTransition><About profileImg={profileImg} /></SectionTransition>
      <SectionTransition><Skills /></SectionTransition>
      <SectionTransition><Portfolio /></SectionTransition>
      <SectionTransition><Contact /></SectionTransition>
      <Footer logo={logo} />
    </>
  )
}
