export type ServiceData = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  tools: string[];
  deliverables: string[];
  longDescription: string;
  heroImage: string;
  faq: { question: string; answer: string }[];
};

export const servicesData: ServiceData[] = [
  {
    slug: 'cad-design',
    title: 'CAD Design',
    description: 'Precision CAD design services for mechanical, industrial, and product engineering projects using SolidWorks, Fusion 360, and Rhino.',
    keywords: ['CAD Design Islamabad', 'SolidWorks modeling', 'parametric CAD design', 'engineering CAD services'],
    tools: ['SolidWorks', 'Fusion 360', 'Rhino', 'AutoCAD'],
    deliverables: ['STEP', 'IGES', 'STL', 'DWG', 'PDF drawings'],
    longDescription:
      'Red Shadow Designs offers precision CAD design services for mechanical engineering, industrial product development, and manufacturing-ready models. We ensure tolerance compliance, assembly accuracy, and fully documented technical geometry.',
    heroImage: '/assets/images/services/cad-design.jpg',
    faq: [
      {
        question: 'What file formats do you deliver for CAD Design projects?',
        answer: 'We deliver STEP, IGES, STL, DWG, and PDF drawings so your design is ready for manufacturing, CNC machining, and 3D printing.',
      },
      {
        question: 'How fast can I get a CAD Design model from Red Shadow Designs?',
        answer: 'Standard delivery is 5–7 business days for CAD design projects, with rush turnaround available for urgent mechanical and product engineering work.',
      },
      {
        question: 'Can you produce manufacturing-ready CAD files?',
        answer: 'Yes. Every CAD model is built with manufacturing constraints in mind and delivered as production-ready STEP and STL files.',
      },
      {
        question: 'Do you support detailed assembly and part-level drawings?',
        answer: 'Absolutely. We provide fully documented assemblies, exploded views, and part-level drawings with tolerance and fit annotations.',
      },
    ],
  },
  {
    slug: '3d-rendering',
    title: '3D Rendering',
    description: 'Photorealistic 3D rendering and visualization services for product marketing, packaging, and design validation.',
    keywords: ['3D rendering studio Islamabad', 'photorealistic rendering', 'product visualization', 'Blender 3D renders'],
    tools: ['Blender', 'KeyShot', 'Cinema 4D', 'Unreal Engine'],
    deliverables: ['PNG', 'JPEG', 'TIFF', 'MP4', 'MOV'],
    longDescription:
      'Red Shadow Designs delivers photorealistic 3D rendering services for product visuals, marketing assets, packaging concepts, and engineering review. We use advanced lighting, materials, and compositing for polished results.',
    heroImage: '/assets/images/services/3d-rendering.jpg',
    faq: [
      {
        question: 'What is included in your 3D Rendering service?',
        answer: 'Our 3D Rendering service includes realistic lighting, texture, camera composition, and final high-resolution imagery for product marketing and investor pitches.',
      },
      {
        question: 'Which render engines do you use?',
        answer: 'We use Blender Cycles, KeyShot, Cinema 4D, and Unreal Engine for high-quality photorealistic rendering and animation.',
      },
      {
        question: 'How long does a single 3D render take?',
        answer: 'Typical render turnaround is 4–8 business days depending on scene complexity and asset preparation.',
      },
      {
        question: 'Can I get animation or turntable renders?',
        answer: 'Yes. We produce animated product turntables, exploded view sequences, and motion-ready MP4 or MOV files.',
      },
    ],
  },
  {
    slug: 'product-design',
    title: 'Product Design',
    description: 'Industrial product design services that merge aesthetics, ergonomics, and manufacturability for hardware and consumer products.',
    keywords: ['product design Islamabad', 'industrial design studio', 'ergonomic product design', 'product development services'],
    tools: ['SolidWorks', 'Fusion 360', 'Rhino', 'KeyShot'],
    deliverables: ['STEP', 'STL', 'FBX', 'PNG', 'PDF'],
    longDescription:
      'Red Shadow Designs provides industrial product design from concept through production-ready CAD geometry. We optimize for usability, aesthetics, and manufacturing viability.',
    heroImage: '/assets/images/services/product-design.jpg',
    faq: [
      {
        question: 'Can Red Shadow Designs help with product concept development?',
        answer: 'Yes. We develop product concepts with user ergonomics, manufacturability, and brand positioning in mind.',
      },
      {
        question: 'What deliverables are included for Product Design?',
        answer: 'We deliver concept models, CAD geometry, render-ready visuals, and manufacturing-ready files such as STEP, STL, FBX, and PDF documentation.',
      },
      {
        question: 'Do you provide DFM reviews for product design?',
        answer: 'Yes. Our workflow includes design for manufacturing checks and manufacturability feedback for injection molding, CNC, and sheet metal.',
      },
      {
        question: 'How do you balance aesthetics and engineering in product design?',
        answer: 'We combine industrial design with engineering validation so products look premium while remaining manufacturable and cost-efficient.',
      },
    ],
  },
  {
    slug: 'engineering',
    title: 'Engineering',
    description: 'Mechanical and industrial engineering services for assemblies, mechanisms, and manufacturing-ready CAD workflows.',
    keywords: ['engineering services Islamabad', 'mechanical engineering design', 'manufacturing-ready CAD', 'DFM engineering'],
    tools: ['SolidWorks', 'AutoCAD', 'ANSYS', 'Fusion 360'],
    deliverables: ['STEP', 'IGES', 'CAD assembly', 'STL', '2D drawings'],
    longDescription:
      'Red Shadow Designs delivers engineering services for mechanical assemblies, mechanisms, and production-ready CAD models, backed by DFM and tolerance-aware design.',
    heroImage: '/assets/images/services/engineering.jpg',
    faq: [
      {
        question: 'What engineering services do you offer?',
        answer: 'We offer mechanical engineering, assembly modeling, tolerance analysis, DFM validation, and manufacturing-ready CAD deliverables.',
      },
      {
        question: 'Do you provide 2D manufacturing drawings?',
        answer: 'Yes. We can provide detailed 2D drawings, BOMs, and annotation-rich documentation for production release.',
      },
      {
        question: 'What tools do you use for engineering design?',
        answer: 'We use SolidWorks, AutoCAD, Fusion 360, and ANSYS for engineering models and analysis-ready CAD workflows.',
      },
      {
        question: 'Are your engineering models ready for CNC and 3D printing?',
        answer: 'Yes. All models are validated for CNC machining and 3D printing and delivered as STEP, IGES, and STL files.',
      },
    ],
  },
];

const serviceAliases: Record<string, string> = {
  'feasibility-test': 'cad-design',
  'mechanical-engineering': 'engineering',
  'rapid-prototyping': 'product-design',
  '3d-printing': '3d-rendering',
  'design-for-manufacturing': 'engineering',
  'product-visualization-renders': '3d-rendering',
  'product-animations': '3d-rendering',
};

export const serviceSlugs = [
  ...new Set([...servicesData.map((service) => service.slug), ...Object.keys(serviceAliases)]),
];

export function getServiceBySlug(slug: string) {
  const normalizedSlug = serviceAliases[slug] ?? slug;
  return servicesData.find((service) => service.slug === normalizedSlug) ?? null;
}
