export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  size?: 'small' | 'large';
};

export const projects: Project[] = [
  { id: 'orbai-spherical-drone', title: 'ORBAI Spherical Drone', category: 'CAD Design', description: 'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering for an autonomous aerial platform.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png', size: 'large' },
  { id: 'f1-car-keychain', title: 'F1 Race Car Keychain', category: 'CAD Design', description: 'Highly detailed, precision-engineered miniature F1 car model for CNC machining or SLA 3D printing.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d233936dc12e8c10bfcbc01df04f8ee-1778085149990/F1%20Car%20keychain.png', size: 'small' },
  { id: 'tkr-implant', title: 'Knee Implant', category: 'Medical', description: 'Anatomically accurate knee implant CAD model focusing on biomechanics, material specifications, and regulatory compliance.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ba554de2ad029f269a870a21a79b4de-1778103959841/Knee%20Implant.png', size: 'small' },
  { id: 'ketchup-cap', title: 'Ketchup Dispensing Cap', category: 'Product Design', description: 'Innovative ketchup dispensing cap design with precise mating geometry, engineered for injection molding production.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/993a073adc2457995e71295779fb790d-1778075442653/Ketchup%20dispensing%20Cap.png', size: 'large' },
  { id: 'bull-lock', title: 'Bull Lock Mechanism', category: 'Industrial Design', description: 'Heavy-duty bull lock mechanism with fully articulated locking geometry, designed for agricultural and industrial applications.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e64564c7b2c31a31a0c29a3ef409b3c4-1778085712334/Bull%20Lock.png', size: 'small' },
  { id: 'taupe-urn', title: 'Decorative Urn', category: '3D Rendering', description: 'Photorealistic 3D render of a premium taupe decorative urn with subsurface scattering material simulation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/435df2ac457fbaccafb89af9ae9b9a63-1778071894834/Taupe%20Urn.4.jpg', size: 'small' },
  { id: 'compressor-chamber', title: 'Compressor Chamber', category: 'Industrial Design', description: 'Full parametric assembly of a compressor chamber with internal component packaging, tolerances, and thermal simulation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png', size: 'large' },
  { id: 'hero-render', title: 'Product Hero Render', category: '3D Rendering', description: 'Studio-quality hero render for product launch campaign materials, featuring dramatic lighting and precise texture work.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/03ebb2fc4976ec19df71727c22a38472-1778084709761/Render.png', size: 'small' },
  { id: 'makeup-stick', title: 'Makeup Stick', category: 'Product Design', description: 'Sleek cosmetic makeup stick housing design with precision tolerance mating parts, ready for injection molding.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2d12f0c4410cc1fa7519db8c93eb1996-1783230425150/Makeup%20stick.png', size: 'small' },
  { id: 'camera-housing', title: 'Camera Housing', category: 'Hardware', description: 'Precision camera housing design with lens mount integration, weather sealing geometry, and ergonomic grip profiling.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89a8e01d1172396211415fc354ca854e-1783201809117/Camera%20Black.1.jpg', size: 'large' },
  { id: 'bamboo-toothbrush', title: 'Bamboo Toothbrush', category: 'Product Design', description: 'Eco-friendly bamboo toothbrush CAD model with ergonomic handle geometry and sustainability-focused material specifications.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8fdeb965bb29fb18f301edcca595ee79-1783229718869/Bamboo%20Toothbrush.2.png', size: 'small' },
  { id: 'open-assembly', title: 'Mechanical Assembly', category: 'CAD Design', description: 'Complex multi-component mechanical assembly with exploded view renders and full BOM documentation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4d784892d35280098ce5474d75bae7a2-1783231400688/Open.png', size: 'small' },
];

export function findProject(id: string) {
  return projects.find(p => p.id === id) || null;
}

export function getAllProjectIds() {
  return projects.map(p => p.id);
}
