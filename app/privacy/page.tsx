import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Red Shadow Designs',
  description: 'Privacy Policy for Red Shadow Designs — how we collect, use, and protect your information.',
  alternates: { canonical: 'https://www.redshadowdesigns.com/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060912] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-32 lg:py-40">
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-xs font-mono uppercase tracking-widest mb-6">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-mono">Last updated: August 2025</p>
        </div>

        <div className="space-y-10 text-slate-700 dark:text-white/70 leading-relaxed text-base md:text-lg">

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. About Red Shadow Designs</h2>
            <p>Red Shadow Designs is a mechanical engineering and product design studio based in Islamabad, Pakistan. We provide parametric CAD modeling, photorealistic 3D rendering, industrial product design, rapid prototyping, DFM review, and animation services to clients worldwide.</p>
            <p className="mt-3">Contact: <a href="mailto:hello@redshadowdesigns.com" className="text-[#00d4ff] underline">hello@redshadowdesigns.com</a> | <a href="tel:+923338917021" className="text-[#00d4ff] underline">+92 333 891 7021</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p>We may collect: your name, email, phone number (via contact form), project descriptions and files you share, standard web server usage data, and records of correspondence.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
            <p>We use collected information to respond to inquiries, deliver services, send project updates, and improve our website. We do not sell or share your personal information with third parties for marketing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Confidentiality &amp; NDAs</h2>
            <p>All client project information and intellectual property is treated as strictly confidential. We are happy to sign a mutual NDA before any sensitive project information is shared. Contact us at <a href="mailto:hello@redshadowdesigns.com" className="text-[#00d4ff] underline">hello@redshadowdesigns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Data Storage &amp; Security</h2>
            <p>Your information is stored on secure systems using industry-standard security measures. You may request deletion of your data at any time by emailing us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Cookies</h2>
            <p>Our website uses minimal local storage for theme preference (light/dark mode). We do not use advertising or third-party tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Third-Party Services</h2>
            <p>We use Web3Forms for contact form processing, Google Maps for the embedded map on our contact page, and link to Fiverr, LinkedIn, and Behance. Each is subject to their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time. Email <a href="mailto:hello@redshadowdesigns.com" className="text-[#00d4ff] underline">hello@redshadowdesigns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Contact Us</h2>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03]">
              <p className="font-semibold text-slate-900 dark:text-white">Red Shadow Designs</p>
              <p>Islamabad, Pakistan</p>
              <p>Email: <a href="mailto:hello@redshadowdesigns.com" className="text-[#00d4ff] underline">hello@redshadowdesigns.com</a></p>
              <p>Phone: <a href="tel:+923338917021" className="text-[#00d4ff] underline">+92 333 891 7021</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
