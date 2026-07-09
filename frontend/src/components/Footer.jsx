import { HiMail, HiHeart } from 'react-icons/hi'

export default function Footer({ logo }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="ZenForce Edits" />
          <span>ZenForce Edits</span>
        </div>

        <a href="mailto:zenforgeedits@gmail.com" className="btn-outline">
          <HiMail /> Email Me
        </a>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} ZenForce Edits. Crafted with <HiHeart style={{ verticalAlign: 'middle' }} /> All rights reserved.
        </p>
      </div>
    </footer>
  )
}
