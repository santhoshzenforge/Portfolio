import { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiMail, HiPhone, HiPaperAirplane, HiCheck, HiLocationMarker } from 'react-icons/hi'

export default function Contact() {
  const formRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mwvddekv'
  const [state, handleSubmit] = useForm(formId)
  const [showSuccess, setShowSuccess] = useState(false)
  const hasSubmitError = Boolean(state.errors?.length) && !state.submitting && !state.succeeded

  useEffect(() => {
    if (!state.succeeded) return

    formRef.current?.reset()
    setShowSuccess(true)

    const timer = window.setTimeout(() => {
      setShowSuccess(false)
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [state.succeeded])

  const info = [
    { icon: <HiMail />, label: 'Email', value: 'zenforgeedits@gmail.com' },
    { icon: <HiPhone />, label: 'WhatsApp', value: '+91 90037 73691', isLink: true },
    { icon: <HiLocationMarker />, label: 'Location', value: 'India' },
  ]

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          Get In Touch
        </motion.h2>
        <p className="section-subtitle">I&apos;m here and ready to bring your project ideas to life. Just a click away!</p>

        <div className="contact-grid">
          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
          >
            <h3>Let&apos;s Create <span className="gold-text">Something Amazing</span></h3>
            <p>
              Ready to elevate your content? Whether you need a viral short-form
              video or a stunning poster, I&apos;m just a message away.
            </p>

            <div className="contact-info">
              {info.map((item) => (
                <div key={item.label} className="card info-item">
                  <div className="icon">{item.icon}</div>
                  <div>
                    <small>{item.label}</small>
                    {item.isLink ? (
                      <a href={`https://wa.me/${item.value.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            className="card contact-form"
            style={{ padding: '18px' }}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input id="name" type="text" name="name" placeholder="Your Name" className="input" required />

            <div>
              <input id="email" type="email" name="email" placeholder="Your Email" className="input" required />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="validation-error" />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                className="textarea"
                rows={5}
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="validation-error" />
            </div>

            {hasSubmitError && (
              <p className="form-status-error">Unable to send your message right now. Please try again.</p>
            )}

            <button type="submit" className="btn-primary" disabled={state.submitting}>
              {state.submitting ? <><HiPaperAirplane /> Sending...</> : showSuccess ? <><HiCheck /> Message Sent!</> : <><HiPaperAirplane /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
