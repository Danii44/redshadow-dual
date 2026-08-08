/**
 * Services.tsx - Services Showcase Section
 * 
 * Design: Glass cards with hover depth and animations
 * - 8 service categories
 * - Glassmorphism cards with glowing borders
 * - Staggered entrance animations
 */

import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    title: 'Mechanical Engineering',
    description: 'Precision mechanical design and analysis',
    icon: '⚙️',
  },
  {
    title: 'CAD Design',
    description: 'Professional CAD modeling and documentation',
    icon: '📐',
  },
  {
    title: '3D Product Design',
    description: 'Complete product visualization and prototyping',
    icon: '🎨',
  },
  {
    title: 'Reverse Engineering',
    description: 'Detailed analysis and reconstruction',
    icon: '🔍',
  },
  {
    title: '3D Printing',
    description: 'Additive manufacturing solutions',
    icon: '🖨️',
  },
  {
    title: 'Product Rendering',
    description: 'Photorealistic visualization and presentation',
    icon: '✨',
  },
  {
    title: 'Industrial Design',
    description: 'Form, function, and aesthetic excellence',
    icon: '🏭',
  },
  {
    title: 'Graphic Design',
    description: 'Visual identity and marketing materials',
    icon: '🎭',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive engineering and design solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-glow"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
