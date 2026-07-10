import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiHome, HiUser, HiLightningBolt, HiFilm, HiMail } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home', icon: HiHome },
  { name: 'About', href: '#about', icon: HiUser },
  { name: 'Skills', href: '#skills', icon: HiLightningBolt },
  { name: 'Works', href: '#portfolio', icon: HiFilm },
  { name: 'Contact', href: '#contact', icon: HiMail },
];

function DockItem({ link, active, mouseX }) {
  const ref = require('react').useRef(null);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale based on distance from mouse (macOS dock effect)
  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="dock-item-wrapper">
      <div className="dock-tooltip">{link.name}</div>
      <motion.a
        ref={ref}
        href={link.href}
        style={{ width, height: width }}
        className={\dock-item \\}
      >
        <link.icon size={24} />
      </motion.a>
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState('#home');
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight / 2;
      let current = '#home';

      for (let i = 0; i < navLinks.length; i++) {
        const id = navLinks[i].href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          current = \#\\;
          break;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="mac-dock-container">
      <motion.div
        className="mac-dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {navLinks.map((link) => (
          <DockItem key={link.name} link={link} active={active} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

