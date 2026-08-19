export type Intent = {
  intent: string;
  keywords: string[];
  response: string;
  quickReplies?: string[];
  action?: 'project_intake' | 'portfolio' | 'services' | 'contact' | 'whatsapp' | 'call';
};

export const chatbotKnowledge: Intent[] = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "start", "welcome", "greetings", "good morning", "good afternoon", "help", "menu"],
    response: "Hello! Welcome to Red Shadow Designs. We are a specialized CAD modeling, DFM engineering, and photorealistic 3D rendering studio.\n\nHow can I help you today?",
    quickReplies: [
      "CAD & Product Design",
      "DFM & Manufacturing",
      "Tolerances & Standards",
      "File Formats Delivered",
      "Pricing & Quotes",
      "Turnaround Time",
      "Start a Project",
      "WhatsApp Us"
    ]
  },
  {
    intent: "services",
    keywords: ["services", "what do you do", "what can you do", "offer", "offerings", "our services", "capabilities", "solutions"],
    response: "We provide end-to-end mechanical and industrial design engineering services:\n\n• Parametric CAD Modeling (SolidWorks, Creo, Inventor)\n• Design for Manufacturing (DFM for CNC, Injection Molding, Sheet Metal)\n• Photorealistic 3D Rendering (4K/8K Blender, Unreal Engine, KeyShot)\n• Medical Device CAD (ISO 13485-aligned enclosures & surgical tools)\n• 3D Printing & Rapid Prototyping (STL/3MF optimization)\n• Exploded & Dynamic Mechanism Animations\n• Reverse Engineering from 3D Scans & Physical Parts",
    quickReplies: ["CAD & Product Design", "DFM & Manufacturing", "3D Rendering", "Start a Project", "Contact Us"],
    action: "services"
  },
  {
    intent: "cad_product_design",
    keywords: [
      "cad", "cad design", "cad modeling", "3d cad", "3d model", "3d modeling",
      "mechanical model", "mechanical cad", "part modeling", "assembly design",
      "product design", "product development", "design a product", "new product",
      "product concept", "industrial design", "solidworks", "creo", "inventor", "parametric"
    ],
    response: "Our CAD & Industrial Product Design service creates precision parametric 3D models and multi-component mechanical assemblies.\n\n• Software: SolidWorks, PTC Creo, Autodesk Inventor, AutoCAD\n• Deliverables: Native CAD files, neutral STEP/IGES, dimensioned 2D engineering drawings (PDF/DWG)\n• Standards: Strict compliance with ASME Y14.5 GD&T standards for precise fits and tolerances.",
    quickReplies: ["Start a Project", "View Portfolio", "DFM & Manufacturing", "File Formats Delivered"]
  },
  {
    intent: "dfm",
    keywords: [
      "dfm", "design for manufacturing", "dfa", "design for assembly", "manufacturing design",
      "prepare for manufacturing", "manufacturing-ready", "manufacturing ready", "cnc",
      "injection molding", "sheet metal", "tooling", "draft angle", "wall thickness", "parting line"
    ],
    response: "Design for Manufacturing (DFM) ensures your product is engineered to be fabricated efficiently without costly tooling redesigns.\n\n• Plastic Injection Molding: Draft angle analysis (1°–3°), uniform wall thickness, rib/boss design, sink mark prevention\n• CNC Machining: Tool access optimization, standard internal corner radii, pocket depth ratios\n• Sheet Metal: Accurate bend radii, K-factor calculation, relief notches\n• All CAD assemblies undergo rigorous DFM checks before final release.",
    quickReplies: ["Start a Project", "Tolerances & Standards", "Pricing & Quotes"]
  },
  {
    intent: "tolerances_standards",
    keywords: [
      "tolerance", "tolerances", "standards", "gdt", "gd&t", "precision", "accuracy",
      "asme", "iso 2768", "iso 13485", "dimension", "dimensional accuracy", "limits and fits"
    ],
    response: "We engineer all parts to international precision standards:\n\n• GD&T: ASME Y14.5 Geometric Dimensioning & Tolerancing\n• General Tolerances: ISO 2768 (Fine to Medium, up to ±0.01mm for precision CNC components)\n• Medical Equipment: ISO 13485 engineering design alignment\n• 2D Drawings: Fully detailed engineering prints with datum references, feature control frames, and surface finish callouts.",
    quickReplies: ["DFM & Manufacturing", "Start a Project", "File Formats Delivered"]
  },
  {
    intent: "medical_cad",
    keywords: [
      "medical", "medical device", "medical cad", "iso 13485", "surgical", "health tech",
      "diagnostic", "enclosure", "biocompatible", "ergonomic"
    ],
    response: "We specialize in precision Medical Device CAD modeling and health-tech hardware enclosures.\n\n• Clean-line ergonomic designs for handheld surgical and diagnostic tools\n• Sensor and PCB mounting enclosures with IP65/IP67 ingress protection design\n• Design controls and documentation ready for ISO 13485 compliance and regulatory audits.",
    quickReplies: ["Start a Project", "View Portfolio", "Contact Us"]
  },
  {
    intent: "3d_printing",
    keywords: [
      "3d printing", "print", "printing", "stl", "3mf", "fdm", "sla", "sls", "prototyping",
      "rapid prototyping", "printed prototype", "watertight mesh", "wall thickness"
    ],
    response: "We optimize CAD geometry specifically for Additive Manufacturing (3D Printing):\n\n• Watertight, high-density STL, OBJ, and 3MF files\n• Minimum wall thickness verification and overhang / support minimization\n• Clearance allowances tailored for FDM, SLA, SLS, and PolyJet tolerances (0.2mm–0.4mm snap-fit clearances).",
    quickReplies: ["Start a Project", "File Formats Delivered", "Pricing & Quotes"]
  },
  {
    intent: "rendering",
    keywords: [
      "render", "rendering", "3d rendering", "product render", "realistic render",
      "photorealistic", "visualization", "product visualization", "keyshot", "blender",
      "unreal engine", "lighting", "materials", "textures", "4k render"
    ],
    response: "We create ultra-high resolution (4K/8K) photorealistic 3D product renderings:\n\n• Studio product lighting, realistic PBR materials, custom textures, and lifestyle scenes\n• Tools: Blender (Cycles), Cinema 4D, KeyShot, Unreal Engine 5\n• Use cases: E-commerce listings (Amazon, Shopify), investor pitch decks, marketing campaigns, and packaging.",
    quickReplies: ["View Portfolio", "Start a Project", "Animation Services"]
  },
  {
    intent: "animation",
    keywords: [
      "animation", "product animation", "engineering animation", "exploded animation",
      "mechanism animation", "motion", "video", "exploded view", "3d video", "kinematics"
    ],
    response: "Our 3D animation services clearly communicate complex mechanical functions:\n\n• Exploded assembly & disassembly animations showing internal components\n• Kinematic mechanism motion simulation and working principles\n• Cinematic 4K marketing animations with synchronized motion and camera choreography.",
    quickReplies: ["View Portfolio", "Start a Project", "3D Rendering"]
  },
  {
    intent: "reverse_engineering",
    keywords: [
      "reverse engineering", "scan to cad", "3d scan", "recreate part", "point cloud",
      "mesh to cad", "broken part", "legacy part"
    ],
    response: "We convert 3D scan data (mesh / point cloud), physical parts, or legacy blueprints into clean, fully editable parametric 3D CAD models (SolidWorks / STEP) with design optimization and updated tolerances.",
    quickReplies: ["Start a Project", "File Formats Delivered", "Contact Us"]
  },
  {
    intent: "file_formats",
    keywords: [
      "files", "file format", "file formats", "file types", "step", "stp", "iges", "igs",
      "stl", "obj", "3mf", "dwg", "dxf", "pdf", "sldprt", "sldasm", "deliverables", "what files do i get"
    ],
    response: "We deliver complete industry-standard file packages:\n\n• Neutral 3D CAD: STEP (.step, .stp), IGES (.iges, .igs), Parasolid (.x_t)\n• Native CAD: SolidWorks (.sldprt, .sldasm), Autodesk Inventor (.ipt, .iam)\n• 3D Printing / Polygon: STL, OBJ, 3MF, FBX, GLB / GLTF\n• 2D Drawings: PDF blueprints with GD&T, DWG, DXF\n• Visuals: High-res PNG (transparent background), JPG, 4K MP4 videos.",
    quickReplies: ["Start a Project", "Tolerances & Standards", "Pricing & Quotes"]
  },
  {
    intent: "portfolio",
    keywords: [
      "portfolio", "examples", "work", "past work", "projects", "case study",
      "case studies", "mechanical design examples", "product design examples", "see your work", "samples"
    ],
    response: "You can explore our curated portfolio featuring consumer electronics, industrial equipment, wearable hardware, and precision engineering projects.",
    quickReplies: ["View Portfolio", "Start a Project", "Contact Us"],
    action: "portfolio"
  },
  {
    intent: "pricing",
    keywords: [
      "price", "pricing", "cost", "how much", "quote", "estimate", "rates", "budget", "billing", "fee"
    ],
    response: "We offer transparent, competitive pricing structured around your project needs:\n\n• Fixed-Price Projects: Clear milestone deliverables with defined scopes\n• Dedicated Engineering Support: Hourly or retainer consulting for ongoing product development\n• Free 24-Hour Review: Share your sketch, CAD, or requirements for an itemized quotation within 24 hours.",
    quickReplies: ["Start a Project", "Turnaround Time", "Contact Us", "WhatsApp Us"]
  },
  {
    intent: "turnaround_time",
    keywords: [
      "turnaround", "timeline", "how long", "delivery time", "deadline", "duration",
      "urgent", "rush", "speed", "fast", "schedule"
    ],
    response: "Our standard turnaround schedules:\n\n• Single Part CAD / Quick Render: 2–4 business days\n• Complete Product Assembly & DFM: 4–8 business days\n• Complex Mechanical Systems: 1–3 weeks with phased milestone deliveries\n• Rush Delivery: 24–48 hour expedited delivery available for urgent deadlines.",
    quickReplies: ["Start a Project", "Pricing & Quotes", "Contact Us"]
  },
  {
    intent: "nda_confidentiality",
    keywords: [
      "nda", "confidentiality", "intellectual property", "ip", "privacy", "agreement",
      "secret", "non disclosure", "ownership", "copyright", "security"
    ],
    response: "Your intellectual property is 100% safe with us:\n\n• We readily sign mutual Non-Disclosure Agreements (NDAs) prior to receiving your project files.\n• Full, exclusive IP ownership transfers to you immediately upon final project delivery.\n• Files and design data are stored in secure, encrypted environments and never shared without permission.",
    quickReplies: ["Start a Project", "Contact Us", "WhatsApp Us"]
  },
  {
    intent: "revisions",
    keywords: [
      "revision", "revisions", "changes", "modifications", "edits", "adjustments",
      "guarantee", "satisfaction", "what if i need changes"
    ],
    response: "Every project includes standard revision rounds to ensure the final output matches your specifications and manufacturing tolerances 100%. We collaborate closely with you throughout each milestone until you are completely satisfied.",
    quickReplies: ["Start a Project", "Turnaround Time", "Pricing & Quotes"]
  },
  {
    intent: "sketch_concept",
    keywords: [
      "sketch", "from a sketch", "hand drawn", "napkin", "concept", "idea", "rough sketch", "photo", "drawing"
    ],
    response: "Yes! You don't need existing CAD files to begin. We frequently work from hand sketches, reference photos, dimensions, or verbal concept descriptions to engineer your 3D CAD model from scratch.",
    quickReplies: ["Start a Project", "File Formats Delivered", "Contact Us"]
  },
  {
    intent: "location_contact",
    keywords: [
      "contact", "contact us", "email", "phone", "call", "reach out", "location",
      "where are you located", "where are you", "islamabad", "pakistan", "office", "address"
    ],
    response: "Red Shadow Designs is based in Islamabad, Pakistan, serving hardware startups, product innovators, and industrial engineering teams worldwide.\n\n• Email: hello@redshadowdesigns.com\n• Phone / WhatsApp: +92 333 891 7021\n• Available across North America, Europe, Middle East, and Asia-Pacific time zones.",
    quickReplies: ["Contact Us", "WhatsApp Us", "Start a Project"],
    action: "contact"
  },
  {
    intent: "whatsapp",
    keywords: ["whatsapp", "whatsapp us", "message", "chat on whatsapp", "text"],
    response: "You can chat directly with our lead engineering team on WhatsApp at +92 333 891 7021.",
    quickReplies: ["WhatsApp Us", "Start a Project"],
    action: "whatsapp"
  },
  {
    intent: "project_intake",
    keywords: [
      "start a project", "begin project", "new project", "hire", "inquiry",
      "book a project", "request a quote", "get started", "order", "get quote"
    ],
    response: "Let's get started on your project! What is your name?",
    action: "project_intake"
  }
];

export const fallbackResponse = {
  response: "I can assist you with CAD modeling, DFM engineering, 3D photorealistic rendering, medical device design, pricing, file formats, or scheduling a project quote.\n\nWhat would you like to explore?",
  quickReplies: [
    "CAD & Product Design",
    "DFM & Manufacturing",
    "File Formats Delivered",
    "Pricing & Quotes",
    "Start a Project",
    "WhatsApp Us"
  ]
};
