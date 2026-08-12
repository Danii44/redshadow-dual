export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  size?: 'small' | 'large';
  year?: string;
  client?: string;
  tools?: string[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: 'orbai-spherical-drone',
      title: 'ORBAI Spherical Drone – CAD Design & 3D Renders',
    category: 'CAD Design',
    description: 'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering for an autonomous aerial platform.',
    image: '/assets/external/projects/orbai-spherical-drone.png',
    size: 'large',
    year: '2024',
    client: 'ORBAI Labs',
    tools: ['SolidWorks', 'KeyShot', 'Fusion 360'],
    highlights: ['Autonomous payload housing', 'Optimized internal sensor layout', 'High-strength shell geometry'],
  },
  {
    id: 'f1-car-keychain',
      title: 'Precision-Engineered F1 Race Car Keychain',
    category: 'CAD Design',
    description: 'Highly detailed, precision-engineered miniature F1 car model for CNC machining or SLA 3D printing.',
    image: '/assets/external/projects/f1-car-keychain.png',
    size: 'small',
    year: '2023',
    client: 'Motorsport Merch Co.',
    tools: ['Fusion 360', 'Rhino', 'KeyShot'],
    highlights: ['Exact scale detail', 'Interlocking keyring mount', 'Smooth print-ready topology'],
  },
  {
    id: 'tkr-implant',
      title: 'Total Knee Replacement (TKR) Implant',
    category: 'Medical',
    description: 'Anatomically accurate knee implant CAD model focusing on biomechanics, material specifications, and regulatory compliance.',
    image: '/assets/external/projects/tkr-implant.png',
    size: 'small',
    year: '2024',
    client: 'MedTech Innovations',
    tools: ['SolidWorks', 'ANSYS', 'AutoCAD'],
    highlights: ['Anatomical fit optimization', 'Multi-material compatibility', 'Regulatory drawing set'],
  },
  {
    id: 'ketchup-cap',
      title: 'Multi-Mode Ketchup Dispenser Cap – 3D Design',
    category: 'Product Design',
    description: 'Innovative ketchup dispensing cap design with precise mating geometry, engineered for injection molding production.',
    image: '/assets/external/projects/ketchup-cap.png',
    size: 'large',
    year: '2023',
    client: 'FoodPack Labs',
    tools: ['SolidWorks', 'KeyShot'],
    highlights: ['Leak-proof seal design', 'Ergonomic grip geometry', 'Injection mold draft analysis'],
  },
  {
    id: 'bull-lock',
      title: 'Bull Lock Mechanism',
    category: 'Industrial Design',
    description: 'Heavy-duty bull lock mechanism with fully articulated locking geometry, designed for agricultural and industrial applications.',
    image: '/assets/external/projects/bull-lock.png',
    size: 'small',
    year: '2024',
    client: 'Secure Farms',
    tools: ['Fusion 360', 'SolidWorks'],
    highlights: ['Reinforced cam profile', 'Manufacturable part geometry', 'Assembly tolerance control'],
  },
  {
    id: 'taupe-urn',
      title: 'Taupe Beverage Urn',
    category: '3D Rendering',
    description: 'Photorealistic 3D render of a premium taupe decorative urn with subsurface scattering material simulation.',
    image: '/assets/external/projects/taupe-urn.jpg',
    size: 'small',
    year: '2023',
    client: 'Archetype Home',
    tools: ['Blender', 'Substance Painter'],
    highlights: ['Realistic SSS shading', 'Studio lighting composition', 'Elegant form language'],
  },
  {
    id: 'compressor-chamber',
    title: 'Compressor Chamber',
    category: 'Industrial Design',
    description: 'Full parametric assembly of a compressor chamber with internal component packaging, tolerances, and thermal simulation.',
    image: '/assets/external/projects/compressor-chamber.png',
    size: 'large',
    year: '2024',
    client: 'Pressure Systems',
    tools: ['SolidWorks', 'ANSYS'],
    highlights: ['Internal flow path optimization', 'Modular service access', 'Thermal deformation control'],
  },
  {
    id: 'hero-render',
    title: 'Product Hero Render',
    category: '3D Rendering',
    description: 'Studio-quality hero render for product launch campaign materials, featuring dramatic lighting and precise texture work.',
    image: '/assets/external/projects/hero-render.png',
    size: 'small',
    year: '2023',
    client: 'LaunchPulse',
    tools: ['KeyShot', 'Blender'],
    highlights: ['Market-ready visuals', 'High-end materials', 'Brand-focused composition'],
  },
  {
    id: 'makeup-stick',
    title: 'Makeup Stick',
    category: 'Product Design',
    description: 'Sleek cosmetic makeup stick housing design with precision tolerance mating parts, ready for injection molding.',
    image: '/assets/external/projects/makeup-stick.png',
    size: 'small',
    year: '2024',
    client: 'GlowLab Cosmetics',
    tools: ['SolidWorks', 'Fusion 360'],
    highlights: ['Elegant click mechanism', 'Cosmetic-grade shell', 'Flat-pack shipping design'],
  },
  {
    id: 'camera-housing',
    title: 'Camera Housing',
    category: 'Hardware',
    description: 'Precision camera housing design with lens mount integration, weather sealing geometry, and ergonomic grip profiling.',
    image: '/assets/external/projects/camera-housing.jpg',
    size: 'large',
    year: '2023',
    client: 'CaptureTech',
    tools: ['SolidWorks', 'KeyShot'],
    highlights: ['Weatherproof enclosure', 'Precision lens alignment', 'User-focused ergonomics'],
  },
  {
    id: 'bamboo-toothbrush',
    title: 'Bamboo Toothbrush',
    category: 'Product Design',
    description: 'Eco-friendly bamboo toothbrush CAD model with ergonomic handle geometry and sustainability-focused material specifications.',
    image: '/assets/external/projects/bamboo-toothbrush.png',
    size: 'small',
    year: '2024',
    client: 'EcoBrush',
    tools: ['Fusion 360', 'Rhino'],
    highlights: ['Biodegradable structure', 'Human-factor ergonomics', 'Injection molded assembly'],
  },
  {
    id: 'open-assembly',
    title: 'Mechanical Assembly',
    category: 'CAD Design',
    description: 'Complex multi-component mechanical assembly with exploded view renders and full BOM documentation.',
    image: '/assets/external/projects/open-assembly.png',
    size: 'small',
    year: '2023',
    client: 'Mechanix Studio',
    tools: ['SolidWorks', 'AutoCAD'],
    highlights: ['Exploded assembly documentation', 'BOM-ready part structure', 'Tolerance stack analysis'],
  },
];

export function findProject(id: string) {
  return projects.find((p) => p.id === id) || null;
}

export function getAllProjectIds() {
  return projects.map((p) => p.id);
}
