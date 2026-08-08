/**
 * Portfolio.tsx - Portfolio Showcase Section
 * 
 * Design: Immersive glass presentations with 3D effects
 * - Portfolio cards with hover depth and tilt
 * - Glassmorphism with reflections
 * - Staggered animations
 */

import { motion } from 'framer-motion';
import './Portfolio.css';

const projects = [
  {
    title: 'Hypercar Visualization',
    category: 'Product Rendering',
    description: 'Photorealistic 3D rendering of a futuristic hypercar',
  },
  {
    title: 'Mechanical Gearbox',
    category: 'CAD Design',
    description: 'Complex mechanical assembly with precision engineering',
  },
  {
    title: 'Drone Design',
    category: '3D Product Design',
    description: 'Advanced aerial vehicle design and prototyping',
  },
  {
    title: 'Industrial Robot',
    category: 'Mechanical Engineering',
    description: 'Robotic arm with detailed mechanical analysis',
  },
  {
    title: 'Engine Block',
    category: 'Reverse Engineering',
    description: 'Complete reconstruction from physical specimen',
  },
  {
    title: 'Additive Manufacturing',
    category: '3D Printing',
    description: 'Complex geometry optimized for 3D printing',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            Featured projects showcasing our expertise
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="portfolio-card"
              variants={itemVariants}
              whileHover={{ y: -12, rotateX: 5 }}
            >
              <div className="portfolio-image-placeholder">
                <div className="placeholder-icon">📦</div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-card-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
              </div>
              <div className="portfolio-glow"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Portfolio;
