export type Intent = {
  intent: string;
  keywords: string[];
  response: string;
  quickReplies?: string[];
  action?: 'project_intake' | 'portfolio' | 'contact' | 'whatsapp';
};

export const chatbotKnowledge: Intent[] = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "start", "welcome", "greetings", "good morning", "good afternoon"],
    response: "Hi! Welcome to Red Shadow Designs. I can help you learn about our services, answer common questions, or help you start a project inquiry.",
    quickReplies: [
      "CAD & Product Design",
      "DFM & Manufacturing",
      "3D Printing",
      "3D Rendering",
      "Animation",
      "Start a Project",
      "Ask a Question",
      "Contact Us"
    ]
  },
  {
    intent: "services",
    keywords: ["services", "what do you do", "what can you do", "offer", "offerings", "our services"],
    response: "We provide parametric CAD modeling, photorealistic 3D rendering, industrial product design, medical device modeling, and engineering visualization for clients worldwide.",
    quickReplies: ["CAD & Product Design", "3D Rendering", "Start a Project"]
  },
  {
    intent: "cad_product_design",
    keywords: [
      "cad", "cad design", "cad modeling", "3d cad", "3d model", 
      "mechanical model", "mechanical cad", "part modeling", "assembly design",
      "product design", "product development", "design a product", "new product", "product concept", "cad & product design"
    ],
    response: "We offer premium CAD and industrial product design services. Whether you need a simple part modeled or a complex mechanical assembly designed from scratch, our team can help.",
    quickReplies: ["Start a Project", "Contact Us"]
  },
  {
    intent: "dfm",
    keywords: ["dfm", "design for manufacturing", "manufacturing design", "prepare for manufacturing", "manufacturing-ready design", "manufacturing ready", "cnc", "dfm & manufacturing"],
    response: "Our Design for Manufacturing (DFM) service ensures your designs are ready for production. All CAD assemblies are DFM-validated and delivered as production-ready STEP and STL files compatible with CNC machining and 3D printing.",
    quickReplies: ["Start a Project"]
  },
  {
    intent: "3d_printing",
    keywords: ["3d printing", "print", "printing", "stl", "prototype printing", "printed prototype", "prototyping"],
    response: "We can help you prepare and optimize your models for 3D printing, delivering high-quality STL files ready for rapid prototyping.",
    quickReplies: ["Start a Project"]
  },
  {
    intent: "rendering",
    keywords: ["render", "rendering", "product render", "realistic render", "visualization", "product visualization", "photorealistic", "3d rendering"],
    response: "We create photorealistic 3D renderings for product visualizations, marketing materials, and investor pitches. Typical delivery is 4–8 business days depending on complexity.",
    quickReplies: ["Start a Project", "Portfolio"]
  },
  {
    intent: "animation",
    keywords: ["animation", "product animation", "engineering animation", "exploded animation", "mechanism animation", "video"],
    response: "We provide 3D animation services, including exploded views and mechanism animations, to clearly demonstrate how your product works.",
    quickReplies: ["Start a Project", "Portfolio"]
  },
  {
    intent: "portfolio",
    keywords: ["portfolio", "examples", "work", "past work", "projects", "mechanical design examples", "product design examples", "see your work"],
    response: "You can explore our selected work in the portfolio.",
    action: "portfolio"
  },
  {
    intent: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "quote", "estimate"],
    response: "Project pricing depends on the complexity, requirements, files needed and revisions. Send us your project details and our team can review it and provide a quote.",
    quickReplies: ["Start a Project", "Contact Us"]
  },
  {
    intent: "contact",
    keywords: ["contact", "contact us", "email", "phone", "call", "reach out", "location", "where are you located", "where are you", "where is red shadow designs located"],
    response: "We are based in Islamabad, Pakistan, but we work with clients globally. You can contact us via email at hello@redshadowdesigns.com or by phone at +92 333 891 7021.",
    action: "contact"
  },
  {
    intent: "whatsapp",
    keywords: ["whatsapp", "whatsapp us", "message", "chat"],
    response: "You can reach us on WhatsApp.",
    action: "whatsapp"
  },
  {
    intent: "faq_sketch",
    keywords: ["sketch", "from a sketch", "hand drawn", "napkin"],
    response: "Yes, we can definitely work from a sketch or a simple description to create your initial 3D models and product designs."
  },
  {
    intent: "faq_files",
    keywords: ["files", "what files can i provide", "file types", "existing cad model", "step", "iges", "dwg", "dxf"],
    response: "You can provide sketches, reference images, PDFs, or existing CAD models (STEP, IGES, STL, DWG, DXF, etc.). We will use these to start your project."
  },
  {
    intent: "project_intake",
    keywords: ["start a project", "begin project", "new project", "hire", "inquiry"],
    response: "Let's get started on your project. What is your name?",
    action: "project_intake"
  },
  {
    intent: "ask_question",
    keywords: ["ask a question", "question", "help", "support"],
    response: "Sure, what would you like to know? You can ask about our services, pricing, file types, or anything else."
  }
];

export const fallbackResponse = {
  response: "I'm not sure I understood that. You can choose one of the options below or describe your project and I'll help you get started.",
  quickReplies: ["Our Services", "Start a Project", "Contact Us", "WhatsApp Us"]
};
