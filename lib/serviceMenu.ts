export type ServiceMenuItem = {
  slug: string;
  title: string;
};

export const serviceMenu: ServiceMenuItem[] = [
  { slug: 'feasibility-test', title: 'Feasibility Test' },
  { slug: 'cad-design', title: 'CAD Design' },
  { slug: 'mechanical-engineering', title: 'Mechanical Engineering' },
  { slug: 'rapid-prototyping', title: 'Rapid Prototyping' },
  { slug: '3d-printing', title: '3D Printing' },
  { slug: 'design-for-manufacturing', title: 'Design for Manufacturing' },
  { slug: 'product-visualization-renders', title: 'Product Visualization / Renders' },
  { slug: 'product-animations', title: 'Product Animations' },
];
