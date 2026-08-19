-- ==============================================================================
-- RED SHADOW DESIGNS - SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Go to the "SQL Editor" in the left navigation.
-- 3. Click "New Query", paste this entire file content, and click "Run" (or Ctrl+Enter).
-- 4. That's it! Your tables, storage bucket, policies, and initial data are ready.
-- ==============================================================================

-- 1. CREATE PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY, -- Slug identifier, e.g. 'orbai-spherical-drone'
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'CAD Design',
  description TEXT NOT NULL,
  image TEXT,
  size TEXT DEFAULT 'large',
  year TEXT DEFAULT '2024',
  client TEXT,
  tools TEXT[] DEFAULT ARRAY[]::TEXT[],
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CREATE SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  tools TEXT[] DEFAULT ARRAY[]::TEXT[],
  deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
  long_description TEXT NOT NULL,
  hero_image TEXT,
  faq JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 4. CREATE POLICIES FOR PROJECTS
-- Allow everyone to read projects (Public Read)
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON public.projects;
CREATE POLICY "Public projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (true);

-- Allow insert/update/delete from API
DROP POLICY IF EXISTS "Allow all modifications for projects" ON public.projects;
CREATE POLICY "Allow all modifications for projects" 
  ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- 5. CREATE POLICIES FOR SERVICES
-- Allow everyone to read services (Public Read)
DROP POLICY IF EXISTS "Public services are viewable by everyone" ON public.services;
CREATE POLICY "Public services are viewable by everyone" 
  ON public.services FOR SELECT USING (true);

-- Allow insert/update/delete from API
DROP POLICY IF EXISTS "Allow all modifications for services" ON public.services;
CREATE POLICY "Allow all modifications for services" 
  ON public.services FOR ALL USING (true) WITH CHECK (true);

-- 6. SETUP STORAGE BUCKET FOR PORTFOLIO IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for portfolio-images bucket
DROP POLICY IF EXISTS "Public Access for Portfolio Images" ON storage.objects;
CREATE POLICY "Public Access for Portfolio Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Allow Upload to Portfolio Images" ON storage.objects;
CREATE POLICY "Allow Upload to Portfolio Images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Allow Update and Delete Portfolio Images" ON storage.objects;
CREATE POLICY "Allow Update and Delete Portfolio Images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'portfolio-images');

-- 7. INITIAL SEED DATA FOR PROJECTS
INSERT INTO public.projects (id, title, category, description, image, size, year, client, tools, highlights)
VALUES
(
  'orbai-spherical-drone',
  'ORBAI Spherical Drone – CAD Design & 3D Renders',
  'CAD Design',
  'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering for an autonomous aerial platform.',
  '/assets/external/projects/orbai-spherical-drone.webp',
  'large',
  '2024',
  'ORBAI Labs',
  ARRAY['SolidWorks', 'KeyShot', 'Fusion 360'],
  ARRAY['Autonomous payload housing', 'Optimized internal sensor layout', 'High-strength shell geometry']
),
(
  'f1-car-keychain',
  'Precision-Engineered F1 Race Car Keychain',
  'CAD Design',
  'Highly detailed, precision-engineered miniature F1 car model for CNC machining or SLA 3D printing.',
  '/assets/external/projects/f1-car-keychain.webp',
  'small',
  '2023',
  'Motorsport Merch Co.',
  ARRAY['Fusion 360', 'Rhino', 'KeyShot'],
  ARRAY['Exact scale detail', 'Interlocking keyring mount', 'Smooth print-ready topology']
),
(
  'tkr-implant',
  'Total Knee Replacement (TKR) Implant',
  'Medical',
  'Anatomically accurate knee implant CAD model focusing on biomechanics, material specifications, and regulatory compliance.',
  '/assets/external/projects/tkr-implant.webp',
  'small',
  '2024',
  'MedTech Innovations',
  ARRAY['SolidWorks', 'ANSYS', 'AutoCAD'],
  ARRAY['Anatomical fit optimization', 'Multi-material compatibility', 'Regulatory drawing set']
),
(
  'ketchup-cap',
  'Multi-Mode Ketchup Dispenser Cap – 3D Design',
  'Product Design',
  'Innovative ketchup dispensing cap design with precise mating geometry, engineered for injection molding production.',
  '/assets/external/projects/ketchup-cap.webp',
  'large',
  '2023',
  'FoodPack Labs',
  ARRAY['SolidWorks', 'KeyShot'],
  ARRAY['Leak-proof seal design', 'Ergonomic grip geometry', 'Injection mold draft analysis']
),
(
  'bull-lock',
  'Bull Lock Mechanism',
  'Industrial Design',
  'Heavy-duty bull lock mechanism with fully articulated locking geometry, designed for agricultural and industrial applications.',
  '/assets/external/projects/bull-lock.webp',
  'small',
  '2024',
  'AgriTech Hardware',
  ARRAY['Creo', 'SolidWorks', 'KeyShot'],
  ARRAY['High-shear locking pin', 'Weather-resistant housing', 'Low-effort latch actuation']
),
(
  'smart-watch-assembly',
  'Smart Watch Assembly – Exploded Engineering View',
  'Consumer Tech',
  'Complete mechanical and aesthetic breakdown of a sleek wearable device, featuring sensor housing, chassis integration, and screen bezel.',
  '/assets/external/projects/smart-watch-assembly.webp',
  'small',
  '2024',
  'Aura Wearables',
  ARRAY['SolidWorks', 'Blender', 'KeyShot'],
  ARRAY['Compact internal component packing', 'Water-resistant gasket channels', 'Exploded visualization rendering']
),
(
  'pneumatic-piston-engine',
  'Pneumatic Piston Engine – Precision CAD Assembly',
  'Mechanical Design',
  'Fully modeled multi-cylinder pneumatic piston engine with functional valve timing, connecting rods, and crankshaft geometry.',
  '/assets/external/projects/pneumatic-piston-engine.webp',
  'large',
  '2023',
  'AeroDynamics Corp',
  ARRAY['SolidWorks', 'AutoCAD', 'KeyShot'],
  ARRAY['Dynamic motion study ready', 'Accurate tolerance stackups', 'Production-ready 2D drafting']
),
(
  'quadcopter-frame',
  'Quadcopter Carbon Fiber Drone Frame',
  'Aerospace',
  'Ultra-lightweight aerodynamic drone chassis optimized for stiffness, payload balance, and rapid component assembly.',
  '/assets/external/projects/quadcopter-frame.webp',
  'small',
  '2024',
  'SkyVector Dynamics',
  ARRAY['Fusion 360', 'SolidWorks'],
  ARRAY['Weight reduction pockets', 'Modular arm replacements', 'Vibration-damped flight controller mount']
),
(
  'modular-power-hub',
  'Modular Industrial Power Hub',
  'Product Design',
  'Industrial-grade modular power distribution unit with integrated thermal dissipation ribs and ruggedized corner bumpers.',
  '/assets/external/projects/modular-power-hub.webp',
  'small',
  '2024',
  'VoltGrid Systems',
  ARRAY['Creo', 'KeyShot', 'SolidWorks'],
  ARRAY['Thermal airflow channel optimization', 'IP65 sealing geometry', 'Snap-fit quick release latches']
),
(
  'robotic-gripper-arm',
  'Robotic End-Effector Gripper Arm',
  'Robotics',
  'Precision parallel gripper mechanism designed for collaborative robotics, high-repeatability pick-and-place, and modular fingertips.',
  '/assets/external/projects/robotic-gripper-arm.webp',
  'large',
  '2024',
  'Cobotix Robotics',
  ARRAY['SolidWorks', 'ANSYS', 'KeyShot'],
  ARRAY['High grip-to-weight ratio', 'Integrated linear rail guides', 'Custom silicone fingertip molds']
),
(
  'coffee-grinder-chassis',
  'Minimalist Conical Burr Coffee Grinder',
  'Consumer Tech',
  'Stepless adjustment conical burr coffee grinder chassis with precision motor alignment and anti-static chute design.',
  '/assets/external/projects/coffee-grinder-chassis.webp',
  'small',
  '2023',
  'BaristaCraft',
  ARRAY['SolidWorks', 'Blender', 'KeyShot'],
  ARRAY['Micron-level burr concentricity', 'Machined aluminum monocoque', 'Zero-retention internal chute']
),
(
  'valve-actuator-housing',
  'High-Pressure Hydraulic Valve Actuator Housing',
  'Mechanical Design',
  'Heavy-duty cast and CNC machined valve body designed for high pressure hydraulic fluid control in petrochemical pipelines.',
  '/assets/external/projects/valve-actuator-housing.webp',
  'small',
  '2024',
  'PetroFlow Engineering',
  ARRAY['PTC Creo', 'AutoCAD', 'SolidWorks'],
  ARRAY['FEA stress-optimized walls', 'Standard ANSI flange bolt patterns', 'Pressure-relief manifold paths']
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  size = EXCLUDED.size,
  year = EXCLUDED.year,
  client = EXCLUDED.client,
  tools = EXCLUDED.tools,
  highlights = EXCLUDED.highlights;

-- 8. INITIAL SEED DATA FOR SERVICES
INSERT INTO public.services (slug, title, description, keywords, tools, deliverables, long_description, hero_image, faq)
VALUES
(
  'feasibility-test',
  'Feasibility',
  'Early-stage concept validation for manufacturability, mechanical integrity, and assembly logic.',
  ARRAY['feasibility study', 'design validation', 'manufacturability assessment', 'engineering feasibility'],
  ARRAY['SolidWorks', 'PTC Creo'],
  ARRAY['Feasibility report', 'Risk analysis', 'Concept validation models'],
  'We evaluate concepts before the costly detailed design phase begins. We analyze mechanical fit, material constraints, and production risks to ensure your idea is physically viable, functionally sound, and economically scalable.',
  '/assets/external/projects/compressor-chamber.webp',
  '[
    {"question": "What is included in a feasibility test?", "answer": "We review the concept, identify manufacturing risks, validate key dimensions, and provide a technical report with recommended next steps."},
    {"question": "When should I request a feasibility test?", "answer": "Request it before detailed CAD work when you need clarity on whether a product idea is viable and manufacturable."},
    {"question": "Do you assess production methods?", "answer": "Yes. We compare injection molding, CNC machining, and additive manufacturing risks for the proposed design."},
    {"question": "Will I receive actionable feedback?", "answer": "Yes. You receive clear, prioritized changes to reduce cost, improve assembly, and lower production risk."}
  ]'::jsonb
),
(
  'cad-design',
  'CAD',
  'Precision parametric modeling for mechanical, industrial, and product engineering, delivered as production-ready geometry.',
  ARRAY['CAD Design Islamabad', 'SolidWorks modeling', 'parametric CAD design', 'engineering CAD services'],
  ARRAY['SolidWorks', 'PTC Creo'],
  ARRAY['STEP', 'IGES', 'STL', 'DWG', 'PDF drawings'],
  'We build detailed, native parametric models utilizing professional software including SolidWorks and PTC Creo. Every design is created with strict tolerance control, motion clearance analysis, and robust feature trees ready for simulation and manufacturing handoffs.',
  '/assets/external/projects/open-assembly.webp',
  '[
    {"question": "What CAD formats do you deliver?", "answer": "We deliver STEP, IGES, STL, DWG, and PDF drawings for manufacturing, simulation, and review."},
    {"question": "Can you model assemblies with moving parts?", "answer": "Yes. We model full assemblies and validate mechanisms, interference, and kinematic motion."},
    {"question": "Do you support tolerance stackup analysis?", "answer": "Yes. We verify critical dimensions and fits so manufactured parts mate perfectly in production."},
    {"question": "Can you work from rough sketches?", "answer": "Yes. We can start from concept sketches, photos, reference parts, or technical briefs."}
  ]'::jsonb
),
(
  'mechanical-engineering',
  'Mechanical',
  'Mechanism design, structural optimization, and dynamic assembly engineering for robust physical performance.',
  ARRAY['mechanical engineering services', 'mechanism design', 'stress optimization', 'functional CAD assembly'],
  ARRAY['PTC Creo', 'ANSYS', 'SolidWorks'],
  ARRAY['Mechanism kinematic study', 'FEA stress reports', 'Assembly bill of materials (BOM)'],
  'We engineer functional mechanical systems that withstand real-world loads and thermal stresses. From gear trains and linkages to chassis and enclosures, our designs balance strength, mass, and ease of assembly.',
  '/assets/external/projects/pneumatic-piston-engine.webp',
  '[
    {"question": "What types of mechanisms do you design?", "answer": "We engineer linkages, gear trains, latching mechanisms, cams, and pneumatic/hydraulic actuator systems."},
    {"question": "Do you provide FEA structural stress analysis?", "answer": "Yes. We evaluate stress concentrations, deflection, and safety factors to optimize material usage."},
    {"question": "Can you generate a detailed Bill of Materials (BOM)?", "answer": "Yes. We deliver itemized BOMs with part numbering, quantities, and material specs."}
  ]'::jsonb
),
(
  'product-visualization-renders',
  '3D Renders',
  'Photorealistic studio and environmental 3D renderings for investor decks, marketing launches, and product catalogs.',
  ARRAY['3D rendering services', 'photorealistic product render', 'KeyShot rendering', 'Blender visualization'],
  ARRAY['Blender', 'KeyShot', 'Unreal Engine 5'],
  ARRAY['4K / 8K still renders', 'Transparent PNG cutouts', 'Lighting variation sets'],
  'Transform CAD geometry into hyper-realistic marketing visuals. We craft custom PBR materials, studio lighting environments, and lifestyle context to give your product maximum visual impact before physical manufacturing.',
  '/assets/external/projects/orbai-spherical-drone.webp',
  '[
    {"question": "What resolution do you deliver for 3D renders?", "answer": "We deliver 4K (3840x2160) and 8K ultra-high resolution renders in PNG, TIFF, and JPG formats."},
    {"question": "Can you render products with custom materials and colors (CMF)?", "answer": "Yes. We apply exact Pantone colors, brushed metals, carbon fiber, soft-touch plastics, and glass textures."},
    {"question": "Do I need to provide textures?", "answer": "No. Our team creates and applies custom photorealistic PBR materials and textures for your model."}
  ]'::jsonb
),
(
  'design-for-manufacturing',
  'DFM Review',
  'Injection molding, CNC machining, and sheet metal optimization to cut manufacturing costs and prevent tooling revisions.',
  ARRAY['DFM review', 'injection mold draft analysis', 'CNC machining optimization', 'sheet metal design'],
  ARRAY['SolidWorks', 'Creo'],
  ARRAY['Draft angle analysis report', 'Uniform wall thickness map', 'Production-ready STEP files'],
  'DFM bridges the gap between digital design and the factory floor. We inspect wall thicknesses, draft angles, undercut tooling requirements, bend radii, and tool access so your parts can be manufactured at lowest unit cost with zero surprises.',
  '/assets/external/projects/ketchup-cap.webp',
  '[
    {"question": "What manufacturing processes do you optimize for?", "answer": "We optimize for plastic injection molding, 3/4/5-axis CNC milling/turning, sheet metal stamping & bending, and additive manufacturing."},
    {"question": "How does DFM lower my production costs?", "answer": "DFM eliminates side actions in molds, reduces cycle times, standardizes tooling radii, and prevents costly mold rework."},
    {"question": "Will you coordinate with my manufacturing vendor?", "answer": "Yes. We review supplier capability sheets and adapt CAD geometry to their specific machine limits."}
  ]'::jsonb
),
(
  '3d-printing-prototyping',
  '3D Printing',
  'Watertight STL and 3MF mesh generation optimized for FDM, SLA, SLS, and PolyJet rapid prototyping.',
  ARRAY['3D printing optimization', 'rapid prototyping CAD', 'watertight STL mesh', 'additive manufacturing design'],
  ARRAY['Fusion 360', 'Blender', 'SolidWorks'],
  ARRAY['Watertight STL & 3MF files', 'Support structure minimization report', 'Snap-fit tolerance guides'],
  'We prepare and validate 3D CAD data specifically for additive manufacturing. We ensure zero non-manifold geometry, optimize infill boundaries, and build in calibrated snap-fit clearances (0.2mm - 0.4mm) for seamless functional prototypes.',
  '/assets/external/projects/f1-car-keychain.webp',
  '[
    {"question": "What file formats do you deliver for 3D printing?", "answer": "We deliver high-density binary STL, OBJ, and modern 3MF files with built-in color/material metadata."},
    {"question": "Do you design snap-fits and threaded inserts?", "answer": "Yes. We incorporate cantilever snap-fits, heat-set brass insert bosses, and self-tapping screw bosses."},
    {"question": "What 3D printing technologies do you design for?", "answer": "We design for FDM/FFF, resin SLA/DLP, powder-bed SLS, MJF (Multi Jet Fusion), and metal DMLS."}
  ]'::jsonb
),
(
  'medical-device-design',
  'Medical CAD',
  'Biocompatible enclosures, surgical handhelds, and health-tech hardware engineered to ISO 13485 design control standards.',
  ARRAY['medical device CAD', 'ISO 13485 design', 'surgical tool engineering', 'health tech enclosure'],
  ARRAY['SolidWorks', 'ANSYS', 'AutoCAD'],
  ARRAY['Ergonomic handheld CAD', 'IP67 waterproof gasket channels', 'Regulatory drawing packages'],
  'Precision engineering for medical technology where human ergonomics, sterile sealing, and regulatory compliance are essential. We develop diagnostic equipment housings, wearable patient monitors, and handheld surgical instruments.',
  '/assets/external/projects/tkr-implant.webp',
  '[
    {"question": "Are your designs aligned with ISO 13485 requirements?", "answer": "Yes. We maintain revision history, material traceability callouts, and design verification documentation."},
    {"question": "Can you design ingress-protected (IP65 / IP67) enclosures?", "answer": "Yes. We engineer compression gasket grooves, ultrasonic welding ribs, and O-ring gland channels."}
  ]'::jsonb
),
(
  'reverse-engineering',
  'Reverse CAD',
  'Converting 3D scan point clouds and physical prototypes into parametric, fully editable native CAD feature trees.',
  ARRAY['reverse engineering', 'scan to CAD', 'mesh to solid', 'point cloud reconstruction'],
  ARRAY['SolidWorks', 'Geomagic Design X', 'Rhino'],
  ARRAY['Parametric native SolidWorks parts', 'Deviation analysis comparison report', 'Manufacturing 2D drawings'],
  'Transform organic scan meshes and broken physical legacy parts into clean, editable parametric CAD solids with perfect concentricity, flat reference datums, and updated manufacturing tolerances.',
  '/assets/external/projects/bull-lock.webp',
  '[
    {"question": "What input scan formats do you accept?", "answer": "We accept STL, OBJ, PLY, and laser point clouds (PTS, XYZ, LAS) from any industrial 3D scanner."},
    {"question": "Will the resulting CAD file be fully editable?", "answer": "Yes. We rebuild the model with clean sketch sketches, extrudes, revolves, and standard parametric features."}
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  tools = EXCLUDED.tools,
  deliverables = EXCLUDED.deliverables,
  long_description = EXCLUDED.long_description,
  hero_image = EXCLUDED.hero_image,
  faq = EXCLUDED.faq;
