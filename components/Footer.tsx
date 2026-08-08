"use client";

/**
 * Footer.tsx - Premium Footer Component
 * 
 * Design: Glass footer with company info and links
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { serviceMenu } from '@/lib/serviceMenu';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid-glow footer-grid-glow-a" />
      <div className="footer-grid-glow footer-grid-glow-b" />

      <div className="footer-container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo-wrap">
              <img src="/assets/logo.png" alt="Red Shadow Design" className="footer-logo-image" />
            </div>
            <h3>Red Shadow Designs</h3>
            <p>Premium CAD modeling, 3D rendering and industrial design studio — Islamabad, Pakistan.</p>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Core Services</h4>
            <ul>
              {serviceMenu.slice(0, 8).map((service) => (
                <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.fiverr.com/daniyalahmad7" target="_blank" rel="noopener noreferrer" className="social-icon" title="Fiverr">F</a>
              <a href="#" className="social-icon" title="LinkedIn">in</a>
              <a href="#" className="social-icon" title="Instagram">📷</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Red Shadow Designs. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
