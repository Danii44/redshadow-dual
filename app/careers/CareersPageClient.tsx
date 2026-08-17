'use client'; // Careers Page Client Component


import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import './careers.css';

/* ── Open Roles Data ─────────────────────────────────── */
const openRoles = [
  {
    id: 'cad-engineer',
    title: 'Senior CAD Engineer',
    type: 'Full-time',
    location: 'Rawalpindi, PK',
    department: 'Engineering',
    icon: '⚙️',
    tag: 'Engineering',
    description:
      'Design precision parametric models using SolidWorks and PTC Creo for industrial and consumer products. You will collaborate closely with clients and lead DFM optimization for plastic injection molding and CNC machining workflows.',
    requirements: [
      '3+ years of professional experience with SolidWorks or PTC Creo.',
      'Strong understanding of ASME standards, GD&T, and manufacturing tolerances.',
      'Experience with STEP/STL export workflows for seamless manufacturing handoffs.',
      'Familiarity with sheet metal design and advanced surfacing.',
    ],
    niceToHave: ['FEA & CFD simulation background.'],
  },
  {
    id: '3d-artist',
    title: '3D Visualisation Artist',
    type: 'Full-time',
    location: 'Rawalpindi, PK',
    department: 'Creative',
    icon: '🎨',
    tag: 'Creative',
    description:
      'Create photorealistic product renders and cinematic visual assets using Blender and KeyShot. You will work on packaging visuals, investor decks, and digital marketing campaigns for international clients.',
    requirements: [
      '2+ years of professional 3D rendering experience.',
      'Expert proficiency in Blender and KeyShot.',
      'Strong portfolio demonstrating mastery over lighting, materials, and compositing.',
      'Proficiency in Adobe Photoshop for post-production.',
    ],
    niceToHave: ['Experience with Canva for pitch deck assembly.'],
  },
  {
    id: 'junior-mechanical-designer',
    title: 'Junior Mechanical Designer',
    type: 'Full-time',
    location: 'Rawalpindi, PK',
    department: 'Engineering',
    icon: '📐',
    tag: 'Engineering',
    description:
      'Handle technical drawings, delivery file formatting, and model revisions under the guidance of our senior engineers. You will help bridge the gap between initial concepts and manufacturing-ready deliverables.',
    requirements: [
      'Degree in Mechanical Engineering or a related technical field.',
      'Proficiency in 3D mechanical CAD design using SolidWorks.',
      'Strong understanding of mechanical assemblies and geometric constraints.',
      'Ability to prepare detailed 2D drafts and production-ready geometry.',
    ],
    niceToHave: [
      'Hands-on experience with FDM desktop 3D printers (e.g., Bambu Lab A1) for in-house prototyping.',
    ],
  },
  {
    id: 'motion-designer',
    title: 'Motion & Animation Designer',
    type: 'Full-time',
    location: 'Rawalpindi, PK',
    department: 'Creative',
    icon: '🎬',
    tag: 'Creative',
    description:
      'Produce cinematic product animations, mechanical exploded views, and motion sequences that showcase product function and assembly behavior for B2B pitches.',
    requirements: [
      'Strong reel demonstrating hardware and product animation.',
      'Expertise in Blender and Adobe After Effects.',
      'Ability to bring static CAD assemblies to life through precise mechanical kinematics.',
    ],
    niceToHave: ['Experience with Adobe Illustrator for vector graphic integration.'],
  },
  {
    id: 'office-project-manager',
    title: 'Office & Project Manager',
    type: 'Full-time',
    location: 'Rawalpindi, PK',
    department: 'Operations',
    icon: '📋',
    tag: 'Operations',
    description:
      'Own studio operations and client relationships from onboarding to final delivery. You will coordinate between the CAD and rendering teams, ensuring projects stay on timeline and strict quality standards are met.',
    requirements: [
      'Experience in a creative, technical, or engineering studio environment.',
      'Excellent written and verbal English communication.',
      'Ability to manage logistics and operations for a 24-hour private commercial office space.',
    ],
    niceToHave: [
      'Exposure to digital freelance marketplaces like Fiverr and tracking volume-driven project tiers.',
    ],
  },
];

/* ── Perks Data ────────────────────────────────────────── */
const perks = [
  {
    icon: '🌍',
    title: 'Global Engineering Reach',
    desc: 'Work on high-stakes, production-ready projects for hardware startups and enterprise clients across the US, Europe, and the Middle East.',
  },
  {
    icon: '🖥️',
    title: 'High-End Hardware Stack',
    desc: 'Never wait on slow render times. You will be equipped with dedicated, high-performance workstations, including optimized 3060 12GB rendering rigs.',
  },
  {
    icon: '🖨️',
    title: 'Hands-On 3D Printing',
    desc: 'Bring your CAD files into physical reality immediately. Our studio is equipped with a Bambu Lab A1 FDM printer for rapid, in-house mechanical testing.',
  },
  {
    icon: '🏢',
    title: '24/7 Commercial Studio',
    desc: 'Work in a dedicated, secure, 8-person commercial office space. Enjoy the flexibility of a 24-hour accessible environment tailored for deep, focused engineering work.',
  },
  {
    icon: '📈',
    title: 'Merit-Based Career Growth',
    desc: 'We reward competence and execution. Prove your mechanical insight and reliability, and transition quickly from probationary periods to highly compensated permanent roles.',
  },
  {
    icon: '🛡️',
    title: 'Zero-Toxicity Environment',
    desc: 'Join a tight-knit team with strict professional boundaries. We protect our studio culture so you can focus 100% on delivering exceptional design work without office politics.',
  },
];

/* ── Tag colors ────────────────────────────────────────── */
const tagColors: Record<string, string> = {
  Engineering: 'tag-engineering',
  Creative: 'tag-creative',
  Design: 'tag-design',
  Operations: 'tag-operations',
};

/* ── Application Form ──────────────────────────────────── */
type FormState = 'idle' | 'submitting' | 'success' | 'error';

function ApplicationForm({ role, onClose }: { role: (typeof openRoles)[0]; onClose: () => void }) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.experience.trim()) e.experience = 'Please share your experience';
    if (!formData.message.trim()) e.message = 'Cover note is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState('submitting');

    // Build mailto link as fallback (no backend needed)
    const subject = encodeURIComponent(`Application: ${role.title}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPortfolio: ${formData.portfolio}\n\nExperience:\n${formData.experience}\n\nCover Note:\n${formData.message}`
    );

    // Simulate a brief delay then open mailto
    await new Promise((r) => setTimeout(r, 800));
    window.location.href = `mailto:careers@redshadowdesigns.com?subject=${subject}&body=${body}`;
    setFormState('success');
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, type: 'spring', bounce: 0.2 }}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">Apply for</span>
            <h2 className="modal-title">{role.title}</h2>
            <div className="modal-meta">
              <span>{role.type}</span>
              <span className="dot">·</span>
              <span>{role.location}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {formState === 'success' ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Application Sent!</h3>
            <p>
              Your email client should have opened with your application pre-filled. If it didn't,
              please email us directly at{' '}
              <a href="mailto:careers@redshadowdesigns.com">careers@redshadowdesigns.com</a>.
            </p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="apply-name">Full Name *</label>
                <input id="apply-name" name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="apply-email">Email Address *</label>
                <input id="apply-email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="apply-phone">Phone (optional)</label>
                <input id="apply-phone" name="phone" type="tel" placeholder="+92 xxx xxx xxxx" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="apply-portfolio">Portfolio / LinkedIn (optional)</label>
                <input id="apply-portfolio" name="portfolio" type="url" placeholder="https://..." value={formData.portfolio} onChange={handleChange} />
              </div>
            </div>

            <div className={`form-field ${errors.experience ? 'has-error' : ''}`}>
              <label htmlFor="apply-experience">Years of Relevant Experience *</label>
              <select id="apply-experience" name="experience" value={formData.experience} onChange={handleChange}>
                <option value="">Select experience level</option>
                <option value="0-1 years">0–1 years (Graduate / Entry Level)</option>
                <option value="1-3 years">1–3 years</option>
                <option value="3-5 years">3–5 years</option>
                <option value="5-8 years">5–8 years</option>
                <option value="8+ years">8+ years (Senior)</option>
              </select>
              {errors.experience && <span className="field-error">{errors.experience}</span>}
            </div>

            <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="apply-message">Cover Note *</label>
              <textarea
                id="apply-message"
                name="message"
                rows={5}
                placeholder={`Tell us why you want to join Red Shadow Designs and what makes you a great fit for the ${role.title} role...`}
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <p className="form-note">
              Your application will be sent to{' '}
              <strong>careers@redshadowdesigns.com</strong> via your default email client.
            </p>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={formState === 'submitting'}>
                {formState === 'submitting' ? (
                  <span className="btn-loading">
                    <span className="spinner" /> Preparing…
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ─────────────────────────────────────────── */
export default function CareersPageClient() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedRole, setSelectedRole] = useState<(typeof openRoles)[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedRole ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedRole]);

  const ambientStyle = {
    '--scroll-offset': `${Math.min(scrollY * 0.12, 120)}px`,
    '--scroll-rise': `${Math.min(scrollY * 0.08, 70)}px`,
  } as CSSProperties;

  const filters = ['All', 'Engineering', 'Creative', 'Operations'];
  const filteredRoles = activeFilter === 'All' ? openRoles : openRoles.filter((r) => r.tag === activeFilter);

  return (
    <div className="homepage-shell" style={ambientStyle}>
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />

      <main className="homepage-main relative z-10">

        {/* ── Hero ────────────────────────────────────────── */}
        <section className="careers-hero">
          {/* Breadcrumb */}
          <div className="careers-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Careers</span>
          </div>

          <motion.div
            className="careers-hero-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            We&apos;re Hiring
          </motion.div>

          <motion.h1
            className="careers-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Build the future of{' '}
            <span className="careers-gradient">product design</span>
            <br />with us.
          </motion.h1>

          <motion.p
            className="careers-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            We're a tight-knit studio in Islamabad turning complex engineering into
            beautiful, production-ready designs. If you're obsessed with craft and
            precision — let's talk.
          </motion.p>

          <motion.a
            href="mailto:careers@redshadowdesigns.com"
            className="careers-email-cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            careers@redshadowdesigns.com
          </motion.a>
        </section>

        {/* ── Stats bar ───────────────────────────────────── */}
        <section className="careers-stats">
          {[
            { value: '100+', label: 'Products Delivered' },
            { value: '800+', label: 'Projects Completed' },
            { value: '550+', label: 'Global Clients' },
            { value: '5', label: 'Open Positions' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </section>

        {/* ── Perks ───────────────────────────────────────── */}
        <section className="careers-perks-section">
          <motion.div
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Red Shadow
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More than a job
          </motion.h2>
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                className="perk-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <span className="perk-icon">{perk.icon}</span>
                <h3 className="perk-title">{perk.title}</h3>
                <p className="perk-desc">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Open Roles ──────────────────────────────────── */}
        <section className="careers-roles-section">
          <motion.div
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Open Positions
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Find your role
          </motion.h2>

          {/* Filter pills */}
          <div className="role-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Role cards */}
          <div className="roles-list">
            <AnimatePresence mode="wait">
              {filteredRoles.map((role, i) => (
                <motion.article
                  key={role.id}
                  className="role-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  layout
                >
                  <div className="role-card-top">
                    <div className="role-icon-wrap">
                      <span className="role-icon">{role.icon}</span>
                    </div>
                    <div className="role-info">
                      <div className="role-tags">
                        <span className={`role-tag ${tagColors[role.tag]}`}>{role.tag}</span>
                        <span className="role-tag tag-type">{role.type}</span>
                        <span className="role-tag tag-location">📍 {role.location}</span>
                      </div>
                      <h3 className="role-title">{role.title}</h3>
                      <p className="role-desc">{role.description}</p>
                    </div>
                  </div>

                  <div className="role-card-bottom">
                    <div className="role-reqs">
                      <p className="req-heading">Requirements</p>
                      <ul>
                        {role.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                      {role.niceToHave.length > 0 && (
                        <>
                          <p className="req-heading nice">Nice to have</p>
                          <ul className="nice-list">
                            {role.niceToHave.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    <button
                      className="btn-apply"
                      onClick={() => setSelectedRole(role)}
                    >
                      Apply Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── General Application CTA ─────────────────────── */}
        <section className="careers-general-cta">
          <motion.div
            className="general-cta-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="cta-glow" />
            <span className="cta-eyebrow">Don't see your role?</span>
            <h2 className="cta-title">Send a general application</h2>
            <p className="cta-desc">
              We're always on the lookout for exceptional talent. If you think you'd be a great
              fit for our studio, send your portfolio and a short note to:
            </p>
            <a href="mailto:careers@redshadowdesigns.com" className="cta-email-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              careers@redshadowdesigns.com
            </a>
          </motion.div>
        </section>

      </main>

      {/* ── Application Modal ────────────────────────────── */}
      <AnimatePresence>
        {selectedRole && (
          <ApplicationForm role={selectedRole} onClose={() => setSelectedRole(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
