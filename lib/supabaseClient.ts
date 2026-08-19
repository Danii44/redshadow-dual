import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project, projects as defaultProjects } from '@/lib/projects';
import { ServiceData, servicesData as defaultServices } from '@/app/services/seoServices';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 10
  );
};

let clientInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
};

// ==========================================
// STORAGE: Image Upload Helper
// ==========================================
export async function uploadPortfolioImage(file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { url: null, error: 'Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.' };
  }

  try {
    const fileExt = file.name.split('.').pop() || 'png';
    const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `${Date.now()}_${cleanFileName}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Failed to upload image' };
  }
}

// ==========================================
// PROJECTS DATABASE CRUD
// ==========================================
export async function fetchProjectsFromDB(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return defaultProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return defaultProjects;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      category: item.category || 'CAD Design',
      description: item.description || '',
      image: item.image || undefined,
      size: (item.size as 'small' | 'large') || 'large',
      year: item.year || '2024',
      client: item.client || undefined,
      tools: item.tools || [],
      highlights: item.highlights || [],
    }));
  } catch {
    return defaultProjects;
  }
}

export async function fetchProjectByIdFromDB(id: string): Promise<Project | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return defaultProjects.find((p) => p.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return defaultProjects.find((p) => p.id === id) || null;
    }

    return {
      id: data.id,
      title: data.title,
      category: data.category || 'CAD Design',
      description: data.description || '',
      image: data.image || undefined,
      size: (data.size as 'small' | 'large') || 'large',
      year: data.year || '2024',
      client: data.client || undefined,
      tools: data.tools || [],
      highlights: data.highlights || [],
    };
  } catch {
    return defaultProjects.find((p) => p.id === id) || null;
  }
}

export async function insertProjectIntoDB(project: Project): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found in environment.' };
  }

  try {
    const { error } = await supabase.from('projects').insert([
      {
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        size: project.size || 'large',
        year: project.year || '2024',
        client: project.client || '',
        tools: project.tools || [],
        highlights: project.highlights || [],
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Database insert failed' };
  }
}

export async function updateProjectInDB(id: string, project: Partial<Project>): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found.' };
  }

  try {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        size: project.size,
        year: project.year,
        client: project.client,
        tools: project.tools,
        highlights: project.highlights,
      })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Database update failed' };
  }
}

export async function deleteProjectFromDB(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found.' };
  }

  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Database delete failed' };
  }
}

// ==========================================
// SERVICES DATABASE CRUD
// ==========================================
export async function fetchServicesFromDB(): Promise<ServiceData[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return defaultServices;
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultServices;
    }

    return data.map((item: any) => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      keywords: item.keywords || [],
      tools: item.tools || [],
      deliverables: item.deliverables || [],
      longDescription: item.long_description || item.description,
      heroImage: item.hero_image || '',
      faq: Array.isArray(item.faq) ? item.faq : [],
    }));
  } catch {
    return defaultServices;
  }
}

export async function fetchServiceBySlugFromDB(slug: string): Promise<ServiceData | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return defaultServices.find((s) => s.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return defaultServices.find((s) => s.slug === slug) || null;
    }

    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      keywords: data.keywords || [],
      tools: data.tools || [],
      deliverables: data.deliverables || [],
      longDescription: data.long_description || data.description,
      heroImage: data.hero_image || '',
      faq: Array.isArray(data.faq) ? data.faq : [],
    };
  } catch {
    return defaultServices.find((s) => s.slug === slug) || null;
  }
}

export async function insertServiceIntoDB(service: ServiceData): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found.' };
  }

  try {
    const { error } = await supabase.from('services').insert([
      {
        slug: service.slug,
        title: service.title,
        description: service.description,
        keywords: service.keywords,
        tools: service.tools,
        deliverables: service.deliverables,
        long_description: service.longDescription,
        hero_image: service.heroImage,
        faq: service.faq,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Service insert failed' };
  }
}

export async function updateServiceInDB(slug: string, service: Partial<ServiceData>): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found.' };
  }

  try {
    const { error } = await supabase
      .from('services')
      .update({
        title: service.title,
        description: service.description,
        keywords: service.keywords,
        tools: service.tools,
        deliverables: service.deliverables,
        long_description: service.longDescription,
        hero_image: service.heroImage,
        faq: service.faq,
      })
      .eq('slug', slug);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Service update failed' };
  }
}

export async function deleteServiceFromDB(slug: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not found.' };
  }

  try {
    const { error } = await supabase.from('services').delete().eq('slug', slug);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Service delete failed' };
  }
}
