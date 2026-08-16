"use client";

/**
 * ContactEnhanced.tsx - Contact Section with Web3Forms Integration & Glassmorphism
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ContactEnhanced.css';
import CTA from './ui/CTA';

gsap.registerPlugin(ScrollTrigger);

export function ContactEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      access_key: "96bf085a-5410-4a8f-9048-3533423c4735",
      name: formData.name,
      email: formData.email,
      subject: `[Red Shadow Contact] ${formData.subject}`,
      message: formData.message,
      from_name: "Red Shadow Designs Portfolio"
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        if (data.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          console.error("Web3Forms submission failed:", data);
          alert("Submission failed. Please try again or email us directly.");
        }
      })
      .catch((error) => {
        setSubmitting(false);
        console.error("Form submission error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section-wrapper">
      <div ref={bgRef} className="contact-parallax-bg">
        <img src="/assets/images/services/3d-viz-4.webp" alt="Background" loading="lazy" decoding="async" />
        <div className="contact-bg-overlay"></div>
      </div>

      <div className="contact-grid-orbit contact-grid-orbit-a" />
      <div className="contact-grid-orbit contact-grid-orbit-b" />

      <div className="contact-content-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-pill">Launch your next digital prototype</div>
          <h2 className="contact-title">Let’s Engineer Your Vision.</h2>
          <p className="contact-subtitle">
            Whether you require early-stage feasibility testing, cinematic renders for your next investor pitch, or ASME-compliant CAD files ready for the manufacturing floor, our team is ready to execute. Submit your brief below to start the conversation.
          </p>
          <div className="contact-header-accent"></div>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="info-card glass-card">
              <div className="contact-visual-panel">
                <div className="contact-visual-ring" />
                <div className="contact-visual-copy">

                  <CTA href="/contact" className="">Book a Technical Consultation or Schedule a Discovery Call</CTA>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h4>Location</h4>
                  <p>Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-text">
                  <h4>Email</h4>
                  <a href="mailto:hello@redshadowdesigns.com">hello@redshadowdesigns.com</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-text">
                  <h4>Phone</h4>
                  <a href="tel:+923338917021">+92 333 891 7021</a>
                </div>
              </div>

              <div className="social-icons">
                <a href="https://www.fiverr.com/daniyalahmad7" target="_blank" rel="noopener noreferrer" className="social-icon" title="Fiverr">
                  <img src="/assets/images/fiverr.svg" alt="Fiverr" className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/company/red-shadow-designs/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">in</a>
                <a href="https://www.behance.net/redshadowdesigns" target="_blank" rel="noopener noreferrer" className="social-icon" title="Behance">Be</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="glass-strong p-8 rounded-3xl text-center space-y-4">
                <div className="text-5xl">✅</div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-white/60">Thank you for reaching out to Red Shadow Designs. We will respond as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="glass-button-lg px-6 py-2 text-sm mt-4">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form glass-strong">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="glass-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your product concept, timeline, and any specific manufacturing requirements (e.g., CNC, Injection Molding, DFM standards) we should consider..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  ></textarea>
                </div>

                <div className="contact-form-actions">
                  <button type="submit" disabled={submitting} className="glass-button-lg w-full">
                    {submitting ? "Sending..." : "Send Message"}
                    <span className="button-glow"></span>
                  </button>
                  <p className="contact-form-note">We aim to respond promptly; response times may vary.</p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactEnhanced;
