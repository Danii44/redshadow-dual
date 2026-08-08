export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
};

export const services: Service[] = [
  { id: 'product-design', slug: 'product-design', title: 'Product Design', description: 'End-to-end product design from concept to production, including CAD, prototyping and manufacturability.', image: '/assets/services/product-design.jpg' },
  { id: '3d-rendering', slug: '3d-rendering', title: '3D Rendering', description: 'Photorealistic 3D renders for marketing, packaging and product visualization.', image: '/assets/services/3d-rendering.jpg' },
  { id: 'industrial-design', slug: 'industrial-design', title: 'Industrial Design', description: 'Human-centered industrial design focused on ergonomics, aesthetics and production readiness.', image: '/assets/services/industrial-design.jpg' },
  { id: 'cad-modeling', slug: 'cad-modeling', title: 'CAD Modeling', description: 'Precision CAD modeling for engineering, simulation and manufacturing.', image: '/assets/services/cad-modeling.jpg' },
  { id: 'consulting', slug: 'consulting', title: 'Design Consulting', description: 'Strategy and design consulting to help product teams refine requirements and roadmaps.', image: '/assets/services/consulting.jpg' },
];

export function findService(slug: string) {
  return services.find(s => s.slug === slug) || null;
}

export function getAllServiceSlugs() {
  return services.map(s => s.slug);
}
