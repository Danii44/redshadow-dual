import type { Metadata } from 'next';
import { findProject } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: `${project.title} | Red Shadow Designs`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://www.redshadowdesigns.com/portfolio/${project.id}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
        <p className="mt-4 text-white/70">We couldn't find that project.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto pt-28 pb-20 px-6 md:pt-32">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#090b15] shadow-[0_35px_120px_rgba(0,0,0,0.35)] mb-16">
        {project.image && (
          <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/90 via-[#02040a]/60 to-transparent" />
          </div>
        )}
        <div className="relative px-6 py-10 md:px-12 md:py-14 text-white">
          <p className="uppercase text-sm tracking-[0.3em] text-[#00d4ff]/80 mb-4">Portfolio project</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-6">
            <span>{project.category}</span>
            {project.year && <span>{project.year}</span>}
            {project.client && <span>Client: {project.client}</span>}
          </div>
          <p className="max-w-3xl text-white/70 leading-relaxed">{project.description}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-10">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <h2 className="text-3xl font-bold text-white mb-4">Project overview</h2>
            <p className="text-white/70 leading-relaxed">{project.description}</p>
          </section>

          {project.highlights?.length ? (
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-3xl font-bold text-white mb-4">Highlights</h2>
              <ul className="space-y-3 text-white/70">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#00d4ff]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.tools?.length ? (
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-3xl font-bold text-white mb-4">Tools used</h2>
              <div className="flex flex-wrap gap-3">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">{tool}</span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <h3 className="text-xl font-semibold text-white mb-4">Project details</h3>
            <dl className="space-y-4 text-white/70">
              {project.year && (
                <div>
                  <dt className="text-sm uppercase tracking-[0.18em] text-white/40">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.client && (
                <div>
                  <dt className="text-sm uppercase tracking-[0.18em] text-white/40">Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm uppercase tracking-[0.18em] text-white/40">Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.18em] text-white/40">Project type</dt>
                <dd>{project.size === 'large' ? 'Feature showcase' : 'Compact case study'}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <h3 className="text-xl font-semibold text-white mb-4">Why this project matters</h3>
            <p className="text-white/70 leading-relaxed">This project demonstrates our ability to combine high-fidelity CAD, product styling, and manufacturability in a single delivery.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
