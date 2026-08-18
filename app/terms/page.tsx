import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Red Shadow Designs',
  description: 'Terms of Service for Red Shadow Designs — engineering and design studio in Islamabad, Pakistan.',
  alternates: { canonical: 'https://www.redshadowdesigns.com/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060912] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-32 lg:py-40">
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#7c3aed] text-xs font-mono uppercase tracking-widest mb-6">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-mono">Last updated: August 2025</p>
        </div>

        <div className="space-y-10 text-slate-700 dark:text-white/70 leading-relaxed text-base md:text-lg">

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Services</h2>
            <p>Red Shadow Designs provides mechanical engineering and product design services including CAD modeling, 3D rendering, prototyping, DFM review, and animation. By engaging our services, you agree to these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Project Engagement</h2>
            <p>All projects begin with a written brief, scope, and quoted deliverables agreed upon by both parties. Changes to scope mid-project may result in revised timelines and pricing. We communicate all changes clearly before proceeding.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Revisions</h2>
            <p>Revision rounds are defined per project in the initial quote. Revisions within scope are included. Revisions that represent a change of direction or scope may be quoted separately. We build our CAD models with adaptable feature trees to keep revisions efficient.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Intellectual Property</h2>
            <p>Upon receipt of full payment, all deliverables (CAD files, renders, animations) become the property of the client. Red Shadow Designs retains the right to display completed work in its portfolio unless a confidentiality or NDA agreement restricts this.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Confidentiality</h2>
            <p>All client project information is treated as confidential. We are happy to sign a mutual NDA before any sensitive information is shared. Contact us at <a href="mailto:hello@redshadowdesigns.com" className="text-[#7c3aed] underline">hello@redshadowdesigns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Payment</h2>
            <p>Payment terms are agreed upon at project commencement. Projects typically require a deposit before work begins, with the balance due upon delivery. Deliverables are released upon full payment.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Delivery &amp; File Formats</h2>
            <p>Deliverables are provided in the formats agreed in the project scope. Standard formats include STEP, IGES, STL, DWG, PDF drawings, PNG/JPEG renders, and MP4/MOV animations. Additional formats may be available on request.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Accuracy</h2>
            <p>We apply strict engineering standards to every project and back our work with a 99.9% dimensional accuracy standard. All CAD models are reviewed for DFM compliance before delivery. However, it remains the client&apos;s responsibility to validate files with their manufacturing partners before production.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Limitation of Liability</h2>
            <p>Red Shadow Designs is not liable for manufacturing defects, production costs, or downstream losses arising from the use of our deliverables. Our liability is limited to the value of the project fee paid.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">10. Governing Law</h2>
            <p>These terms are governed by the laws of Pakistan. Any disputes shall be resolved by mutual agreement in good faith.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">11. Contact</h2>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03]">
              <p className="font-semibold text-slate-900 dark:text-white">Red Shadow Designs</p>
              <p>Islamabad, Pakistan</p>
              <p>Email: <a href="mailto:hello@redshadowdesigns.com" className="text-[#7c3aed] underline">hello@redshadowdesigns.com</a></p>
              <p>Phone: <a href="tel:+923338917021" className="text-[#7c3aed] underline">+92 333 891 7021</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
