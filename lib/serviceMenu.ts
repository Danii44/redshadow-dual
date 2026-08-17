export type ServiceMenuItem = {
  slug: string;
  title: string;
};

export const serviceMenu: ServiceMenuItem[] = [
  { slug: 'feasibility-test', title: 'Feasibility' },
  { slug: 'cad-design', title: 'CAD' },
  { slug: 'mechanical-engineering', title: 'Engineering' },
  { slug: 'rapid-prototyping', title: 'Prototyping' },
  { slug: '3d-printing', title: '3D Printing' },
  { slug: 'design-for-manufacturing', title: 'DFM' },
  { slug: 'product-visualization-renders', title: 'Rendering' },
  { slug: 'product-animations', title: 'Animation' },
];
