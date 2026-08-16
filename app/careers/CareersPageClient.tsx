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
    location: 'Islamabad, PK',
    department: 'Engineering',
    icon: '⚙️',
    tag: 'Engineering',
    description:
      'Design precision parametric models using SolidWorks and AutoCAD for industrial, medical, and consumer products. You will collaborate closely with clients and lead DFM validation.',
    requirements: [
      '3+ years with SolidWorks or equivalent parametric CAD',
      'Strong understanding of GD&T and manufacturing tolerances',
      'Experience with STEP/IGES/STL export workflows',
      'Familiarity with sheet metal and injection moulding design',
    ],
    niceToHave: ['Experience with Fusion 360', 'FEA simulation background'],
  },
  {
    id: '3d-artist',
    title: '3D Visualisation Artist',
    type: 'Full-time',
    location: 'Islamabad, PK',
    department: 'Creative',
    icon: '🎨',
    tag: 'Creative',
    description:
      'Create photorealistic product renders and animations using Blender and Cinema 4D. You will work on packaging visuals, investor decks, and marketing campaigns for international clients.',
    requirements: [
      '2+ years professional 3D rendering experience',
      'Proficiency in Blender (Cycles/EEVEE) or Cinema 4D',
      'Strong portfolio of product visualizations',
      'Understanding of lighting, materials, and compositing',
    ],
    niceToHave: ['Unreal Engine experience', 'Motion graphics skills'],
  },
  {
    id: 'industrial-designer',
    title: 'Industrial Designer',
    type: 'Full-time',
    location: 'Islamabad, PK',
    department: 'Design',
    icon: '✏️',
    tag: 'Design',
    description:
      'Concept, sketch, and develop innovative product designs from early ideation to manufacturing-ready deliverables. You will work across consumer electronics, medical devices, and lifestyle products.',
    requirements: [
      'Degree in Industrial Design or Product Design',
      '2+ years of professional industrial design experience',
      'Proficiency in Rhino or Alias Surface Modelling',
      'Strong sketching and ideation skills',
    ],
    niceToHave: ['Experience with CMF (Colour, Material, Finish)', 'Keyshot rendering skills'],
  },
  {
    id: 'motion-designer',
    title: 'Motion & Animation Designer',
    type: 'Part-time / Freelance',
    location: 'Remote',
    department: 'Creative',
    icon: '🎬',
    tag: 'Creative',
    description:
      'Produce cinematic product animations, explainer videos, and brand motion content. Collaborating with our 3D team to bring products to life for marketing and investor presentations.',
    requirements: [
      'Strong reel demonstrating product animation',
      'Expertise in After Effects and Premiere Pro',
      '3D animation experience (Blender or Cinema 4D)',
      'Ability to work to tight deadlines',
    ],
    niceToHave: ['Sound design basics', 'Experience with 360° video'],
  },
  {
    id: 'project-manager',
    title: 'Client Project Manager',
    type: 'Full-time',
    location: 'Islamabad, PK',
    department: 'Operations',
    icon: '📋',
    tag: 'Operations',
    description:
      'Own client relationships from onboarding to delivery. You will coordinate between designers, engineers, and clients — keeping projects on time and stakeholders informed.',
    requirements: [
      '3+ years in project or account management',
      'Experience in a creative or engineering environment',
      'Excellent written and verbal English communication',
      'Familiarity with project management tools (Notion, Linear, etc.)',
    ],
    niceToHave: ['PMP or PRINCE2 certification', 'Exposure to CAD/design workflows'],
  },
];

/* ── Perks Data ────────────────────────────────────────── */
const perks = [
  { icon: '🌍', title: 'International Clients', desc: 'Work on projects for brands across North America, Europe, and the Middle East.' },
  { icon: '🚀', title: 'Fast Growth', desc: 'Join at an exciting growth phase and shape the culture and direction of the studio.' },
  { icon: '🎓', title: 'Learning Budget', desc: 'Annual learning budget for courses, software licences, and conferences.' },
  { icon: '🏠', title: 'Flexible Hours', desc: 'Core hours with flexible start/end times. Remote options for eligible roles.' },
  { icon: '💡', title: 'Creative Freedom', desc: 'Bring your ideas to the table. We value initiative and creative thinking.' },
  { icon: '🤝', title: 'Collaborative Team', desc: 'A small, tight-knit team where your work has a visible, direct impact.' },
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

  const filters = ['All', 'Engineering', 'Creative', 'Design', 'Operations'];
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
            { value: '5+', label: 'Years of Studio Experience' },
            { value: '200+', label: 'Projects Delivered' },
            { value: '30+', label: 'Countries Served' },
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
