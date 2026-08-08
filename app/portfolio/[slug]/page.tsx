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
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-4 text-muted-foreground">We couldn't find that project.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-20 px-6">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-sm text-muted-foreground">{project.category}</p>
      </section>

      <section>
        {project.image && <img src={project.image} alt={project.title} className="w-full rounded-xl mb-6 object-cover" />}
        <p className="prose leading-relaxed">{project.description}</p>
      </section>
    </main>
  );
}
